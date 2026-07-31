// completed be_1031
// Coolify mənbəsi: app/Http/Controllers/Api/ScheduledTasksController.php
use axum::{
    routing::{get, post, delete, patch},
    Router, Json,
    extract::{Path, State},
    http::StatusCode,
};
use serde::{Serialize, Deserialize};
use sqlx::Row;
use uuid::Uuid;
use crate::state::AppState;

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateScheduledTaskRequest {
    pub name: String,
    pub command: String,
    pub frequency: String,
    pub container: Option<String>,
    pub application_uuid: Option<Uuid>,
    pub service_uuid: Option<Uuid>,
    pub enabled: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateScheduledTaskRequest {
    pub name: Option<String>,
    pub command: Option<String>,
    pub frequency: Option<String>,
    pub container: Option<String>,
    pub enabled: Option<bool>,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/api/scheduled-tasks",
            get(list_scheduled_tasks).post(create_scheduled_task))
        .route("/api/scheduled-tasks/:uuid",
            get(get_scheduled_task).patch(update_scheduled_task).delete(delete_scheduled_task))
        .route("/api/scheduled-tasks/:uuid/executions",
            get(get_task_executions))
        .with_state(state)
}

// GET /api/scheduled-tasks
async fn list_scheduled_tasks(
    State(state): State<AppState>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let rows = sqlx::query_as::<_, rc_db::models::scheduled_task::ScheduledTask>(
        "SELECT * FROM scheduled_tasks ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!(rows)))
}

// POST /api/scheduled-tasks
async fn create_scheduled_task(
    State(state): State<AppState>,
    Json(body): Json<CreateScheduledTaskRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let task_uuid = Uuid::new_v4();

    sqlx::query(
        r#"INSERT INTO scheduled_tasks
           (uuid, name, command, frequency, container, enabled,
            application_id, service_id, created_at, updated_at)
           VALUES ($1,$2,$3,$4,$5,$6,
                   (SELECT id FROM applications WHERE uuid = $7),
                   (SELECT id FROM services WHERE uuid = $8),
                   NOW(),NOW())"#
    )
    .bind(task_uuid)
    .bind(&body.name)
    .bind(&body.command)
    .bind(&body.frequency)
    .bind(body.container.as_deref().unwrap_or(""))
    .bind(body.enabled.unwrap_or(true))
    .bind(body.application_uuid)
    .bind(body.service_uuid)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "uuid": task_uuid, "message": "Scheduled task created." })))
}

// GET /api/scheduled-tasks/:uuid
async fn get_scheduled_task(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let row = sqlx::query_as::<_, rc_db::models::scheduled_task::ScheduledTask>(
        "SELECT * FROM scheduled_tasks WHERE uuid = $1"
    )
    .bind(uuid)
    .fetch_optional(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(serde_json::json!(row)))
}

// PATCH /api/scheduled-tasks/:uuid
async fn update_scheduled_task(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
    Json(body): Json<UpdateScheduledTaskRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query(
        r#"UPDATE scheduled_tasks SET
            name = COALESCE($2, name),
            command = COALESCE($3, command),
            frequency = COALESCE($4, frequency),
            container = COALESCE($5, container),
            enabled = COALESCE($6, enabled),
            updated_at = NOW()
           WHERE uuid = $1"#
    )
    .bind(uuid)
    .bind(body.name.as_deref())
    .bind(body.command.as_deref())
    .bind(body.frequency.as_deref())
    .bind(body.container.as_deref())
    .bind(body.enabled)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Scheduled task updated." })))
}

// DELETE /api/scheduled-tasks/:uuid
async fn delete_scheduled_task(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query("DELETE FROM scheduled_tasks WHERE uuid = $1")
        .bind(uuid)
        .execute(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Scheduled task deleted." })))
}

// GET /api/scheduled-tasks/:uuid/executions
async fn get_task_executions(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let rows = sqlx::query(
        r#"SELECT ste.* FROM scheduled_task_executions ste
           JOIN scheduled_tasks st ON st.id = ste.scheduled_task_id
           WHERE st.uuid = $1
           ORDER BY ste.created_at DESC LIMIT 20"#
    )
    .bind(uuid)
    .fetch_all(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let mut list = vec![];
    for r in rows {
        let u: Option<Uuid> = r.try_get("uuid").ok();
        let status: Option<String> = r.try_get("status").ok();
        list.push(serde_json::json!({ "uuid": u, "status": status }));
    }
    Ok(Json(serde_json::json!(list)))
}
