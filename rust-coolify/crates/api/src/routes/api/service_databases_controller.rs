// completed file_0514
// Coolify mənbəsi: app/Http/Controllers/Api/ServiceDatabasesController.php
// GET /api/v1/service-databases/:uuid - show
// PATCH /api/v1/service-databases/:uuid - update
// DELETE /api/v1/service-databases/:uuid - delete

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
