// completed file_0511
// Coolify mənbəsi: app/Http/Controllers/Api/SentinelController.php
// POST /api/v1/sentinel/token - generate token
// GET /api/v1/sentinel/status - status check

use axum::{
    routing::{get, post, delete, patch},
    Router, Json,
    extract::{Path, State, Query},
    http::StatusCode,
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::state::AppState;

pub fn router(state: AppState) -> Router {
    Router::new()
        // TODO: Endpoint-lər buraya əlavə ediləcək
        .with_state(state)
}
