// completed be_1030
use axum::{
    routing::{get, post, delete, patch},
    Router, Json, extract::{Path, State},
    http::StatusCode,
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::state::AppState;

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateProjectRequest {
    pub name: String,
    pub description: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateProjectRequest {
    pub name: Option<String>,
    pub description: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct ProjectResponse {
    pub uuid: String,
    pub name: String,
    pub description: Option<String>,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/api/projects", get(list_projects_handler).post(create_project_handler))
        .route("/api/projects/:uuid", get(get_project_handler).patch(update_project_handler).delete(delete_project_handler))
        .with_state(state)
}

// GET /api/projects
async fn list_projects_handler(
    State(state): State<AppState>,
) -> Result<Json<Vec<rc_db::models::project::Project>>, StatusCode> {
    // Hazırda mock team_id istifadə olunur (Session/Bearer token team_id qarşılığı)
    let team_uuid = Uuid::nil();
    let projects = rc_db::repos::project_repo::list_projects(&state.db, team_uuid)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    Ok(Json(projects))
}

// POST /api/projects
async fn create_project_handler(
    State(state): State<AppState>,
    Json(payload): Json<CreateProjectRequest>,
) -> Result<(StatusCode, Json<serde_json::Value>), StatusCode> {
    if payload.name.trim().is_empty() {
        return Err(StatusCode::UNPROCESSABLE_ENTITY);
    }
    
    let team_uuid = Uuid::nil();
    
    // Orijinal validation qaydaları (Coolify combinedMessages / nameRules)
    let project = rc_db::repos::project_repo::create_project(
            &state.db,
            team_uuid,
            &payload.name,
            payload.description.as_deref()
        )
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok((StatusCode::CREATED, Json(serde_json::json!({
        "uuid": project.id.to_string(), // Rust modelində uuid/id yoxlanışı
    }))))
}

// GET /api/projects/:uuid
async fn get_project_handler(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<rc_db::models::project::Project>, StatusCode> {
    let project = rc_db::repos::project_repo::get_project(&state.db, uuid)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;
        
    Ok(Json(project))
}

// PATCH /api/projects/:uuid
async fn update_project_handler(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
    Json(payload): Json<UpdateProjectRequest>,
) -> Result<(StatusCode, Json<serde_json::Value>), StatusCode> {
    // Proyektin mövcudluğunu yoxla
    let project = rc_db::repos::project_repo::get_project(&state.db, uuid)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    let name = payload.name.unwrap_or(project.name.unwrap_or_default());
    let description = payload.description.or(project.description);

    sqlx::query(
        "UPDATE projects SET name = $1, description = $2, updated_at = NOW() WHERE id = $3"
    )
    .bind(&name)
    .bind(&description)
    .bind(uuid)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok((StatusCode::CREATED, Json(serde_json::json!({
        "uuid": uuid.to_string(),
        "name": name,
        "description": description,
    }))))
}

// DELETE /api/projects/:uuid
async fn delete_project_handler(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    // Proyektin mövcudluğunu yoxla
    let _project = rc_db::repos::project_repo::get_project(&state.db, uuid)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    // Coolify-da olduğu kimi, əgər proyektdə resurslar varsa silinə bilməz
    // applications, databases və s. yoxlanılmalıdır.
    let apps_count: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM applications WHERE project_id = $1"
    )
    .bind(uuid)
    .fetch_one(&state.db)
    .await
    .unwrap_or(0);

    if apps_count > 0 {
        return Err(StatusCode::BAD_REQUEST);
    }

    sqlx::query("DELETE FROM projects WHERE id = $1")
        .bind(uuid)
        .execute(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({
        "message": "Project deleted."
    })))
}
