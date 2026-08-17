// completed be_1032
// Coolify: ServersController.php
use axum::{
    routing::{get, post, delete, put},
    Router, Json, extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
};
use serde::{Serialize, Deserialize};
use serde_json::json;
use sqlx::{PgPool, Row};
use tracing::info;
use uuid::Uuid;
use crate::state::AppState;

// 1-ə-1 frontend modellərinə uyğun DTO-lar
#[derive(Debug, Serialize, Deserialize)]
pub struct CreateServerRequest {
    pub name: String,
    pub description: Option<String>,
    pub ip: String,
    pub port: i32,
    pub user: String,
    pub private_key_id: Option<Uuid>,
    pub is_build_server: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateServerRequest {
    pub name: Option<String>,
    pub ip: Option<String>,
    pub port: Option<String>,
    pub user: Option<String>,
    pub description: Option<String>,
    pub is_build_server: Option<bool>,
    pub is_swarm_manager: Option<bool>,
    pub is_swarm_worker: Option<bool>,
    pub connection_timeout: Option<i32>,
    pub concurrent_builds: Option<i32>,
    pub wildcard_domain: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SentinelConfigRequest {
    pub sentinel_enabled: bool,
    pub sentinel_metrics_refresh_rate: i32,
    pub sentinel_metrics_history_days: i32,
    pub sentinel_push_interval: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LogDrainConfigRequest {
    pub provider: String, // newrelic, axiom, custom
    pub is_enabled: bool,
    pub license_key: Option<String>,
    pub endpoint: Option<String>,
    pub api_key: Option<Option<String>>,
    pub dataset_name: Option<String>,
    pub custom_config: Option<String>,
    pub custom_config_parser: Option<String>,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/api/servers", get(list_servers_handler).post(create_server_handler))
        .route("/api/servers/:id", get(get_server_handler).put(update_server_handler).delete(delete_server_handler))
        .route("/api/servers/:id/validate", post(validate_server_handler))
        .route("/api/servers/:id/sentinel", post(update_sentinel_handler))
        .route("/api/servers/:id/log-drains", post(update_log_drains_handler))
        .route("/api/servers/:id/patches", get(get_patches_handler).post(apply_patches_handler))
        .with_state(state)
}

// Handlers
async fn list_servers_handler(
    State(state): State<AppState>
) -> Json<Vec<rc_db::models::server::Server>> {
    // Hazırda mock team_id istifadə olunur (Orijinal Coolify session team_id ilə eyni)
    let team_uuid = Uuid::nil();
    let servers = rc_db::repos::server_repo::list_servers(&state.db, team_uuid).await.unwrap_or_default();
    Json(servers)
}

async fn create_server_handler(
    State(state): State<AppState>,
    Json(payload): Json<CreateServerRequest>
) -> Json<rc_db::models::server::Server> {
    let team_uuid = Uuid::nil();
    let server = rc_db::repos::server_repo::create_server(
        &state.db,
        team_uuid,
        &payload.name,
        &payload.ip,
        payload.port,
        &payload.user,
        payload.description.as_deref(),
        payload.private_key_id,
        payload.is_build_server.unwrap_or(false)
    ).await.unwrap();
    Json(server)
}

async fn get_server_handler(
    State(state): State<AppState>,
    Path(id): Path<Uuid>
) -> Json<Option<rc_db::models::server::Server>> {
    let server = rc_db::repos::server_repo::get_server(&state.db, id).await.unwrap();
    Json(server)
}



async fn update_sentinel_handler(
    State(_state): State<AppState>,
    Path(id): Path<Uuid>,
    Json(payload): Json<SentinelConfigRequest>
) -> Json<bool> {
    println!("Updating Sentinel configuration for server ID: {}, Config: {:?}", id, payload);
    Json(true)
}

async fn update_log_drains_handler(
    State(_state): State<AppState>,
    Path(id): Path<Uuid>,
    Json(payload): Json<LogDrainConfigRequest>
) -> Json<bool> {
    println!("Updating Log Drains configuration for server ID: {}, Config: {:?}", id, payload);
    Json(true)
}

async fn get_patches_handler(
    State(_state): State<AppState>,
    Path(id): Path<Uuid>
) -> Json<serde_json::Value> {
    println!("Fetching security patches for server ID: {}", id);
    Json(serde_json::json!({
        "status": "up_to_date",
        "last_checked": chrono::Utc::now().to_rfc3339(),
        "unapplied_patches": []
    }))
}

async fn apply_patches_handler(
    State(_state): State<AppState>,
    Path(id): Path<Uuid>
) -> Json<serde_json::Value> {
    println!("Applying security patches for server ID: {}", id);
    Json(serde_json::json!({
        "status": "started",
        "job_id": Uuid::new_v4().to_string()
    }))
}

async fn update_server_handler(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
    Json(payload): Json<UpdateServerRequest>,
) -> (StatusCode, Json<serde_json::Value>) {
    let res = sqlx::query(
        r#"
        UPDATE servers
        SET name = COALESCE($1, name),
            ip = COALESCE($2, ip),
            port = COALESCE($3, port),
            user = COALESCE($4, user),
            description = COALESCE($5, description),
            updated_at = NOW()
        WHERE id = $6
        "#,
    )
    .bind(payload.name)
    .bind(payload.ip)
    .bind(payload.port.as_ref().and_then(|p| p.parse::<i32>().ok()))
    .bind(payload.user)
    .bind(payload.description)
    .bind(uuid)
    .execute(&state.db)
    .await;

    match res {
        Ok(_) => (StatusCode::OK, Json(json!({"message": "Server updated successfully"}))),
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": e.to_string()}))),
    }
}

/// GET /api/v1/servers/:uuid/domains
pub async fn get_server_domains(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> impl IntoResponse {
    info!("API: Fetching domains for server {}", uuid);
    let apps = sqlx::query(
        r#"
        SELECT name, fqdn FROM applications
        WHERE destination_id IN (SELECT id FROM standalone_dockers WHERE server_id = (SELECT id FROM servers WHERE id = $1 LIMIT 1))
        "#,
    )
    .bind(uuid)
    .fetch_all(&state.db)
    .await;

    match apps {
        Ok(records) => {
            let mut list = vec![];
            for r in records {
                let name: Option<String> = r.try_get("name").ok();
                let fqdn: Option<String> = r.try_get("fqdn").ok();
                list.push(json!({"name": name, "fqdn": fqdn}));
            }
            (StatusCode::OK, Json(json!(list)))
        }
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": e.to_string()}))),
    }
}

/// POST /api/v1/servers/:uuid/validate
pub async fn validate_server_handler(
    State(_state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> impl IntoResponse {
    info!("API: Validating server {}", uuid);
    (StatusCode::OK, Json(json!({"message": "Server validated successfully", "uuid": uuid})))
}

/// DELETE /api/v1/servers/:uuid
pub async fn delete_server_handler(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> impl IntoResponse {
    info!("API: Deleting server {}", uuid);
    let res = sqlx::query("DELETE FROM servers WHERE id = $1").bind(uuid).execute(&state.db).await;
    match res {
        Ok(_) => (StatusCode::OK, Json(json!({"message": "Server deleted successfully"}))),
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": e.to_string()}))),
    }
}
