// completed file_0516
// Coolify mənbəsi: app/Http/Controllers/Api/TagsController.php
// GET /api/v1/tags - list
// DELETE /api/v1/tags/:name - delete

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
