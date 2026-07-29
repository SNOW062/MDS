// completed file_0509
// Coolify mənbəsi: app/Http/Controllers/Api/ScheduledTasksController.php
// GET /api/v1/tasks - list
// POST /api/v1/tasks - create
// GET /api/v1/tasks/:uuid - show
// PATCH /api/v1/tasks/:uuid - update
// DELETE /api/v1/tasks/:uuid - delete

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
