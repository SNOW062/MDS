// completed file_0503
// Coolify mənbəsi: app/Http/Controllers/Api/GithubController.php
// GET /api/v1/github - list github apps
// GET /api/v1/github/:uuid/repos - list repos
// GET /api/v1/github/:uuid/branches - list branches

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
