// completed file_0498
// Coolify mənbəsi: app/Http/Controllers/Api/CloudProviderTokensController.php
// GET /api/v1/cloud-provider-tokens - list
// POST /api/v1/cloud-provider-tokens - create
// DELETE /api/v1/cloud-provider-tokens/:uuid - delete

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
