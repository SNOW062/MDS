// completed file_0500
// Coolify mənbəsi: app/Http/Controllers/Api/DeployController.php
// POST /api/v1/deploy - trigger deploy
// GET /api/v1/deployments - list

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
