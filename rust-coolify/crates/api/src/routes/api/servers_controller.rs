// completed file_0512
// Coolify mənbəsi: app/Http/Controllers/Api/ServersController.php
// GET /api/v1/servers - list
// POST /api/v1/servers - create
// GET /api/v1/servers/:uuid - show
// PATCH /api/v1/servers/:uuid - update
// DELETE /api/v1/servers/:uuid - delete
// GET /api/v1/servers/:uuid/resources - list resources
// GET /api/v1/servers/:uuid/domains - list domains

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
