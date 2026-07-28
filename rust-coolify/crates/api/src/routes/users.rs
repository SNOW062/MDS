// completed be_1037
// Coolify mənbəsi: app/Http/Controllers/Api/SecurityController.php
// Endpoints: /api/security/keys CRUD (list, get, create, update, delete)

use axum::{
    routing::{get, post, patch, delete},
    Router, Json,
    extract::{Path, State},
    http::StatusCode,
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::state::AppState;

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct PrivateKey {
    pub uuid: Option<String>,
    pub team_id: Option<i64>,
    pub name: Option<String>,
    pub description: Option<String>,
    // private_key sahəsi həssas məlumat kimi gizlədilib
}

#[derive(Debug, Deserialize)]
pub struct CreatePrivateKeyRequest {
    pub name: Option<String>,
    pub description: Option<String>,
    pub private_key: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdatePrivateKeyRequest {
    pub name: Option<String>,
    pub description: Option<String>,
    pub private_key: String,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        // Coolify: GET /security/keys → SecurityController::keys
        .route("/api/security/keys", get(list_keys_handler))
        // Coolify: POST /security/keys → SecurityController::create_key
        .route("/api/security/keys", post(create_key_handler))
        // Coolify: GET /security/keys/:uuid → SecurityController::key_by_uuid
        .route("/api/security/keys/:uuid", get(get_key_handler))
        // Coolify: PATCH /security/keys/:uuid → SecurityController::update_key
        .route("/api/security/keys/:uuid", patch(update_key_handler))
        // Coolify: DELETE /security/keys/:uuid → SecurityController::delete_key
        .route("/api/security/keys/:uuid", delete(delete_key_handler))
        .with_state(state)
}

/// GET /api/security/keys — Komandaya aid bütün private key-ləri siyahıla
/// Coolify: PrivateKey::where('team_id', $teamId)->get()
async fn list_keys_handler(
    State(state): State<AppState>,
) -> Result<Json<Vec<PrivateKey>>, StatusCode> {
    let keys = sqlx::query_as::<_, PrivateKey>(
        "SELECT uuid, team_id, name, description FROM private_keys ORDER BY id"
    )
    .fetch_all(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(keys))
}

/// GET /api/security/keys/:uuid — UUID ilə private key məlumatlarını gətir
/// Coolify: PrivateKey::where('uuid', $uuid)->first() → 404 if null
async fn get_key_handler(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<PrivateKey>, StatusCode> {
    let key = sqlx::query_as::<_, PrivateKey>(
        "SELECT uuid, team_id, name, description FROM private_keys WHERE uuid = $1"
    )
    .bind(uuid.to_string())
    .fetch_optional(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(key))
}

/// POST /api/security/keys — Yeni private key yarat
/// Coolify: PrivateKey::create([...]) → 201 with uuid
async fn create_key_handler(
    State(state): State<AppState>,
    Json(payload): Json<CreatePrivateKeyRequest>,
) -> Result<(StatusCode, Json<serde_json::Value>), StatusCode> {
    if payload.private_key.trim().is_empty() {
        return Err(StatusCode::UNPROCESSABLE_ENTITY);
    }

    let key_uuid = Uuid::new_v4().to_string();
    let name = payload.name.unwrap_or_else(|| format!("key-{}", &key_uuid[..8]));
    let description = payload.description.unwrap_or_else(|| "Created via MasterDeploy API".to_string());

    sqlx::query(
        "INSERT INTO private_keys (uuid, name, description, private_key, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())"
    )
    .bind(&key_uuid)
    .bind(&name)
    .bind(&description)
    .bind(&payload.private_key)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok((StatusCode::CREATED, Json(serde_json::json!({ "uuid": key_uuid }))))
}

/// PATCH /api/security/keys/:uuid — Private key-i yenilə
/// Coolify: $foundKey->update($request->only($allowedFields)) → 201 with uuid
async fn update_key_handler(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
    Json(payload): Json<UpdatePrivateKeyRequest>,
) -> Result<(StatusCode, Json<serde_json::Value>), StatusCode> {
    let exists: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM private_keys WHERE uuid = $1")
        .bind(uuid.to_string())
        .fetch_one(&state.db)
        .await
        .unwrap_or(0);

    if exists == 0 {
        return Err(StatusCode::NOT_FOUND);
    }

    sqlx::query(
        "UPDATE private_keys SET name = COALESCE($1, name), description = COALESCE($2, description),
         private_key = $3, updated_at = NOW() WHERE uuid = $4"
    )
    .bind(payload.name)
    .bind(payload.description)
    .bind(&payload.private_key)
    .bind(uuid.to_string())
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok((StatusCode::CREATED, Json(serde_json::json!({ "uuid": uuid.to_string() }))))
}

/// DELETE /api/security/keys/:uuid — Private key-i sil
/// Coolify: $key->forceDelete() — istifadədədirsə 422 qaytar
async fn delete_key_handler(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let exists: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM private_keys WHERE uuid = $1")
        .bind(uuid.to_string())
        .fetch_one(&state.db)
        .await
        .unwrap_or(0);

    if exists == 0 {
        return Err(StatusCode::NOT_FOUND);
    }

    // Əgər serverlər tərəfindən istifadə edilərsə, silmək olmaz (Coolify: $key->isInUse())
    let in_use: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM servers WHERE private_key_id = (SELECT id FROM private_keys WHERE uuid = $1)"
    )
    .bind(uuid.to_string())
    .fetch_one(&state.db)
    .await
    .unwrap_or(0);

    if in_use > 0 {
        return Err(StatusCode::UNPROCESSABLE_ENTITY);
    }

    sqlx::query("DELETE FROM private_keys WHERE uuid = $1")
        .bind(uuid.to_string())
        .execute(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Private Key deleted." })))
}
