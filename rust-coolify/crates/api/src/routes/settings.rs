// completed be_1034
// Coolify mənbəsi: app/Http/Controllers/Api/OtherController.php
// Endpoints: /version, /enable, /disable, /health, /mcp/enable, /mcp/disable

use axum::{
    routing::{get, post},
    Router, Json,
    extract::State,
    http::StatusCode,
};
use crate::state::AppState;

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/api/version", get(version_handler))
        .route("/api/health", get(health_handler))
        .route("/api/enable", post(enable_api_handler))
        .route("/api/disable", post(disable_api_handler))
        .route("/api/mcp/enable", post(enable_mcp_handler))
        .route("/api/mcp/disable", post(disable_mcp_handler))
        .with_state(state)
}

/// GET /api/version - Coolify versiyasını qaytarır (OtherController::version)
async fn version_handler() -> &'static str {
    env!("CARGO_PKG_VERSION")
}

/// GET /api/health - Sağlamlıq yoxlaması (OtherController::healthcheck)
async fn health_handler() -> &'static str {
    "OK"
}

/// POST /api/enable - API-ni aktivləşdirir (yalnız root team_id = 0)
/// Coolify: OtherController::enable_api — teamId !== '0' → 403
async fn enable_api_handler(
    State(state): State<AppState>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query(
        "UPDATE instance_settings SET is_api_enabled = true WHERE id = 0"
    )
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "API enabled." })))
}

/// POST /api/disable - API-ni söndürür (yalnız root team_id = 0)
/// Coolify: OtherController::disable_api — teamId !== '0' → 403
async fn disable_api_handler(
    State(state): State<AppState>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query(
        "UPDATE instance_settings SET is_api_enabled = false WHERE id = 0"
    )
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "API disabled." })))
}

/// POST /api/mcp/enable - MCP serverini aktivləşdirir (yalnız root)
/// Coolify: OtherController::enable_mcp
async fn enable_mcp_handler(
    State(state): State<AppState>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query(
        "UPDATE instance_settings SET is_mcp_server_enabled = true WHERE id = 0"
    )
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "MCP server enabled." })))
}

/// POST /api/mcp/disable - MCP serverini söndürür (yalnız root)
/// Coolify: OtherController::disable_mcp
async fn disable_mcp_handler(
    State(state): State<AppState>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query(
        "UPDATE instance_settings SET is_mcp_server_enabled = false WHERE id = 0"
    )
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "MCP server disabled." })))
}
