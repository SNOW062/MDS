// completed file_0504
// Coolify mənbəsi: app/Http/Controllers/Api/HetznerController.php
// POST /api/v1/hetzner/validate - validate token
// GET /api/v1/hetzner/regions - list regions
// GET /api/v1/hetzner/server-types - list types

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
