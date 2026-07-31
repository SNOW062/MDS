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
pub struct UserDto {
    pub uuid: String,
    pub name: String,
    pub email: String,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/api/users", get(list_users_handler))
        .route("/api/users/:uuid", get(get_user_handler))
        .route("/api/profile", axum::routing::put(update_profile_handler))
        .route("/api/profile/password", axum::routing::put(update_password_handler))
        .route_layer(from_fn_with_state(state.clone(), crate::middleware::auth::auth_middleware))
        .with_state(state)
}

async fn list_users_handler(
    State(state): State<AppState>,
) -> Result<Json<Vec<UserDto>>, StatusCode> {
    let users = sqlx::query_as::<_, UserDto>(
        "SELECT id::text as uuid, name, email FROM users ORDER BY created_at"
    )
    .fetch_all(&state.db)
    .await
    .map_err(|e| {
        tracing::error!("DB error listing users: {:?}", e);
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    Ok(Json(users))
}

async fn get_user_handler(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<UserDto>, StatusCode> {
    let row = sqlx::query_as::<_, UserDto>(
        "SELECT id::text as uuid, name, email FROM users WHERE id = $1 LIMIT 1"
    )
    .bind(uuid)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| {
        tracing::error!("DB error getting user: {:?}", e);
        StatusCode::INTERNAL_SERVER_ERROR
    })?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(row))
}

#[derive(Debug, Deserialize)]
pub struct UpdateProfileRequest {
    pub name: String,
    pub email: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdatePasswordRequest {
    pub current_password: String,
    pub new_password: String,
}

/// PUT /api/profile
async fn update_profile_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
    Json(body): Json<UpdateProfileRequest>,
) -> Result<StatusCode, (StatusCode, Json<serde_json::Value>)> {
    let name_input = body.name.trim();
    let email_input = body.email.trim().to_lowercase();

    if name_input.is_empty() || email_input.is_empty() {
        return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Ad və E-poçt boş ola bilməz." }))));
    }

    let user_uuid = Uuid::parse_str(&claims.sub).map_err(|_| {
        (StatusCode::UNAUTHORIZED, Json(serde_json::json!({ "error": "Yetkisiz giriş." })))
    })?;

    // Email-in başqa istifadəçi tərəfindən istifadə edilmədiyini yoxla
    let email_exists: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM users WHERE email = $1 AND id != $2"
    )
    .bind(&email_input)
    .bind(user_uuid)
    .fetch_one(&state.db)
    .await
    .unwrap_or(0);

    if email_exists > 0 {
        return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Bu e-poçt ünvanı artıq başqa istifadəçi tərəfindən istifadə edilir." }))));
    }

    sqlx::query(
        "UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3"
    )
    .bind(name_input)
    .bind(&email_input)
    .bind(user_uuid)
    .execute(&state.db)
    .await
    .map_err(|e| {
        tracing::error!("DB error updating profile: {:?}", e);
        (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Verilənlər bazası xətası." })))
    })?;

    Ok(StatusCode::OK)
}

/// PUT /api/profile/password
async fn update_password_handler(
    State(state): State<AppState>,
    Extension(claims): Extension<SessionClaims>,
    Json(body): Json<UpdatePasswordRequest>,
) -> Result<StatusCode, (StatusCode, Json<serde_json::Value>)> {
    let current_pwd = body.current_password.trim();
    let new_pwd = body.new_password.trim();

    if current_pwd.is_empty() || new_pwd.is_empty() {
        return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Şifrə sahələri boş ola bilməz." }))));
    }

    let user_uuid = Uuid::parse_str(&claims.sub).map_err(|_| {
        (StatusCode::UNAUTHORIZED, Json(serde_json::json!({ "error": "Yetkisiz giriş." })))
    })?;

    let db_pwd: Option<String> = sqlx::query_scalar(
        "SELECT password FROM users WHERE id = $1"
    )
    .bind(user_uuid)
    .fetch_one(&state.db)
    .await
    .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "İstifadəçi tapılmadı." }))))?;

    if let Some(pwd) = db_pwd {
        let is_match = rc_auth::password::verify_password(current_pwd, &pwd).unwrap_or(false);
        if !is_match {
            return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Cari şifrəniz yanlışdır." }))));
        }
    } else {
        return Err((StatusCode::BAD_REQUEST, Json(serde_json::json!({ "error": "Cari şifrəniz təyin edilməyib." }))));
    }

    let hashed_new_pwd = rc_auth::password::hash_password(new_pwd).map_err(|_| {
        (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Şifrə təhlükəsizliyi təmin edilə bilmədi." })))
    })?;

    sqlx::query(
        "UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2"
    )
    .bind(hashed_new_pwd)
    .bind(user_uuid)
    .execute(&state.db)
    .await
    .map_err(|e| {
        tracing::error!("DB error updating password: {:?}", e);
        (StatusCode::INTERNAL_SERVER_ERROR, Json(serde_json::json!({ "error": "Verilənlər bazası xətası." })))
    })?;

    Ok(StatusCode::OK)
}
