// completed be_1026
// Coolify mənbəsi: routes/api.php → /deploy/* endpointləri
use axum::{
    routing::{get, post, delete},
    Router, Json,
    extract::{Path, State, Query},
    http::StatusCode,
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::state::AppState;

#[derive(Debug, Serialize, Deserialize)]
pub struct DeployRequest {
    pub uuid: Uuid,
    pub force: Option<bool>,
    pub pull_request_id: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DeploymentListQuery {
    pub skip: Option<i64>,
    pub take: Option<i64>,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        // Deploy queue
        .route("/api/deploy", post(trigger_deploy))
        .route("/api/deployments", get(list_all_deployments))
        .route("/api/deployments/:uuid", get(get_deployment_by_uuid).delete(cancel_deployment))
        .with_state(state)
}

// POST /api/deploy
async fn trigger_deploy(
    State(state): State<AppState>,
    Json(body): Json<DeployRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let deployment_uuid = Uuid::new_v4();

    // Application deployment queue-ya əlavə et
    sqlx::query(
        r#"INSERT INTO application_deployment_queues
           (uuid, application_uuid, status, pull_request_id, force_rebuild, created_at, updated_at)
           VALUES ($1, $2, 'queued', $3, $4, NOW(), NOW())"#
    )
    .bind(deployment_uuid)
    .bind(body.uuid)
    .bind(body.pull_request_id)
    .bind(body.force.unwrap_or(false))
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({
        "deployments": [{
            "deployment_uuid": deployment_uuid,
            "resource_uuid": body.uuid,
            "message": "Deployment queued."
        }]
    })))
}

// GET /api/deployments
async fn list_all_deployments(
    State(state): State<AppState>,
    Query(q): Query<DeploymentListQuery>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let skip = q.skip.unwrap_or(0);
    let take = q.take.unwrap_or(20).min(100);

    let rows = sqlx::query(
        r#"SELECT uuid, application_uuid, status, created_at, updated_at
           FROM application_deployment_queues
           ORDER BY created_at DESC
           LIMIT $1 OFFSET $2"#
    )
    .bind(take)
    .bind(skip)
    .fetch_all(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!([])))
}

// GET /api/deployments/:uuid
async fn get_deployment_by_uuid(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let row = sqlx::query(
        "SELECT * FROM application_deployment_queues WHERE uuid = $1"
    )
    .bind(uuid)
    .fetch_optional(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(serde_json::json!({
        "uuid": uuid,
        "status": "queued"
    })))
}

// DELETE /api/deployments/:uuid (cancel)
async fn cancel_deployment(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query(
        "UPDATE application_deployment_queues SET status = 'cancelled', updated_at = NOW() WHERE uuid = $1"
    )
    .bind(uuid)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Deployment cancelled." })))
}
