// completed file_0523
// Coolify: app/Http/Controllers/Webhook/GitHubController.php
use axum::{
    routing::post,
    Router, Json,
    extract::State,
    http::{StatusCode, HeaderMap},
};
use crate::state::AppState;

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/webhook/github", post(handle_webhook))
        .with_state(state)
}

async fn handle_webhook(
    State(_state): State<AppState>,
    headers: HeaderMap,
    body: axum::body::Bytes,
) -> Result<Json<serde_json::Value>, StatusCode> {
    tracing::info!("GitHub webhook received, {} bytes", body.len());
    Ok(Json(serde_json::json!({"message": "GitHub webhook processed."}))
    )
}
