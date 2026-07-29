// completed be_1029
// Coolify mənbəsi: app/Http/Controllers/Api/SecurityController.php
use axum::{
    routing::{get, post, delete, patch},
    Router, Json,
    extract::{Path, State},
    http::StatusCode,
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::state::AppState;

#[derive(Debug, Serialize, Deserialize)]
pub struct CreatePrivateKeyRequest {
    pub name: String,
    pub description: Option<String>,
    pub private_key: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdatePrivateKeyRequest {
    pub name: Option<String>,
    pub description: Option<String>,
    pub private_key: Option<String>,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/api/security/keys",
            get(list_private_keys).post(create_private_key))
        .route("/api/security/keys/:uuid",
            get(get_private_key).patch(update_private_key).delete(delete_private_key))
        .with_state(state)
}

// GET /api/security/keys
async fn list_private_keys(
    State(state): State<AppState>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let rows = sqlx::query_as::<_, rc_db::models::private_key::PrivateKey>(
        "SELECT * FROM private_keys ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!(rows)))
}

// POST /api/security/keys
async fn create_private_key(
    State(state): State<AppState>,
    Json(body): Json<CreatePrivateKeyRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let key_uuid = Uuid::new_v4();

    sqlx::query(
        r#"INSERT INTO private_keys (uuid, name, description, private_key, created_at, updated_at)
           VALUES ($1,$2,$3,$4,NOW(),NOW())"#
    )
    .bind(key_uuid)
    .bind(&body.name)
    .bind(body.description.as_deref().unwrap_or(""))
    .bind(&body.private_key)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "uuid": key_uuid, "message": "Private key created." })))
}

// GET /api/security/keys/:uuid
async fn get_private_key(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let row = sqlx::query_as::<_, rc_db::models::private_key::PrivateKey>(
        "SELECT * FROM private_keys WHERE uuid = $1"
    )
    .bind(uuid)
    .fetch_optional(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(serde_json::json!(row)))
}

// PATCH /api/security/keys/:uuid
async fn update_private_key(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
    Json(body): Json<UpdatePrivateKeyRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query(
        r#"UPDATE private_keys SET
            name = COALESCE($2, name),
            description = COALESCE($3, description),
            private_key = COALESCE($4, private_key),
            updated_at = NOW()
           WHERE uuid = $1"#
    )
    .bind(uuid)
    .bind(body.name.as_deref())
    .bind(body.description.as_deref())
    .bind(body.private_key.as_deref())
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Private key updated." })))
}

// DELETE /api/security/keys/:uuid
async fn delete_private_key(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query("DELETE FROM private_keys WHERE uuid = $1")
        .bind(uuid)
        .execute(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Private key deleted." })))
}
