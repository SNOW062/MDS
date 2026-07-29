// completed file_0513
// Coolify mənbəsi: app/Http/Controllers/Api/ServiceApplicationsController.php
// GET /api/v1/service-applications/:uuid - show
// PATCH /api/v1/service-applications/:uuid - update
// DELETE /api/v1/service-applications/:uuid - delete

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
