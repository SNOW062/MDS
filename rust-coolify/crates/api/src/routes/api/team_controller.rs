// completed file_0517
// Coolify mənbəsi: app/Http/Controllers/Api/TeamController.php
// GET /api/v1/teams - list teams
// GET /api/v1/teams/current - current team
// GET /api/v1/teams/current/members - team members

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
