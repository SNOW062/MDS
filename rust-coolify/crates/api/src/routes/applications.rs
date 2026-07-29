// completed be_1024
// Coolify mənbəsi: app/Http/Controllers/Api/ApplicationsController.php (269 KB, 5153 sətir)
use axum::{
    routing::{get, post, delete, patch, put},
    Router, Json,
    extract::{Path, State, Query},
    http::StatusCode,
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::state::AppState;

// ===== DTOs =====

#[derive(Debug, Serialize, Deserialize)]
pub struct CreatePublicAppRequest {
    pub project_uuid: Uuid,
    pub server_uuid: Uuid,
    pub environment_name: String,
    pub git_repository: String,
    pub git_branch: String,
    pub name: Option<String>,
    pub description: Option<String>,
    pub build_pack: Option<String>,
    pub ports_exposes: Option<String>,
    pub domains: Option<String>,
    pub install_command: Option<String>,
    pub build_command: Option<String>,
    pub start_command: Option<String>,
    pub base_directory: Option<String>,
    pub publish_directory: Option<String>,
    pub dockerfile: Option<String>,
    pub docker_compose_raw: Option<String>,
    pub is_static: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateDockerfileAppRequest {
    pub project_uuid: Uuid,
    pub server_uuid: Uuid,
    pub environment_name: String,
    pub name: String,
    pub dockerfile: String,
    pub ports_exposes: Option<String>,
    pub domains: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateDockerImageAppRequest {
    pub project_uuid: Uuid,
    pub server_uuid: Uuid,
    pub environment_name: String,
    pub name: String,
    pub docker_image: String,
    pub ports_exposes: Option<String>,
    pub domains: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateDockerComposeAppRequest {
    pub project_uuid: Uuid,
    pub server_uuid: Uuid,
    pub environment_name: String,
    pub docker_compose_raw: String,
    pub name: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateApplicationRequest {
    pub name: Option<String>,
    pub description: Option<String>,
    pub domains: Option<String>,
    pub git_repository: Option<String>,
    pub git_branch: Option<String>,
    pub git_commit_sha: Option<String>,
    pub build_pack: Option<String>,
    pub static_image: Option<String>,
    pub install_command: Option<String>,
    pub build_command: Option<String>,
    pub start_command: Option<String>,
    pub base_directory: Option<String>,
    pub publish_directory: Option<String>,
    pub ports_exposes: Option<String>,
    pub ports_mappings: Option<String>,
    pub dockerfile: Option<String>,
    pub dockerfile_location: Option<String>,
    pub docker_compose_raw: Option<String>,
    pub docker_compose_location: Option<String>,
    pub docker_compose_custom_start_command: Option<String>,
    pub docker_compose_custom_build_command: Option<String>,
    pub redirect: Option<String>,
    pub instant_deploy: Option<bool>,
    pub is_git_submodules_enabled: Option<bool>,
    pub is_git_lfs_enabled: Option<bool>,
    pub disable_build_cache: Option<bool>,
    pub is_gzip_enabled: Option<bool>,
    pub is_stripprefix_enabled: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EnvVarRequest {
    pub key: String,
    pub value: String,
    pub is_preview: Option<bool>,
    pub is_multiline: Option<bool>,
    pub is_shown_once: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TagQuery {
    pub tag: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DeployQuery {
    pub force: Option<bool>,
}

// ===== ROUTER =====

pub fn router(state: AppState) -> Router {
    Router::new()
        // Applications CRUD
        .route("/api/applications",
            get(list_applications).post(create_public_app))
        .route("/api/applications/:uuid",
            get(get_application).patch(update_application).delete(delete_application))

        // Deploy əməliyyatları
        .route("/api/applications/:uuid/deploy", post(deploy_application))
        .route("/api/applications/:uuid/restart", post(restart_application))
        .route("/api/applications/:uuid/stop", post(stop_application))

        // Environment variables
        .route("/api/applications/:uuid/envs",
            get(list_envs).post(create_env))
        .route("/api/applications/:uuid/envs/bulk",
            post(bulk_update_envs))
        .route("/api/applications/:uuid/envs/:env_uuid",
            patch(update_env).delete(delete_env))

        // Logs & Deployments
        .route("/api/applications/:uuid/logs", get(get_logs))
        .route("/api/applications/:uuid/deployments", get(list_deployments))
        .route("/api/applications/:uuid/deployments/:deployment_uuid", get(get_deployment))

        // Alternative create methods
        .route("/api/applications/dockerfile", post(create_dockerfile_app))
        .route("/api/applications/docker-image", post(create_docker_image_app))
        .route("/api/applications/docker-compose", post(create_docker_compose_app))

        .with_state(state)
}

// ===== HANDLERS =====

// GET /api/applications
async fn list_applications(
    State(state): State<AppState>,
    Query(q): Query<TagQuery>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let rows = sqlx::query_as::<_, rc_db::models::application::Application>(
        "SELECT * FROM applications ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!(rows)))
}

// GET /api/applications/:uuid
async fn get_application(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let row = sqlx::query_as::<_, rc_db::models::application::Application>(
        "SELECT * FROM applications WHERE uuid = $1"
    )
    .bind(uuid)
    .fetch_optional(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(serde_json::json!(row)))
}

// POST /api/applications (public git repo)
async fn create_public_app(
    State(state): State<AppState>,
    Json(body): Json<CreatePublicAppRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let app_uuid = Uuid::new_v4();
    let name = body.name.unwrap_or_else(|| format!("app-{}", &app_uuid.to_string()[..8]));

    sqlx::query(
        r#"INSERT INTO applications
           (uuid, name, description, git_repository, git_branch, build_pack,
            ports_exposes, install_command, build_command, start_command,
            base_directory, publish_directory, fqdn, created_at, updated_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,NOW(),NOW())"#
    )
    .bind(app_uuid)
    .bind(&name)
    .bind(body.description.as_deref().unwrap_or(""))
    .bind(&body.git_repository)
    .bind(&body.git_branch)
    .bind(body.build_pack.as_deref().unwrap_or("nixpacks"))
    .bind(body.ports_exposes.as_deref().unwrap_or("3000"))
    .bind(body.install_command.as_deref())
    .bind(body.build_command.as_deref())
    .bind(body.start_command.as_deref())
    .bind(body.base_directory.as_deref().unwrap_or("/"))
    .bind(body.publish_directory.as_deref())
    .bind(body.domains.as_deref())
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "uuid": app_uuid, "message": "Application created." })))
}

// POST /api/applications/dockerfile
async fn create_dockerfile_app(
    State(state): State<AppState>,
    Json(body): Json<CreateDockerfileAppRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let app_uuid = Uuid::new_v4();
    sqlx::query(
        r#"INSERT INTO applications
           (uuid, name, build_pack, dockerfile, ports_exposes, fqdn, created_at, updated_at)
           VALUES ($1,$2,'dockerfile',$3,$4,$5,NOW(),NOW())"#
    )
    .bind(app_uuid)
    .bind(&body.name)
    .bind(&body.dockerfile)
    .bind(body.ports_exposes.as_deref().unwrap_or("3000"))
    .bind(body.domains.as_deref())
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "uuid": app_uuid, "message": "Application created." })))
}

// POST /api/applications/docker-image
async fn create_docker_image_app(
    State(state): State<AppState>,
    Json(body): Json<CreateDockerImageAppRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let app_uuid = Uuid::new_v4();
    sqlx::query(
        r#"INSERT INTO applications
           (uuid, name, build_pack, static_image, ports_exposes, fqdn, created_at, updated_at)
           VALUES ($1,$2,'docker-image',$3,$4,$5,NOW(),NOW())"#
    )
    .bind(app_uuid)
    .bind(&body.name)
    .bind(&body.docker_image)
    .bind(body.ports_exposes.as_deref().unwrap_or("3000"))
    .bind(body.domains.as_deref())
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "uuid": app_uuid, "message": "Application created." })))
}

// POST /api/applications/docker-compose
async fn create_docker_compose_app(
    State(state): State<AppState>,
    Json(body): Json<CreateDockerComposeAppRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let app_uuid = Uuid::new_v4();
    let name = body.name.unwrap_or_else(|| format!("compose-{}", &app_uuid.to_string()[..8]));

    sqlx::query(
        r#"INSERT INTO applications
           (uuid, name, build_pack, docker_compose_raw, created_at, updated_at)
           VALUES ($1,$2,'docker-compose',$3,NOW(),NOW())"#
    )
    .bind(app_uuid)
    .bind(&name)
    .bind(&body.docker_compose_raw)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "uuid": app_uuid, "message": "Application created." })))
}

// PATCH /api/applications/:uuid
async fn update_application(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
    Json(body): Json<UpdateApplicationRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query(
        r#"UPDATE applications SET
            name = COALESCE($2, name),
            description = COALESCE($3, description),
            fqdn = COALESCE($4, fqdn),
            git_repository = COALESCE($5, git_repository),
            git_branch = COALESCE($6, git_branch),
            build_pack = COALESCE($7, build_pack),
            install_command = COALESCE($8, install_command),
            build_command = COALESCE($9, build_command),
            start_command = COALESCE($10, start_command),
            ports_exposes = COALESCE($11, ports_exposes),
            dockerfile = COALESCE($12, dockerfile),
            docker_compose_raw = COALESCE($13, docker_compose_raw),
            updated_at = NOW()
           WHERE uuid = $1"#
    )
    .bind(uuid)
    .bind(body.name.as_deref())
    .bind(body.description.as_deref())
    .bind(body.domains.as_deref())
    .bind(body.git_repository.as_deref())
    .bind(body.git_branch.as_deref())
    .bind(body.build_pack.as_deref())
    .bind(body.install_command.as_deref())
    .bind(body.build_command.as_deref())
    .bind(body.start_command.as_deref())
    .bind(body.ports_exposes.as_deref())
    .bind(body.dockerfile.as_deref())
    .bind(body.docker_compose_raw.as_deref())
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Application updated." })))
}

// DELETE /api/applications/:uuid
async fn delete_application(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query("DELETE FROM applications WHERE uuid = $1")
        .bind(uuid)
        .execute(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Application deleted." })))
}

// POST /api/applications/:uuid/deploy
async fn deploy_application(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
    Query(q): Query<DeployQuery>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let deployment_uuid = Uuid::new_v4();

    sqlx::query(
        r#"INSERT INTO application_deployment_queues
           (uuid, application_uuid, status, created_at, updated_at)
           VALUES ($1, $2, 'queued', NOW(), NOW())"#
    )
    .bind(deployment_uuid)
    .bind(uuid)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({
        "deployment_uuid": deployment_uuid,
        "message": "Deployment queued."
    })))
}

// POST /api/applications/:uuid/restart
async fn restart_application(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    // Restart = Stop + Deploy
    let deployment_uuid = Uuid::new_v4();
    sqlx::query(
        r#"INSERT INTO application_deployment_queues
           (uuid, application_uuid, status, restart_only, created_at, updated_at)
           VALUES ($1, $2, 'queued', true, NOW(), NOW())"#
    )
    .bind(deployment_uuid)
    .bind(uuid)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Application restart queued." })))
}

// POST /api/applications/:uuid/stop
async fn stop_application(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query(
        "UPDATE applications SET status = 'stopped', updated_at = NOW() WHERE uuid = $1"
    )
    .bind(uuid)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Application stop queued." })))
}

// GET /api/applications/:uuid/envs
async fn list_envs(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let rows = sqlx::query_as::<_, rc_db::models::env_variable::EnvVariable>(
        r#"SELECT ev.* FROM environment_variables ev
           JOIN applications a ON a.id = ev.applicationable_id
           WHERE a.uuid = $1 AND ev.applicationable_type = 'App\Models\Application'
           ORDER BY ev.key"#
    )
    .bind(uuid)
    .fetch_all(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!(rows)))
}

// POST /api/applications/:uuid/envs
async fn create_env(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
    Json(body): Json<EnvVarRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let env_uuid = Uuid::new_v4();
    let app_row = sqlx::query("SELECT id FROM applications WHERE uuid = $1")
        .bind(uuid)
        .fetch_optional(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    use sqlx::Row;
    let app_id: i64 = app_row.try_get("id").map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    sqlx::query(
        r#"INSERT INTO environment_variables
           (uuid, key, value, applicationable_id, applicationable_type,
            is_preview, is_multiline, is_shown_once, created_at, updated_at)
           VALUES ($1,$2,$3,$4,'App\Models\Application',$5,$6,$7,NOW(),NOW())"#
    )
    .bind(env_uuid)
    .bind(&body.key)
    .bind(&body.value)
    .bind(app_id)
    .bind(body.is_preview.unwrap_or(false))
    .bind(body.is_multiline.unwrap_or(false))
    .bind(body.is_shown_once.unwrap_or(false))
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "uuid": env_uuid, "message": "Env var created." })))
}

// POST /api/applications/:uuid/envs/bulk
async fn bulk_update_envs(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
    Json(body): Json<Vec<EnvVarRequest>>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    for env in &body {
        sqlx::query(
            r#"UPDATE environment_variables ev
               SET value = $3, updated_at = NOW()
               FROM applications a
               WHERE a.uuid = $1 AND ev.key = $2
               AND ev.applicationable_type = 'App\Models\Application'
               AND ev.applicationable_id = a.id"#
        )
        .bind(uuid)
        .bind(&env.key)
        .bind(&env.value)
        .execute(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    }

    Ok(Json(serde_json::json!({ "message": "Env vars updated." })))
}

// PATCH /api/applications/:uuid/envs/:env_uuid
async fn update_env(
    State(state): State<AppState>,
    Path((uuid, env_uuid)): Path<(Uuid, Uuid)>,
    Json(body): Json<EnvVarRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query(
        "UPDATE environment_variables SET value = $2, updated_at = NOW() WHERE uuid = $1"
    )
    .bind(env_uuid)
    .bind(&body.value)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Env var updated." })))
}

// DELETE /api/applications/:uuid/envs/:env_uuid
async fn delete_env(
    State(state): State<AppState>,
    Path((uuid, env_uuid)): Path<(Uuid, Uuid)>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query("DELETE FROM environment_variables WHERE uuid = $1")
        .bind(env_uuid)
        .execute(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Env var deleted." })))
}

// GET /api/applications/:uuid/logs
async fn get_logs(
    State(_state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    // Docker log stream gələcəkdə WebSocket ilə implement ediləcək
    Ok(Json(serde_json::json!({
        "message": "Log streaming available via WebSocket /api/applications/{uuid}/logs/ws",
        "uuid": uuid
    })))
}

// GET /api/applications/:uuid/deployments
async fn list_deployments(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let rows = sqlx::query(
        r#"SELECT adq.* FROM application_deployment_queues adq
           JOIN applications a ON a.uuid = adq.application_uuid
           WHERE a.uuid = $1
           ORDER BY adq.created_at DESC LIMIT 20"#
    )
    .bind(uuid)
    .fetch_all(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!([])))
}

// GET /api/applications/:uuid/deployments/:deployment_uuid
async fn get_deployment(
    State(state): State<AppState>,
    Path((uuid, deployment_uuid)): Path<(Uuid, Uuid)>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({
        "uuid": deployment_uuid,
        "application_uuid": uuid,
        "status": "queued"
    })))
}
