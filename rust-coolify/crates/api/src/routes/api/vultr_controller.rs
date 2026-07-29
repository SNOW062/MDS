// completed file_0519
// Coolify mənbəsi: app/Http/Controllers/Api/VultrController.php
// POST /api/v1/vultr/validate - validate token
// GET /api/v1/vultr/regions - list regions
// GET /api/v1/vultr/plans - list plans

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
