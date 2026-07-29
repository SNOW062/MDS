// completed file_0502
// Coolify mənbəsi: app/Http/Controllers/Api/DigitalOceanController.php
// POST /api/v1/digital-ocean/validate - validate token
// GET /api/v1/digital-ocean/regions - list regions
// GET /api/v1/digital-ocean/sizes - list sizes

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
