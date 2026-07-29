// completed file_0507
// Coolify mənbəsi: app/Http/Controllers/Api/ProjectController.php
// GET /api/v1/projects - list
// POST /api/v1/projects - create
// GET /api/v1/projects/:uuid - show
// PATCH /api/v1/projects/:uuid - update
// DELETE /api/v1/projects/:uuid - delete
// GET /api/v1/projects/:uuid/environments - list envs

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
