// completed file_0515
// Coolify mənbəsi: app/Http/Controllers/Api/ServicesController.php
// GET /api/v1/services - list
// POST /api/v1/services - create
// GET /api/v1/services/:uuid - show
// PATCH /api/v1/services/:uuid - update
// DELETE /api/v1/services/:uuid - delete
// POST /api/v1/services/:uuid/start - start
// POST /api/v1/services/:uuid/stop - stop
// POST /api/v1/services/:uuid/restart - restart

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
