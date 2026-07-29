// completed file_0501
// Coolify mənbəsi: app/Http/Controllers/Api/DestinationsController.php
// GET /api/v1/destinations - list
// POST /api/v1/destinations - create
// DELETE /api/v1/destinations/:uuid - delete

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
