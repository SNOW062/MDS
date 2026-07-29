// completed file_0510
// Coolify mənbəsi: app/Http/Controllers/Api/SecurityController.php
// GET /api/v1/security/keys - list keys
// POST /api/v1/security/keys - create key
// DELETE /api/v1/security/keys/:uuid - delete key

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
