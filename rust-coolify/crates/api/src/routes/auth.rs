use axum::{
    routing::post,
    Router, Json,
    http::StatusCode,
    extract::State,
};
use serde::{Serialize, Deserialize};
use crate::state::AppState;
use rc_auth::password::{hash_password, verify_password};
use rc_auth::session::create_session;
use uuid::Uuid;

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct AuthResponse {
    pub token: String,
    pub user: serde_json::Value,
    pub team: serde_json::Value,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/api/login", post(login_handler))
        .route("/api/register", post(register_handler))
        .route("/api/auth/status", axum::routing::get(auth_status_handler))
        .with_state(state)
}

#[derive(Debug, Serialize)]
pub struct AuthStatusResponse {
    pub is_first_user: bool,
    pub is_registration_enabled: bool,
}

/// GET /api/auth/status
/// Coolify FortifyServiceProvider view-larındakı yoxlama məntiqinin eynisidir
async fn auth_status_handler(
    State(state): State<AppState>,
) -> Result<Json<AuthStatusResponse>, (StatusCode, Json<serde_json::Value>)> {
    let user_count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM users")
        .fetch_one(&state.db)
        .await
        .unwrap_or(0);

    // is_registration_enabled parametrini instance_settings-dən alırıq
    // Coolify: $settings->is_registration_enabled (bizdə yoxdursa default false edirik)
    let is_reg_enabled: bool = sqlx::query_scalar(
        "SELECT COALESCE(is_registration_enabled, false) FROM instance_settings LIMIT 1"
    )
    .fetch_optional(&state.db)
    .await
    .unwrap_or(None)
    .unwrap_or(false);

    Ok(Json(AuthStatusResponse {
        is_first_user: user_count == 0,
        is_registration_enabled: is_reg_enabled,
    }))
}



/// POST /api/login
async fn login_handler(
    State(state): State<AppState>,
    Json(body): Json<LoginRequest>,
) -> Result<Json<AuthResponse>, (StatusCode, Json<serde_json::Value>)> {
    let email_input = body.email.trim().to_lowercase();
    let pwd_input = body.password.trim();

    // Verilənlər bazasından istifadəçini və onun ilk komandasını çəkirik
    let user_row = sqlx::query(
        "SELECT id, name, email, password FROM users WHERE LOWER(email) = $1 LIMIT 1"
    )
    .bind(&email_input)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| {
        tracing::error!("Database query error during login: {:?}", e);
        (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Verilənlər bazası xətası." })))
    })?;

    if let Some(row) = user_row {
        use sqlx::Row;
        let db_pwd: Option<String> = row.try_get("password").ok();
        let user_id: Uuid = row.try_get("id").map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "İstifadəçi ID xətası." }))))?;
        let name: String = row.try_get("name").unwrap_or_default();
        let email: String = row.try_get("email").unwrap_or_default();

        if let Some(db_pwd_str) = db_pwd {
            // Şifrənin Argon2 ilə yoxlanılması
            let is_match = verify_password(pwd_input, &db_pwd_str).unwrap_or(false);
            if is_match {
                // İstifadəçinin fərdi komandasını tapırıq
                let team_row = sqlx::query(
                    "SELECT t.id, t.name FROM teams t 
                     JOIN team_members tm ON tm.team_id = t.id 
                     WHERE tm.user_id = $1 LIMIT 1"
                )
                .bind(user_id)
                .fetch_optional(&state.db)
                .await
                .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Komanda məlumatları tapılmadı." }))))?;

                let (team_id, team_name) = match team_row {
                    Some(tr) => {
                        use sqlx::Row;
                        let tid: Uuid = tr.try_get("id").unwrap_or_else(|_| Uuid::new_v4());
                        let tname: String = tr.try_get("name").unwrap_or_else(|_| "Fərdi Komanda".to_string());
                        (tid, tname)
                    },
                    None => {
                        // Əgər istifadəçinin komandası yoxdursa, yeni bir komanda yaradaq
                        let tid = Uuid::new_v4();
                        let tname = format!("{}'s Team", name);
                        sqlx::query("INSERT INTO teams (id, name, personal_team, show_boarding, custom_server_limit, is_mcp_server_enabled, created_at, updated_at) VALUES ($1, $2, true, true, 10, false, NOW(), NOW())")
                            .bind(tid)
                            .bind(&tname)
                            .execute(&state.db)
                            .await
                            .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Yeni komanda yaradıla bilmədi." }))))?;

                        sqlx::query("INSERT INTO team_members (id, team_id, user_id, role, created_at) VALUES ($1, $2, $3, 'owner', NOW())")
                            .bind(Uuid::new_v4())
                            .bind(tid)
                            .bind(user_id)
                            .execute(&state.db)
                            .await
                            .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Komanda üzvü əlavə edilə bilmədi." }))))?;

                        (tid, tname)
                    }
                };

                let jwt_secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "change-me-in-production".to_string());
                let token = create_session(user_id, Some(team_id), &jwt_secret, 168)
                    .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Token yaradıla bilmədi." }))))?;

                return Ok(Json(AuthResponse {
                    token,
                    user: serde_json::json!({
                        "id": user_id,
                        "name": name,
                        "email": email,
                    }),
                    team: serde_json::json!({
                        "id": team_id,
                        "name": team_name,
                    }),
                }));
            }
        }
    }

    Err((StatusCode::UNAUTHORIZED, Json(serde_json::json!({ "error": "İstifadəçi adı və ya şifrə yanlışdır." }))))
}

#[derive(Debug, Deserialize)]
pub struct RegisterRequest {
    pub email: String,
    pub password: String,
    pub invitation: Option<String>,
}

/// POST /api/register
async fn register_handler(
    State(state): State<AppState>,
    Json(body): Json<RegisterRequest>,
) -> Result<Json<AuthResponse>, (StatusCode, Json<serde_json::Value>)> {
    let email_input = body.email.trim().to_lowercase();
    let pwd_input = body.password.trim();

    if email_input.is_empty() || pwd_input.is_empty() {
        return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "E-poçt və şifrə boş ola bilməz." }))));
    }

    // Mövcud istifadəçi sayını yoxla
    let user_count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM users")
        .fetch_one(&state.db)
        .await
        .unwrap_or(0);

    let mut assigned_role = "member";
    let mut invited_team_id: Option<Uuid> = None;

    if user_count == 0 {
        assigned_role = "owner";
    } else {
        // Əgər ilk istifadəçi deyilsə, dəvət olmalıdır
        let inv_uuid_str = match body.invitation {
            Some(ref val) if !val.trim().is_empty() => val.trim().to_string(),
            _ => return Err((StatusCode::FORBIDDEN, Json(serde_json::json!({ "error": "Sərbəst qeydiyyat aktiv deyil. Yalnız dəvət linki ilə qeydiyyatdan keçə bilərsiniz." })))),
        };

        let inv_uuid = Uuid::parse_str(&inv_uuid_str).map_err(|_| {
            (StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Keçərsiz dəvət kodu formatı." })))
        })?;

        // Dəvəti bazada yoxla
        let db_inv: Option<(Uuid, Uuid, String, String)> = sqlx::query_as::<_, (Uuid, Uuid, String, String)>(
            "SELECT id, team_id, email, role FROM team_invitations WHERE uuid = $1 LIMIT 1"
        )
        .bind(inv_uuid)
        .fetch_optional(&state.db)
        .await
        .map_err(|e| {
            tracing::error!("DB error checking invitation: {:?}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Verilənlər bazası xətası." })))
        })?;

        if let Some((inv_id, team_id, inv_email, inv_role)) = db_inv {
            if inv_email.to_lowercase() != email_input {
                return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Bu dəvət linki başqa e-poçt ünvanına məxsusdur." }))));
            }
            assigned_role = Box::leak(inv_role.into_boxed_str());
            invited_team_id = Some(team_id);

            // Dəvət linkini silirik
            let _ = sqlx::query("DELETE FROM team_invitations WHERE id = $1")
                .bind(inv_id)
                .execute(&state.db)
                .await;
        } else {
            return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Keçərsiz və ya müddəti bitmiş dəvət linki." }))));
        }
    }

    // Şifrənin Argon2 ilə hash-lənməsi
    let pwd_hash = hash_password(pwd_input).map_err(|_| {
        (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Şifrə təhlükəsizliyi təmin edilə bilmədi." })))
    })?;

    // İstifadəçini daxil edirik
    let user_uuid = Uuid::new_v4();
    let name_part = email_input.split('@').next().unwrap_or(&email_input).to_string();

    let res = sqlx::query(
        "INSERT INTO users (id, name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW())"
    )
    .bind(user_uuid)
    .bind(&name_part)
    .bind(&email_input)
    .bind(&pwd_hash)
    .execute(&state.db)
    .await;

    match res {
        Ok(_) => {
            // İstifadəçinin fərdi komandasını yaradırıq
            let personal_team_id = Uuid::new_v4();
            let personal_team_name = format!("{}'s Team", name_part);
            
            let _ = sqlx::query(
                "INSERT INTO teams (id, name, personal_team, show_boarding, custom_server_limit, is_mcp_server_enabled, created_at, updated_at) 
                 VALUES ($1, $2, true, true, 10, false, NOW(), NOW())"
            )
            .bind(personal_team_id)
            .bind(&personal_team_name)
            .execute(&state.db)
            .await;

            // Fərdi komandaya sahib (owner) olaraq daxil edirik
            let _ = sqlx::query(
                "INSERT INTO team_members (id, team_id, user_id, role, created_at) VALUES ($1, $2, $3, 'owner', NOW())"
            )
            .bind(Uuid::new_v4())
            .bind(personal_team_id)
            .bind(user_uuid)
            .execute(&state.db)
            .await;

            // Əgər dəvət ilə gəlibsə, dəvət olunduğu komandaya da əlavə edirik
            let active_team_id = if let Some(team_id) = invited_team_id {
                let _ = sqlx::query(
                    "INSERT INTO team_members (id, team_id, user_id, role, created_at) VALUES ($1, $2, $3, $4, NOW())"
                )
                .bind(Uuid::new_v4())
                .bind(team_id)
                .bind(user_uuid)
                .bind(assigned_role)
                .execute(&state.db)
                .await;
                team_id
            } else {
                personal_team_id
            };

            let jwt_secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "change-me-in-production".to_string());
            let token = create_session(user_uuid, Some(active_team_id), &jwt_secret, 168)
                .unwrap_or_default();

            Ok(Json(AuthResponse {
                token,
                user: serde_json::json!({
                    "id": user_uuid,
                    "name": name_part,
                    "email": email_input,
                }),
                team: serde_json::json!({
                    "id": active_team_id,
                    "name": if invited_team_id.is_some() { "Dəvət olunan Komanda" } else { &personal_team_name },
                }),
            }))
        },
        Err(e) => {
            tracing::error!("DB register error: {:?}", e);
            let err_msg = if e.to_string().contains("users_email_key") {
                "Bu e-poçt ilə artıq qeydiyyatdan keçilib."
            } else {
                "Verilənlər bazası xətası baş verdi."
            };
            Err((StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": err_msg }))))
        }
    }
}
