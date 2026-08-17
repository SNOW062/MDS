use axum::{
    routing::{get, post, delete},
    Router, Json,
    extract::{Path, State},
    http::StatusCode,
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::state::AppState;
use rc_db::models::cloud_provider_token::CloudProviderToken;

#[derive(Debug, Deserialize)]
pub struct CreateTokenRequest {
    pub provider: String,
    pub token: String,
    pub name: String,
    pub description: Option<String>,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/api/security/tokens", get(list_tokens).post(create_token))
        .route("/api/security/tokens/validate/:uuid", get(validate_token_handler))
        .route("/api/security/tokens/:uuid", delete(delete_token))
        .with_state(state)
}

/// GET /api/security/tokens/validate/:uuid
async fn validate_token_handler(
    State(state): State<AppState>,
    Path(uuid): Path<String>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let row = sqlx::query("SELECT uuid FROM cloud_provider_tokens WHERE uuid = $1")
        .bind(&uuid)
        .fetch_optional(&state.db)
        .await
        .map_err(|e| {
            tracing::error!("DB error validating cloud token: {:?}", e);
            StatusCode::INTERNAL_SERVER_ERROR
        })?;

    if row.is_some() {
        Ok(Json(serde_json::json!({ "valid": true })))
    } else {
        Ok(Json(serde_json::json!({ "valid": false })))
    }
}

// GET /api/security/tokens
async fn list_tokens(
    State(state): State<AppState>,
) -> Result<Json<Vec<CloudProviderToken>>, StatusCode> {
    let rows = sqlx::query_as::<_, CloudProviderToken>(
        "SELECT uuid, provider, token, name, description FROM cloud_provider_tokens ORDER BY name ASC"
    )
    .fetch_all(&state.db)
    .await
    .map_err(|e| {
        tracing::error!("DB error listing cloud tokens: {:?}", e);
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    Ok(Json(rows))
}

// POST /api/security/tokens
async fn create_token(
    State(state): State<AppState>,
    Json(body): Json<CreateTokenRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let token_uuid = Uuid::new_v4().to_string();

    sqlx::query(
        r#"INSERT INTO cloud_provider_tokens (uuid, provider, token, name, description)
           VALUES ($1, $2, $3, $4, $5)"#
    )
    .bind(&token_uuid)
    .bind(&body.provider)
    .bind(&body.token)
    .bind(&body.name)
    .bind(body.description.as_deref().unwrap_or(""))
    .execute(&state.db)
    .await
    .map_err(|e| {
        tracing::error!("DB error creating cloud token: {:?}", e);
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    Ok(Json(serde_json::json!({ "uuid": token_uuid, "message": "Cloud token created successfully." })))
}

// DELETE /api/security/tokens/:uuid
async fn delete_token(
    State(state): State<AppState>,
    Path(uuid): Path<String>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query("DELETE FROM cloud_provider_tokens WHERE uuid = $1")
        .bind(uuid)
        .execute(&state.db)
        .await
        .map_err(|e| {
            tracing::error!("DB error deleting cloud token: {:?}", e);
            StatusCode::INTERNAL_SERVER_ERROR
        })?;

    Ok(Json(serde_json::json!({ "message": "Cloud token deleted successfully." })))
}
