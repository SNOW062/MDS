// completed file_0506
// Coolify mənbəsi: app/Http/Controllers/Api/OtherController.php
// GET /api/v1/version - coolify version
// GET /api/v1/license - license info
// GET /api/v1/features - enabled features

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
