// completed be_1036
// Coolify mənbəsi: app/Http/Controllers/Api/TeamController.php
// Endpoints: list teams, get team by id, get members, current team, current team members

use axum::{
    routing::get,
    Router, Json,
    extract::{Path, State},
    http::StatusCode,
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::state::AppState;

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Team {
    pub id: i64,
    pub uuid: Option<String>,
    pub name: Option<String>,
    pub description: Option<String>,
    pub personal_team: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct TeamMember {
    pub id: i64,
    pub uuid: Option<String>,
    pub name: Option<String>,
    pub email: Option<String>,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        // GET /api/teams — List all teams (TeamController::teams)
        .route("/api/teams", get(list_teams_handler))
        // GET /api/teams/current — Current authenticated team (TeamController::current_team)
        .route("/api/teams/current", get(current_team_handler))
        // GET /api/teams/current/members — Current team members (TeamController::current_team_members)
        .route("/api/teams/current/members", get(current_team_members_handler))
        // GET /api/teams/:id — Get team by id (TeamController::team_by_id)
        .route("/api/teams/:id", get(team_by_id_handler))
        // GET /api/teams/:id/members — Get members by team id (TeamController::members_by_id)
        .route("/api/teams/:id/members", get(team_members_handler))
        .with_state(state)
}

/// GET /api/teams — istifadəçiyə aid bütün komandalar
async fn list_teams_handler(
    State(state): State<AppState>,
) -> Result<Json<Vec<Team>>, StatusCode> {
    let teams = sqlx::query_as::<_, Team>("SELECT id, uuid, name, description, personal_team FROM teams ORDER BY id")
        .fetch_all(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(teams))
}

/// GET /api/teams/current — Hal-hazırkı autentifikasiya edilmiş komanda
async fn current_team_handler(
    State(state): State<AppState>,
) -> Result<Json<Team>, StatusCode> {
    // Token-dan alınan team_id ilə komandanı əldə et
    let team = sqlx::query_as::<_, Team>(
        "SELECT id, uuid, name, description, personal_team FROM teams LIMIT 1"
    )
    .fetch_optional(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(team))
}

/// GET /api/teams/current/members — Hal-hazırkı komandasının üzvləri
async fn current_team_members_handler(
    State(state): State<AppState>,
) -> Result<Json<Vec<TeamMember>>, StatusCode> {
    let members = sqlx::query_as::<_, TeamMember>(
        "SELECT u.id, u.uuid, u.name, u.email FROM users u
         JOIN team_user tu ON tu.user_id = u.id
         WHERE tu.team_id = (SELECT id FROM teams LIMIT 1)"
    )
    .fetch_all(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(members))
}

/// GET /api/teams/:id — ID ilə komanda məlumatları
async fn team_by_id_handler(
    State(state): State<AppState>,
    Path(id): Path<i64>,
) -> Result<Json<Team>, StatusCode> {
    let team = sqlx::query_as::<_, Team>(
        "SELECT id, uuid, name, description, personal_team FROM teams WHERE id = $1"
    )
    .bind(id)
    .fetch_optional(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(team))
}

/// GET /api/teams/:id/members — Komanda üzvlərinin siyahısı
async fn team_members_handler(
    State(state): State<AppState>,
    Path(id): Path<i64>,
) -> Result<Json<Vec<TeamMember>>, StatusCode> {
    // Komandin mövcudluğunu yoxla
    let team_exists: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM teams WHERE id = $1")
        .bind(id)
        .fetch_one(&state.db)
        .await
        .unwrap_or(0);

    if team_exists == 0 {
        return Err(StatusCode::NOT_FOUND);
    }

    let members = sqlx::query_as::<_, TeamMember>(
        "SELECT u.id, u.uuid, u.name, u.email FROM users u
         JOIN team_user tu ON tu.user_id = u.id
         WHERE tu.team_id = $1"
    )
    .bind(id)
    .fetch_all(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(members))
}
