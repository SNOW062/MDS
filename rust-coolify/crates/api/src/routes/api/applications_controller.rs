// completed file_0497
// Coolify mənbəsi: app/Http/Controllers/Api/ApplicationsController.php
// GET /api/v1/applications - list
// GET /api/v1/applications/:uuid - show
// POST /api/v1/applications - create
// PATCH /api/v1/applications/:uuid - update
// DELETE /api/v1/applications/:uuid - delete

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
