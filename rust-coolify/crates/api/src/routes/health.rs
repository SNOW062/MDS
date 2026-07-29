// completed be_1027
// Coolify mənbəsi: routes/api.php → /health endpoint
use axum::{routing::get, Router, Json, extract::State, http::StatusCode};
use serde::Serialize;
use crate::state::AppState;

#[derive(Serialize)]
struct HealthResponse {
    status: &'static str,
    version: String,
    db: &'static str,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/api/health", get(health_handler))
        .route("/api/health/db", get(db_health_handler))
        .with_state(state)
}

// GET /api/health
async fn health_handler() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "ok",
        version: env!("CARGO_PKG_VERSION").to_string(),
        db: "unknown",
    })
}

// GET /api/health/db
async fn db_health_handler(
    State(state): State<AppState>,
) -> Result<Json<HealthResponse>, StatusCode> {
    let db_ok = sqlx::query("SELECT 1")
        .fetch_optional(&state.db)
        .await
        .is_ok();

    Ok(Json(HealthResponse {
        status: if db_ok { "ok" } else { "degraded" },
        version: env!("CARGO_PKG_VERSION").to_string(),
        db: if db_ok { "ok" } else { "unreachable" },
    }))
}
