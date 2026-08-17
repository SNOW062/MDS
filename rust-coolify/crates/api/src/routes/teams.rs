use axum::{
    routing::get,
    Router, Json,
    extract::{Path, State},
    http::StatusCode,
    Extension,
    middleware::from_fn_with_state,
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::state::AppState;
use rc_auth::session::SessionClaims;

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Team {
    pub id: Uuid,
    pub name: Option<String>,
    pub description: Option<String>,
    pub personal_team: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct TeamMember {
    pub id: Uuid,
    pub name: Option<String>,
    pub email: Option<String>,
    pub role: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct CreateTeamRequest {
    pub name: String,
    pub description: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateTeamRequest {
    pub name: String,
    pub description: Option<String>,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        // GET /api/teams — List all teams (TeamController::teams)
        .route("/api/teams", get(list_teams_handler).post(create_team_handler))
        // GET /api/teams/current — Current authenticated team (TeamController::current_team)
        .route("/api/teams/current", get(current_team_handler).put(update_current_team_handler).delete(delete_current_team_handler))
        // GET /api/teams/current/members — Current team members (TeamController::current_team_members)
        .route("/api/teams/current/members", get(current_team_members_handler))
        // PUT /api/teams/current/members/:id/role — Update member role
        .route("/api/teams/current/members/:id/role", axum::routing::put(update_member_role_handler))
        // DELETE /api/teams/current/members/:id — Remove member
        .route("/api/teams/current/members/:id", axum::routing::delete(delete_member_handler))
        // GET /api/teams/current/invitations — Current team active invitations
        .route("/api/teams/current/invitations", get(current_team_invitations_handler).post(create_team_invitation_handler))
        // DELETE /api/teams/current/invitations/:id — Cancel invitation
        .route("/api/teams/current/invitations/:id", axum::routing::delete(delete_team_invitation_handler))
        // POST /api/teams/switch/:id — Switch current active team
        .route("/api/teams/switch/:id", axum::routing::post(switch_team_handler))
        // GET /api/teams/:id — Get team by id (TeamController::team_by_id)
        .route("/api/teams/:id", get(team_by_id_handler))
        // GET /api/teams/:id/members — Get members by team id (TeamController::members_by_id)
        .route("/api/teams/:id/members", get(team_members_handler))
        .route_layer(from_fn_with_state(state.clone(), crate::middleware::auth::auth_middleware))
        .with_state(state)
}

/// GET /api/teams — istifadəçiyə aid bütün komandalar
async fn list_teams_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
) -> Result<Json<Vec<Team>>, StatusCode> {
    let user_uuid = Uuid::parse_str(&claims.sub).unwrap_or_default();
    
    let teams = sqlx::query_as::<_, Team>(
        "SELECT t.id, t.name, t.description, t.personal_team FROM teams t
         JOIN team_members tm ON tm.team_id = t.id
         WHERE tm.user_id = $1 ORDER BY t.created_at"
     )
     .bind(user_uuid)
     .fetch_all(&state.db)
     .await
     .map_err(|e| {
         tracing::error!("DB error listing teams: {:?}", e);
         StatusCode::INTERNAL_SERVER_ERROR
     })?;
 
     Ok(Json(teams))
 }
 
 /// GET /api/teams/current — Hal-hazırkı autentifikasiya edilmiş komanda
 async fn current_team_handler(
     State(state): State<AppState>,
     Extension(claims): Extension<SessionClaims>,
 ) -> Result<Json<Team>, StatusCode> {
     let team_uuid = Uuid::parse_str(&claims.team_id.unwrap_or_default()).unwrap_or_default();
 
     let team = sqlx::query_as::<_, Team>(
         "SELECT id, name, description, personal_team FROM teams WHERE id = $1"
     )
     .bind(team_uuid)
     .fetch_optional(&state.db)
     .await
     .map_err(|e| {
         tracing::error!("DB error fetching current team: {:?}", e);
         StatusCode::INTERNAL_SERVER_ERROR
     })?
     .ok_or(StatusCode::NOT_FOUND)?;
 
     Ok(Json(team))
 }
 
 /// GET /api/teams/current/members — Hal-hazırkı komandasının üzvləri
 async fn current_team_members_handler(
     State(state): State<AppState>,
     Extension(claims): Extension<SessionClaims>,
 ) -> Result<Json<Vec<TeamMember>>, StatusCode> {
     let team_uuid = Uuid::parse_str(&claims.team_id.unwrap_or_default()).unwrap_or_default();
 
     let members = sqlx::query_as::<_, TeamMember>(
         "SELECT u.id, u.name, u.email, tu.role FROM users u
          JOIN team_members tu ON tu.user_id = u.id
          WHERE tu.team_id = $1"
     )
     .bind(team_uuid)
     .fetch_all(&state.db)
     .await
     .map_err(|e| {
         tracing::error!("DB error fetching current team members: {:?}", e);
         StatusCode::INTERNAL_SERVER_ERROR
     })?;
 
     Ok(Json(members))
 }

/// POST /api/teams/switch/:id — Komandanı dəyişdir (Yeni JWT token qaytarır)
async fn switch_team_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
    Path(target_team_id): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let user_uuid = Uuid::parse_str(&claims.sub).unwrap_or_default();
    
    // İstifadəçinin hədəf komandanın üzvü olub-olmadığını yoxlayırıq
    let member_exists: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM team_members WHERE team_id = $1 AND user_id = $2"
    )
    .bind(target_team_id)
    .bind(user_uuid)
    .fetch_one(&state.db)
    .await
    .unwrap_or(0);
    
    if member_exists == 0 {
        return Err(StatusCode::FORBIDDEN);
    }
    
    // Hədəf komanda ID-si ilə yeni JWT session tokeni hazırlayırıq
    let jwt_secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "change-me-in-production".to_string());
    let token = rc_auth::session::create_session(user_uuid, Some(target_team_id), &jwt_secret, 168)
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
        
    Ok(Json(serde_json::json!({
        "token": token,
        "team_id": target_team_id,
        "message": "Komanda uğurla dəyişdirildi."
    })))
}

/// GET /api/teams/:id — ID ilə komanda məlumatları
async fn team_by_id_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
    Path(id): Path<Uuid>,
) -> Result<Json<Team>, StatusCode> {
    let user_uuid = Uuid::parse_str(&claims.sub).unwrap_or_default();
    
    // İstifadəçinin bu komandaya daxil olmaq səlahiyyətinin olub-olmadığını yoxla
    let member_exists: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM team_members WHERE team_id = $1 AND user_id = $2"
    )
    .bind(id)
    .bind(user_uuid)
    .fetch_one(&state.db)
    .await
    .unwrap_or(0);
    
    if member_exists == 0 {
        return Err(StatusCode::FORBIDDEN);
    }

    let team = sqlx::query_as::<_, Team>(
        "SELECT id, name, description, personal_team FROM teams WHERE id = $1"
    )
    .bind(id)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| {
        tracing::error!("DB error fetching team by id: {:?}", e);
        StatusCode::INTERNAL_SERVER_ERROR
    })?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(team))
}

/// GET /api/teams/:id/members — Komanda üzvlərinin siyahısı
async fn team_members_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
    Path(id): Path<Uuid>,
) -> Result<Json<Vec<TeamMember>>, StatusCode> {
    let user_uuid = Uuid::parse_str(&claims.sub).unwrap_or_default();
    
    // İstifadəçinin bu komandaya daxil olmaq səlahiyyətinin olub-olmadığını yoxla
    let member_exists: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM team_members WHERE team_id = $1 AND user_id = $2"
    )
    .bind(id)
    .bind(user_uuid)
    .fetch_one(&state.db)
    .await
    .unwrap_or(0);
    
    if member_exists == 0 {
        return Err(StatusCode::FORBIDDEN);
    }

    let members = sqlx::query_as::<_, TeamMember>(
        "SELECT u.id, u.name, u.email FROM users u
         JOIN team_members tu ON tu.user_id = u.id
         WHERE tu.team_id = $1"
    )
    .bind(id)
    .fetch_all(&state.db)
    .await
    .map_err(|e| {
        tracing::error!("DB error fetching team members: {:?}", e);
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    Ok(Json(members))
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct TeamInvitation {
    pub id: Uuid,
    pub uuid: Uuid,
    pub email: String,
    pub role: String,
    pub link: Option<String>,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Debug, Deserialize)]
pub struct CreateInvitationRequest {
    pub email: String,
    pub role: String,
}

/// GET /api/teams/current/invitations — Aktiv dəvətlər
async fn current_team_invitations_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
) -> Result<Json<Vec<TeamInvitation>>, StatusCode> {
    let team_uuid = Uuid::parse_str(&claims.team_id.unwrap_or_default()).unwrap_or_default();

    let invitations = sqlx::query_as::<_, TeamInvitation>(
        "SELECT id, uuid, email, role, link, created_at FROM team_invitations WHERE team_id = $1 ORDER BY created_at DESC"
    )
    .bind(team_uuid)
    .fetch_all(&state.db)
    .await
    .map_err(|e| {
        tracing::error!("DB error listing invitations: {:?}", e);
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    Ok(Json(invitations))
}

/// POST /api/teams/current/invitations — Yeni dəvət linki yarat
async fn create_team_invitation_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
    Json(body): Json<CreateInvitationRequest>,
) -> Result<(StatusCode, Json<TeamInvitation>), (StatusCode, Json<serde_json::Value>)> {
    let email_input = body.email.trim().to_lowercase();
    let role_input = body.role.trim().to_lowercase();

    if email_input.is_empty() {
        return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "E-poçt boş ola bilməz." }))));
    }

    let team_uuid = Uuid::parse_str(&claims.team_id.unwrap_or_default()).unwrap_or_default();
    let user_uuid = Uuid::parse_str(&claims.sub).unwrap_or_default();

    // Dəvət edən şəxsin komanda admin/sahibi olduğunu yoxlayırıq
    let role: String = sqlx::query_scalar(
        "SELECT role FROM team_members WHERE team_id = $1 AND user_id = $2"
    )
    .bind(team_uuid)
    .bind(user_uuid)
    .fetch_one(&state.db)
    .await
    .map_err(|_| {
        (StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "Komanda məlumatlarına icazəniz yoxdur." })))
    })?;

    if role != "owner" && role != "admin" {
        return Err((StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "Komandaya yeni üzv dəvət etmək icazəniz yoxdur." }))));
    }

    // Əvvəlki aktiv dəvəti yoxla
    let existing_count: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM team_invitations WHERE email = $1 AND team_id = $2"
    )
    .bind(&email_input)
    .bind(team_uuid)
    .fetch_one(&state.db)
    .await
    .unwrap_or(0);

    if existing_count > 0 {
        return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Bu e-poçta artıq pending dəvət mövcuddur." }))));
    }

    let invitation_id = Uuid::new_v4();
    let invitation_uuid = Uuid::new_v4();
    let invitation_link = format!("http://localhost:9000/register?invitation={}", invitation_uuid);

    let row = sqlx::query_as::<_, TeamInvitation>(
        "INSERT INTO team_invitations (id, uuid, team_id, email, role, link, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) 
         RETURNING id, uuid, email, role, link, created_at"
    )
    .bind(invitation_id)
    .bind(invitation_uuid)
    .bind(team_uuid)
    .bind(&email_input)
    .bind(&role_input)
    .bind(&invitation_link)
    .fetch_one(&state.db)
    .await
    .map_err(|e| {
        tracing::error!("DB error creating invitation: {:?}", e);
        (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Verilənlər bazası xətası." })))
    })?;

    Ok((StatusCode::CREATED, Json(row)))
}

/// DELETE /api/teams/current/invitations/:id — Dəvəti ləğv et
async fn delete_team_invitation_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
    Path(id): Path<Uuid>,
) -> Result<StatusCode, StatusCode> {
    let team_uuid = Uuid::parse_str(&claims.team_id.unwrap_or_default()).unwrap_or_default();
    let user_uuid = Uuid::parse_str(&claims.sub).unwrap_or_default();

    // Dəvət ləğv edənin komanda admin/sahibi olduğunu yoxlayırıq
    let role: String = sqlx::query_scalar(
        "SELECT role FROM team_members WHERE team_id = $1 AND user_id = $2"
    )
    .bind(team_uuid)
    .bind(user_uuid)
    .fetch_one(&state.db)
    .await
    .map_err(|_| StatusCode::FORBIDDEN)?;

    if role != "owner" && role != "admin" {
        return Err(StatusCode::FORBIDDEN);
    }

    sqlx::query("DELETE FROM team_invitations WHERE id = $1 AND team_id = $2")
        .bind(id)
        .bind(team_uuid)
        .execute(&state.db)
        .await
        .map_err(|e| {
            tracing::error!("DB error deleting invitation: {:?}", e);
            StatusCode::INTERNAL_SERVER_ERROR
        })?;

    Ok(StatusCode::NO_CONTENT)
}

/// POST /api/teams — Yeni komanda yarat
async fn create_team_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
    Json(body): Json<CreateTeamRequest>,
) -> Result<(StatusCode, Json<Team>), (StatusCode, Json<serde_json::Value>)> {
    let name_trim = body.name.trim();
    if name_trim.is_empty() {
        return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Komanda adı boş ola bilməz." }))));
    }

    let user_uuid = Uuid::parse_str(&claims.sub).unwrap_or_default();
    let team_id = Uuid::new_v4();

    // Start transaction
    let mut tx = state.db.begin().await.map_err(|e| {
        tracing::error!("Failed to start transaction: {:?}", e);
        (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Verilənlər bazası xətası." })))
    })?;

    // Create the team
    let team = sqlx::query_as::<_, Team>(
        "INSERT INTO teams (id, name, description, personal_team, created_at, updated_at)
         VALUES ($1, $2, $3, false, NOW(), NOW())
         RETURNING id, name, description, personal_team"
    )
    .bind(team_id)
    .bind(name_trim)
    .bind(body.description)
    .fetch_one(&mut *tx)
    .await
    .map_err(|e| {
        tracing::error!("DB error creating team: {:?}", e);
        (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Komanda yaradıla bilmədi." })))
    })?;

    // Add current user as the "owner" of this new team
    sqlx::query(
        "INSERT INTO team_members (team_id, user_id, role, created_at)
         VALUES ($1, $2, 'owner', NOW())"
    )
    .bind(team_id)
    .bind(user_uuid)
    .execute(&mut *tx)
    .await
    .map_err(|e| {
        tracing::error!("DB error adding owner member: {:?}", e);
        (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Komandaya sahibi əlavə edilə bilmədi." })))
    })?;

    tx.commit().await.map_err(|e| {
        tracing::error!("Failed to commit transaction: {:?}", e);
        (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Verilənlər bazası xətası." })))
    })?;

    Ok((StatusCode::CREATED, Json(team)))
}

/// PUT /api/teams/current — Update current team settings
async fn update_current_team_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
    Json(body): Json<UpdateTeamRequest>,
) -> Result<StatusCode, (StatusCode, Json<serde_json::Value>)> {
    let team_uuid = Uuid::parse_str(&claims.team_id.unwrap_or_default()).unwrap_or_default();
    let user_uuid = Uuid::parse_str(&claims.sub).unwrap_or_default();

    // Check if the user is owner or admin of the team
    let role: String = sqlx::query_scalar(
        "SELECT role FROM team_members WHERE team_id = $1 AND user_id = $2"
    )
    .bind(team_uuid)
    .bind(user_uuid)
    .fetch_one(&state.db)
    .await
    .map_err(|_| (StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "İcazəniz yoxdur." }))))?;

    if role != "owner" && role != "admin" {
        return Err((StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "Komanda tənzimləmələrini dəyişmək icazəniz yoxdur." }))));
    }

    let name_trim = body.name.trim();
    if name_trim.is_empty() {
        return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Komanda adı boş ola bilməz." }))));
    }

    sqlx::query("UPDATE teams SET name = $1, description = $2, updated_at = NOW() WHERE id = $3")
        .bind(name_trim)
        .bind(body.description)
        .bind(team_uuid)
        .execute(&state.db)
        .await
        .map_err(|e| {
            tracing::error!("DB error updating team: {:?}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Verilənlər bazası xətası." })))
        })?;

    Ok(StatusCode::OK)
}

/// DELETE /api/teams/current — Delete current team
async fn delete_current_team_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
) -> Result<StatusCode, (StatusCode, Json<serde_json::Value>)> {
    let team_uuid = Uuid::parse_str(&claims.team_id.unwrap_or_default()).unwrap_or_default();
    let user_uuid = Uuid::parse_str(&claims.sub).unwrap_or_default();

    // Check user's role
    let role: String = sqlx::query_scalar(
        "SELECT role FROM team_members WHERE team_id = $1 AND user_id = $2"
    )
    .bind(team_uuid)
    .bind(user_uuid)
    .fetch_one(&state.db)
    .await
    .map_err(|_| (StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "İcazəniz yoxdur." }))))?;

    if role != "owner" {
        return Err((StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "Yalnız komanda sahibi komandanı silə bilər." }))));
    }

    // Check if the team is personal/default
    let personal_team: bool = sqlx::query_scalar(
        "SELECT personal_team FROM teams WHERE id = $1"
    )
    .bind(team_uuid)
    .fetch_one(&state.db)
    .await
    .unwrap_or(false);

    if personal_team {
        return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Şəxsi komandanı silmək olmaz." }))));
    }

    // Delete team and its members
    sqlx::query("DELETE FROM team_members WHERE team_id = $1")
        .bind(team_uuid)
        .execute(&state.db)
        .await
        .map_err(|e| {
            tracing::error!("DB error deleting team members: {:?}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Komanda üzvlərini silərkən xəta baş verdi." })))
        })?;

    sqlx::query("DELETE FROM team_invitations WHERE team_id = $1")
        .bind(team_uuid)
        .execute(&state.db)
        .await
        .map_err(|e| {
            tracing::error!("DB error deleting team invitations: {:?}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Komanda dəvətlərini silərkən xəta baş verdi." })))
        })?;

    sqlx::query("DELETE FROM teams WHERE id = $1")
        .bind(team_uuid)
        .execute(&state.db)
        .await
        .map_err(|e| {
            tracing::error!("DB error deleting team: {:?}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Komandanı silərkən xəta baş verdi." })))
        })?;

    Ok(StatusCode::NO_CONTENT)
}

#[derive(Debug, Deserialize)]
pub struct UpdateMemberRoleRequest {
    pub role: String,
}

/// PUT /api/teams/current/members/:id/role — Üzvün rolunu dəyiş
async fn update_member_role_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
    Path(member_id): Path<Uuid>,
    Json(body): Json<UpdateMemberRoleRequest>,
) -> Result<StatusCode, (StatusCode, Json<serde_json::Value>)> {
    let team_uuid = Uuid::parse_str(&claims.team_id.unwrap_or_default()).unwrap_or_default();
    let user_uuid = Uuid::parse_str(&claims.sub).unwrap_or_default();

    // Sorğu göndərənin rolu
    let requester_role: String = sqlx::query_scalar(
        "SELECT role FROM team_members WHERE team_id = $1 AND user_id = $2"
    )
    .bind(team_uuid)
    .bind(user_uuid)
    .fetch_one(&state.db)
    .await
    .map_err(|_| (StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "İcazəniz yoxdur." }))))?;

    if requester_role != "owner" && requester_role != "admin" {
        return Err((StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "Komanda üzvlərini idarə etmək icazəniz yoxdur." }))));
    }

    // Hədəf üzvün hazırkı rolu
    let target_role: String = sqlx::query_scalar(
        "SELECT role FROM team_members WHERE team_id = $1 AND user_id = $2"
    )
    .bind(team_uuid)
    .bind(member_id)
    .fetch_one(&state.db)
    .await
    .map_err(|_| (StatusCode::NOT_FOUND, Json(serde_json::json!({ "error": "Üzv tapılmadı." }))))?;

    // Rol iyerarxiyası yoxlanışı
    if requester_role == "admin" && target_role == "owner" {
        return Err((StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "Admin sahibi idarə edə bilməz." }))));
    }

    let new_role = body.role.trim().to_lowercase();
    if new_role != "owner" && new_role != "admin" && new_role != "member" {
        return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Keçərsiz rol seçimi." }))));
    }

    sqlx::query("UPDATE team_members SET role = $1 WHERE team_id = $2 AND user_id = $3")
        .bind(new_role)
        .bind(team_uuid)
        .bind(member_id)
        .execute(&state.db)
        .await
        .map_err(|e| {
            tracing::error!("DB error updating member role: {:?}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Verilənlər bazası xətası." })))
        })?;

    Ok(StatusCode::OK)
}

/// DELETE /api/teams/current/members/:id — Üzvü komandadan çıxar
async fn delete_member_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
    Path(member_id): Path<Uuid>,
) -> Result<StatusCode, (StatusCode, Json<serde_json::Value>)> {
    let team_uuid = Uuid::parse_str(&claims.team_id.unwrap_or_default()).unwrap_or_default();
    let user_uuid = Uuid::parse_str(&claims.sub).unwrap_or_default();

    if member_id == user_uuid {
        return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Özünüzü komandadan çıxara bilməzsiniz." }))));
    }

    // Sorğu göndərənin rolu
    let requester_role: String = sqlx::query_scalar(
        "SELECT role FROM team_members WHERE team_id = $1 AND user_id = $2"
    )
    .bind(team_uuid)
    .bind(user_uuid)
    .fetch_one(&state.db)
    .await
    .map_err(|_| (StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "İcazəniz yoxdur." }))))?;

    if requester_role != "owner" && requester_role != "admin" {
        return Err((StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "Komanda üzvlərini silmək icazəniz yoxdur." }))));
    }

    // Hədəf üzvün hazırkı rolu
    let target_role: String = sqlx::query_scalar(
        "SELECT role FROM team_members WHERE team_id = $1 AND user_id = $2"
    )
    .bind(team_uuid)
    .bind(member_id)
    .fetch_one(&state.db)
    .await
    .map_err(|_| (StatusCode::NOT_FOUND, Json(serde_json::json!({ "error": "Üzv tapılmadı." }))))?;

    // Rol iyerarxiyası yoxlanışı
    if requester_role == "admin" && target_role == "owner" {
        return Err((StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "Admin sahibi silə bilməz." }))));
    }

    sqlx::query("DELETE FROM team_members WHERE team_id = $1 AND user_id = $2")
        .bind(team_uuid)
        .bind(member_id)
        .execute(&state.db)
        .await
        .map_err(|e| {
            tracing::error!("DB error removing member: {:?}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Üzv çıxarılarkən xəta baş verdi." })))
        })?;

    Ok(StatusCode::NO_CONTENT)
}
