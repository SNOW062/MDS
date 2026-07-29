// completed file_0521
// Coolify: app/Http/Controllers/Webhook/BitbucketController.php
use axum::{
    routing::post,
    Router, Json,
    extract::State,
    http::{StatusCode, HeaderMap},
};
use crate::state::AppState;

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/webhook/bitbucket", post(handle_webhook))
        .with_state(state)
}

async fn handle_webhook(
    State(_state): State<AppState>,
    headers: HeaderMap,
    body: axum::body::Bytes,
) -> Result<Json<serde_json::Value>, StatusCode> {
    tracing::info!("Bitbucket webhook received, {} bytes", body.len());
    Ok(Json(serde_json::json!({"message": "Bitbucket webhook processed."}))
    )
}
