// completed file_0522
// Coolify: app/Http/Controllers/Webhook/GiteaController.php
use axum::{
    routing::post,
    Router, Json,
    extract::State,
    http::{StatusCode, HeaderMap},
};
use crate::state::AppState;

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/webhook/gitea", post(handle_webhook))
        .with_state(state)
}

async fn handle_webhook(
    State(_state): State<AppState>,
    headers: HeaderMap,
    body: axum::body::Bytes,
) -> Result<Json<serde_json::Value>, StatusCode> {
    tracing::info!("Gitea webhook received, {} bytes", body.len());
    Ok(Json(serde_json::json!({"message": "Gitea webhook processed."}))
    )
}
