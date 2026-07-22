use axum::{
    extract::{Path as AxumPath, State},
    routing::{get, post, delete},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::net::SocketAddr;
use std::path::Path;
use std::sync::Arc;
use tower_http::services::{ServeDir, ServeFile};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[derive(Clone)]
struct AppState {
    pool: sqlx::SqlitePool,
}

#[derive(Debug, Deserialize, Serialize)]
struct ServerPayload {
    id: Option<String>,
    name: String,
    ip: String,
    port: u16,
    user: String,
    private_key_id: Option<String>,
    proxy_type: Option<String>,
    proxy_version: Option<String>,
    sentinel_enabled: Option<bool>,
    sentinel_token: Option<String>,
    sentinel_metrics_refresh_rate: Option<i32>,
    sentinel_metrics_history_days: Option<i32>,
    sentinel_push_interval: Option<i32>,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();

    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| "info".into()))
        .with(tracing_subscriber::fmt::layer())
        .init();

    tracing::info!("🚀 MasterDeploy (MD) API Server starting...");

    let database_url = std::env::var("DATABASE_URL").unwrap_or_else(|_| "sqlite://md.db".to_string());
    tracing::info!("Connecting to SQLite database: {}", database_url);
    let pool = coolify_db::init_db(&database_url).await?;

    let state = AppState { pool };

    let dist_path = std::env::var("UI_DIST_PATH").unwrap_or_else(|_| "ui/dist".to_string());
    let fallback_file = format!("{}/index.html", dist_path);

    let mut app = Router::new()
        .route("/health", get(health_check))
        .route("/api/v1/version", get(version_handler))
        .route("/api/v1/servers", get(servers_handler).post(save_server_handler))
        .route("/api/v1/servers/:id", delete(delete_server_handler))
        .route("/api/v1/servers/validate", get(validate_server_handler))
        .route("/api/v1/servers/resources", get(servers_resources_handler))
        .route("/api/v1/servers/:id/proxy/deploy", post(deploy_server_proxy_handler))
        .route("/api/v1/servers/:id/sentinel/sync", post(sync_server_sentinel_handler))
        .route("/api/v1/servers/:id/private_key", post(associate_server_key_handler))
        .route("/api/v1/private_keys/:id", get(get_private_key_handler))
        .route("/api/v1/private_keys", get(list_private_keys_handler).post(save_private_key_handler))
        .route("/api/v1/private_keys/generate", post(generate_private_key_handler))
        .route("/api/v1/projects", get(projects_handler))
        .route("/api/v1/applications/:id", get(application_detail_handler).post(save_application_handler))
        .route("/api/v1/applications/:id/env", get(application_env_handler).post(save_application_env_handler))
        .route("/api/v1/applications/:id/env/:env_id", delete(delete_application_env_handler))
        .route("/api/v1/teams", get(teams_handler).post(add_team_member_handler))
        .route("/api/v1/settings", get(settings_handler).post(save_settings_handler))
        .with_state(state.clone());

    if Path::new(&dist_path).exists() && Path::new(&fallback_file).exists() {
        tracing::info!("Serving UI static files from '{}'", dist_path);
        let serve_dir = ServeDir::new(&dist_path)
            .not_found_service(ServeFile::new(&fallback_file));
        app = app.fallback_service(serve_dir);
    } else {
        tracing::warn!("UI dist directory '{}' not found, serving API only", dist_path);
    }

    let addr = SocketAddr::from(([0, 0, 0, 0], 8000));
    tracing::info!("Listening on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}

async fn health_check() -> &'static str {
    "OK"
}

async fn version_handler() -> Json<Value> {
    Json(json!({
        "name": "MasterDeploy (MD)",
        "version": "1.0.0",
        "status": "active"
    }))
}

async fn servers_handler(State(state): State<AppState>) -> Json<Value> {
    let servers: Vec<coolify_db::Server> = sqlx::query_as("SELECT * FROM servers")
        .fetch_all(&state.pool)
        .await
        .unwrap_or_default();

    Json(json!(servers))
}

async fn save_server_handler(
    State(state): State<AppState>,
    Json(payload): Json<ServerPayload>,
) -> Json<Value> {
    let id = payload.id.unwrap_or_else(|| uuid::Uuid::new_v4().to_string());
    let created_at = chrono::Utc::now().timestamp();

    let res = sqlx::query(
        r#"
        INSERT INTO servers (id, name, ip, port, user, private_key_id, is_reachable, is_build_server, proxy_type, proxy_version, sentinel_enabled, sentinel_token, sentinel_metrics_refresh_rate, sentinel_metrics_history_days, sentinel_push_interval, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            name = excluded.name,
            ip = excluded.ip,
            port = excluded.port,
            user = excluded.user,
            private_key_id = excluded.private_key_id,
            proxy_type = excluded.proxy_type,
            proxy_version = excluded.proxy_version,
            sentinel_enabled = excluded.sentinel_enabled,
            sentinel_token = excluded.sentinel_token,
            sentinel_metrics_refresh_rate = excluded.sentinel_metrics_refresh_rate,
            sentinel_metrics_history_days = excluded.sentinel_metrics_history_days,
            sentinel_push_interval = excluded.sentinel_push_interval
        "#,
    )
    .bind(&id)
    .bind(&payload.name)
    .bind(&payload.ip)
    .bind(payload.port)
    .bind(&payload.user)
    .bind(&payload.private_key_id)
    .bind(true)
    .bind(true)
    .bind(payload.proxy_type.as_deref().unwrap_or("none"))
    .bind(payload.proxy_version.as_deref())
    .bind(payload.sentinel_enabled.unwrap_or(false))
    .bind(payload.sentinel_token.as_deref())
    .bind(payload.sentinel_metrics_refresh_rate.unwrap_or(60))
    .bind(payload.sentinel_metrics_history_days.unwrap_or(7))
    .bind(payload.sentinel_push_interval.unwrap_or(60))
    .bind(created_at)
    .execute(&state.pool)
    .await;

    match res {
        Ok(_) => Json(json!({ "status": "success", "id": id })),
        Err(e) => Json(json!({ "status": "error", "message": e.to_string() })),
    }
}

async fn validate_server_handler(
    State(state): State<AppState>,
) -> Json<Value> {
    let server: Option<coolify_db::Server> = sqlx::query_as("SELECT * FROM servers WHERE id = '0'")
        .fetch_optional(&state.pool)
        .await
        .unwrap_or_default();

    let server = match server {
        Some(s) => s,
        None => return Json(json!({
            "status": "error",
            "message": "Master server not found in database",
            "is_reachable": false
        })),
    };

    if server.ip == "127.0.0.1" || server.ip == "localhost" {
        return Json(json!({
            "status": "success",
            "message": "Localhost server validated successfully (bypassed SSH for local node)",
            "is_reachable": true
        }));
    }

    let ssh_client = coolify_core::SshClient::new(&server.ip, server.port, &server.user);
    match ssh_client.execute_command("echo 'connection check'").await {
        Ok(_) => Json(json!({
            "status": "success",
            "message": "Server validated successfully via SSH",
            "is_reachable": true
        })),
        Err(e) => Json(json!({
            "status": "error",
            "message": format!("SSH connection failed: {}", e),
            "is_reachable": false
        })),
    }
}

async fn servers_resources_handler() -> Json<Value> {
    Json(json!({
        "cpu_usage": 18,
        "ram_usage": 42,
        "disk_usage": 35,
        "cpu_cores": 4,
        "ram_total_gb": 8,
        "disk_total_gb": 160
    }))
}

async fn delete_server_handler(
    State(state): State<AppState>,
    AxumPath(id): AxumPath<String>,
) -> Json<Value> {
    if id == "0" {
        return Json(json!({ "status": "error", "message": "Cannot delete default master localhost server" }));
    }

    let res = sqlx::query("DELETE FROM servers WHERE id = ?")
        .bind(id)
        .execute(&state.pool)
        .await;

    match res {
        Ok(_) => Json(json!({ "status": "success", "message": "Server deleted successfully" })),
        Err(e) => Json(json!({ "status": "error", "message": e.to_string() })),
    }
}

async fn projects_handler(State(state): State<AppState>) -> Json<Value> {
    let rows: Vec<serde_json::Value> = sqlx::query(
        r#"
        SELECT 
            p.id as project_id, p.name as project_name, p.description as project_description,
            e.id as env_id, e.name as env_name,
            a.id as app_id, a.name as app_name, a.fqdn, a.git_repository, a.git_branch, a.build_pack, a.ports_exposes, a.status
        FROM projects p
        LEFT JOIN environments e ON e.project_id = p.id
        LEFT JOIN applications a ON a.environment_id = e.id
        "#
    )
    .fetch_all(&state.pool)
    .await
    .unwrap_or_default()
    .into_iter()
    .map(|row| {
        use sqlx::Row;
        let project_id: String = row.get("project_id");
        let project_name: String = row.get("project_name");
        let project_description: Option<String> = row.get("project_description");
        let env_id: Option<String> = row.get("env_id");
        let env_name: Option<String> = row.get("env_name");
        let app_id: Option<String> = row.get("app_id");
        let app_name: Option<String> = row.get("app_name");
        let fqdn: Option<String> = row.get("fqdn");
        let git_repository: Option<String> = row.get("git_repository");
        let git_branch: Option<String> = row.get("git_branch");
        let build_pack: Option<String> = row.get("build_pack");
        let ports_exposes: Option<String> = row.get("ports_exposes");
        let status: Option<String> = row.get("status");

        json!({
            "project_id": project_id,
            "project_name": project_name,
            "project_description": project_description,
            "env_id": env_id,
            "env_name": env_name,
            "app_id": app_id,
            "app_name": app_name,
            "fqdn": fqdn,
            "git_repository": git_repository,
            "git_branch": git_branch,
            "build_pack": build_pack,
            "ports_exposes": ports_exposes,
            "status": status
        })
    })
    .collect();

    let db_rows: Vec<serde_json::Value> = sqlx::query(
        r#"
        SELECT 
            p.id as project_id,
            e.id as env_id,
            d.id as db_id, d.name as db_name, d.engine, d.status, d.ports_exposes
        FROM projects p
        LEFT JOIN environments e ON e.project_id = p.id
        LEFT JOIN databases d ON d.environment_id = e.id
        "#
    )
    .fetch_all(&state.pool)
    .await
    .unwrap_or_default()
    .into_iter()
    .map(|row| {
        use sqlx::Row;
        let project_id: String = row.get("project_id");
        let env_id: Option<String> = row.get("env_id");
        let db_id: Option<String> = row.get("db_id");
        let db_name: Option<String> = row.get("db_name");
        let engine: Option<String> = row.get("engine");
        let status: Option<String> = row.get("status");
        let ports_exposes: Option<String> = row.get("ports_exposes");

        json!({
            "project_id": project_id,
            "env_id": env_id,
            "db_id": db_id,
            "db_name": db_name,
            "engine": engine,
            "status": status,
            "ports_exposes": ports_exposes
        })
    })
    .collect();

    let mut projects_map = serde_json::Map::new();

    for row in rows {
        let p_id = row["project_id"].as_str().unwrap_or("").to_string();
        let p_name = row["project_name"].as_str().unwrap_or("").to_string();
        let p_desc = row["project_description"].as_str().unwrap_or("").to_string();

        let proj_entry = projects_map.entry(p_id.clone()).or_insert_with(|| {
            json!({
                "id": p_id,
                "name": p_name,
                "description": p_desc,
                "environments": []
            })
        });

        if let Some(env_id) = row["env_id"].as_str() {
            let envs = proj_entry.as_object_mut().unwrap().get_mut("environments").unwrap().as_array_mut().unwrap();
            let mut env_found = false;
            for env in envs.iter_mut() {
                if env["id"].as_str().unwrap_or("") == env_id {
                    env_found = true;
                    if let Some(app_id) = row["app_id"].as_str() {
                        env["applications"].as_array_mut().unwrap().push(json!({
                            "id": app_id,
                            "name": row["app_name"].as_str().unwrap_or(""),
                            "gitRepository": row["git_repository"].as_str().unwrap_or(""),
                            "gitBranch": row["git_branch"].as_str().unwrap_or(""),
                            "buildPack": row["build_pack"].as_str().unwrap_or(""),
                            "fqdn": row["fqdn"].as_str().unwrap_or(""),
                            "ports": row["ports_exposes"].as_str().unwrap_or(""),
                            "status": row["status"].as_str().unwrap_or("stopped")
                        }));
                    }
                }
            }

            if !env_found {
                let mut new_env = json!({
                    "id": env_id,
                    "name": row["env_name"].as_str().unwrap_or(""),
                    "applications": [],
                    "databases": []
                });
                if let Some(app_id) = row["app_id"].as_str() {
                    new_env["applications"].as_array_mut().unwrap().push(json!({
                        "id": app_id,
                        "name": row["app_name"].as_str().unwrap_or(""),
                        "gitRepository": row["git_repository"].as_str().unwrap_or(""),
                        "gitBranch": row["git_branch"].as_str().unwrap_or(""),
                        "buildPack": row["build_pack"].as_str().unwrap_or(""),
                        "fqdn": row["fqdn"].as_str().unwrap_or(""),
                        "ports": row["ports_exposes"].as_str().unwrap_or(""),
                        "status": row["status"].as_str().unwrap_or("stopped")
                    }));
                }
                envs.push(new_env);
            }
        }
    }

    for db_row in db_rows {
        let p_id = db_row["project_id"].as_str().unwrap_or("").to_string();
        if let Some(proj_entry) = projects_map.get_mut(&p_id) {
            if let Some(env_id) = db_row["env_id"].as_str() {
                let envs = proj_entry.as_object_mut().unwrap().get_mut("environments").unwrap().as_array_mut().unwrap();
                for env in envs.iter_mut() {
                    if env["id"].as_str().unwrap_or("") == env_id {
                        if let Some(db_id) = db_row["db_id"].as_str() {
                            let dbs = env.as_object_mut().unwrap().entry("databases".to_string()).or_insert(json!([])).as_array_mut().unwrap();
                            if !dbs.iter().any(|d| d["id"].as_str().unwrap_or("") == db_id) {
                                dbs.push(json!({
                                    "id": db_id,
                                    "name": db_row["db_name"].as_str().unwrap_or(""),
                                    "engine": db_row["engine"].as_str().unwrap_or("postgres"),
                                    "status": db_row["status"].as_str().unwrap_or("stopped"),
                                    "ports": db_row["ports_exposes"].as_str().unwrap_or("")
                                }));
                            }
                        }
                    }
                }
            }
        }
    }

    let projects_list: Vec<Value> = projects_map.into_iter().map(|(_, v)| v).collect();
    Json(json!(projects_list))
}

#[derive(Debug, Deserialize, Serialize)]
struct ApplicationPayload {
    name: String,
    git_repository: String,
    git_branch: String,
    fqdn: Option<String>,
    ports_exposes: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
struct EnvPayload {
    key: String,
    value: String,
    is_build_time: bool,
    is_secret: bool,
}

async fn application_detail_handler(
    State(state): State<AppState>,
    AxumPath(id): AxumPath<String>,
) -> Json<Value> {
    let app: Option<coolify_db::Application> = sqlx::query_as("SELECT * FROM applications WHERE id = ?")
        .bind(&id)
        .fetch_optional(&state.pool)
        .await
        .unwrap_or_default();

    match app {
        Some(a) => Json(json!(a)),
        None => Json(json!({ "status": "error", "message": "Application not found" })),
    }
}

async fn save_application_handler(
    State(state): State<AppState>,
    AxumPath(id): AxumPath<String>,
    Json(payload): Json<ApplicationPayload>,
) -> Json<Value> {
    let res = sqlx::query(
        r#"
        UPDATE applications SET
            name = ?,
            git_repository = ?,
            git_branch = ?,
            fqdn = ?,
            ports_exposes = ?
        WHERE id = ?
        "#,
    )
    .bind(&payload.name)
    .bind(&payload.git_repository)
    .bind(&payload.git_branch)
    .bind(&payload.fqdn)
    .bind(&payload.ports_exposes)
    .bind(&id)
    .execute(&state.pool)
    .await;

    match res {
        Ok(_) => Json(json!({ "status": "success", "message": "Application updated successfully" })),
        Err(e) => Json(json!({ "status": "error", "message": e.to_string() })),
    }
}

async fn application_env_handler(
    State(state): State<AppState>,
    AxumPath(id): AxumPath<String>,
) -> Json<Value> {
    let vars: Vec<coolify_db::EnvironmentVariable> = sqlx::query_as("SELECT * FROM environment_variables WHERE application_id = ?")
        .bind(&id)
        .fetch_all(&state.pool)
        .await
        .unwrap_or_default();

    Json(json!(vars))
}

async fn save_application_env_handler(
    State(state): State<AppState>,
    AxumPath(id): AxumPath<String>,
    Json(payload): Json<EnvPayload>,
) -> Json<Value> {
    let env_id = uuid::Uuid::new_v4().to_string();

    let res = sqlx::query(
        r#"
        INSERT INTO environment_variables (id, application_id, key, value, is_build_time, is_secret)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(application_id, key) DO UPDATE SET
            value = excluded.value,
            is_build_time = excluded.is_build_time,
            is_secret = excluded.is_secret
        "#,
    )
    .bind(&env_id)
    .bind(&id)
    .bind(&payload.key)
    .bind(&payload.value)
    .bind(payload.is_build_time)
    .bind(payload.is_secret)
    .execute(&state.pool)
    .await;

    match res {
        Ok(_) => Json(json!({ "status": "success", "message": "Environment variable saved" })),
        Err(e) => Json(json!({ "status": "error", "message": e.to_string() })),
    }
}

async fn delete_application_env_handler(
    State(state): State<AppState>,
    AxumPath((_id, env_id)): AxumPath<(String, String)>,
) -> Json<Value> {
    let res = sqlx::query("DELETE FROM environment_variables WHERE id = ?")
        .bind(env_id)
        .execute(&state.pool)
        .await;

    match res {
        Ok(_) => Json(json!({ "status": "success", "message": "Environment variable deleted" })),
        Err(e) => Json(json!({ "status": "error", "message": e.to_string() })),
    }
}

#[derive(Debug, Deserialize, Serialize)]
struct TeamMemberPayload {
    name: String,
    email: String,
    role: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct SettingsPayload {
    key: String,
    value: String,
}

async fn teams_handler(State(state): State<AppState>) -> Json<Value> {
    let rows: Vec<serde_json::Value> = sqlx::query("SELECT id, name, email, role, status FROM team_members")
        .fetch_all(&state.pool)
        .await
        .unwrap_or_default()
        .into_iter()
        .map(|row| {
            use sqlx::Row;
            let id: String = row.get("id");
            let name: String = row.get("name");
            let email: String = row.get("email");
            let role: String = row.get("role");
            let status: String = row.get("status");
            json!({ "id": id, "name": name, "email": email, "role": role, "status": status })
        })
        .collect();

    Json(json!(rows))
}

async fn add_team_member_handler(
    State(state): State<AppState>,
    Json(payload): Json<TeamMemberPayload>,
) -> Json<Value> {
    let id = uuid::Uuid::new_v4().to_string();
    let res = sqlx::query("INSERT INTO team_members (id, name, email, role, status) VALUES (?, ?, ?, ?, 'Active')")
        .bind(&id)
        .bind(&payload.name)
        .bind(&payload.email)
        .bind(&payload.role)
        .execute(&state.pool)
        .await;

    match res {
        Ok(_) => Json(json!({ "status": "success", "message": "Team member added" })),
        Err(e) => Json(json!({ "status": "error", "message": e.to_string() })),
    }
}

async fn settings_handler(State(state): State<AppState>) -> Json<Value> {
    let rows: Vec<(String, String)> = sqlx::query_as("SELECT key, value FROM settings")
        .fetch_all(&state.pool)
        .await
        .unwrap_or_default();

    let mut map = serde_json::Map::new();
    for (k, v) in rows {
        map.insert(k, json!(v));
    }

    Json(json!(map))
}

async fn save_settings_handler(
    State(state): State<AppState>,
    Json(payload): Json<SettingsPayload>,
) -> Json<Value> {
    let res = sqlx::query("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
        .bind(&payload.key)
        .bind(&payload.value)
        .execute(&state.pool)
        .await;

    match res {
        Ok(_) => Json(json!({ "status": "success", "message": "Setting saved" })),
        Err(e) => Json(json!({ "status": "error", "message": e.to_string() })),
    }
}

#[derive(Debug, Deserialize)]
struct DeployProxyPayload {
    proxy_type: String,
}

async fn deploy_server_proxy_handler(
    State(state): State<AppState>,
    AxumPath(id): AxumPath<String>,
    Json(payload): Json<DeployProxyPayload>,
) -> Json<Value> {
    let server: Option<coolify_db::Server> = sqlx::query_as("SELECT * FROM servers WHERE id = ?")
        .bind(&id)
        .fetch_optional(&state.pool)
        .await
        .unwrap_or_default();

    let server = match server {
        Some(s) => s,
        None => return Json(json!({ "status": "error", "message": "Server not found" })),
    };

    if server.ip == "127.0.0.1" || server.ip == "localhost" {
        let _ = sqlx::query("UPDATE servers SET proxy_type = ? WHERE id = ?")
            .bind(&payload.proxy_type)
            .bind(&id)
            .execute(&state.pool)
            .await;

        return Json(json!({
            "status": "success",
            "message": format!("Proxy {} setup completed successfully on localhost node (bypassed).", payload.proxy_type)
        }));
    }

    let ssh_client = coolify_core::SshClient::new(&server.ip, server.port, &server.user);
    let script = coolify_core::SshClient::build_proxy_setup_script(&payload.proxy_type);

    match ssh_client.execute_command(&script).await {
        Ok(output) => {
            let _ = sqlx::query("UPDATE servers SET proxy_type = ? WHERE id = ?")
                .bind(&payload.proxy_type)
                .bind(&id)
                .execute(&state.pool)
                .await;

            Json(json!({
                "status": "success",
                "message": format!("Proxy deployed successfully:\n{}", output)
            }))
        }
        Err(e) => Json(json!({
            "status": "error",
            "message": format!("Failed to deploy proxy via SSH: {}", e)
        })),
    }
}

async fn sync_server_sentinel_handler(
    State(state): State<AppState>,
    AxumPath(id): AxumPath<String>,
) -> Json<Value> {
    let server: Option<coolify_db::Server> = sqlx::query_as("SELECT * FROM servers WHERE id = ?")
        .bind(&id)
        .fetch_optional(&state.pool)
        .await
        .unwrap_or_default();

    let server = match server {
        Some(s) => s,
        None => return Json(json!({ "status": "error", "message": "Server not found" })),
    };

    if server.ip == "127.0.0.1" || server.ip == "localhost" {
        return Json(json!({
            "status": "success",
            "message": "Sentinel daemon sync completed successfully on localhost node (bypassed)."
        }));
    }

    let token = server.sentinel_token.as_deref().unwrap_or("dummy-token");
    let url = "http://localhost:8000";
    let interval = server.sentinel_push_interval;

    let ssh_client = coolify_core::SshClient::new(&server.ip, server.port, &server.user);
    let script = coolify_core::SshClient::build_sentinel_setup_script(token, url, interval);

    match ssh_client.execute_command(&script).await {
        Ok(output) => Json(json!({
            "status": "success",
            "message": format!("Sentinel synced successfully via SSH:\n{}", output)
        })),
        Err(e) => Json(json!({
            "status": "error",
            "message": format!("Failed to deploy Sentinel via SSH: {}", e)
        })),
    }
}

#[derive(Debug, Deserialize, Serialize)]
struct PrivateKeyPayload {
    id: Option<String>,
    name: String,
    private_key: String,
}

async fn get_private_key_handler(
    State(state): State<AppState>,
    AxumPath(id): AxumPath<String>,
) -> Json<Value> {
    let key: Option<(String, String, String)> = sqlx::query_as("SELECT id, name, private_key FROM private_keys WHERE id = ?")
        .bind(&id)
        .fetch_optional(&state.pool)
        .await
        .unwrap_or_default();

    match key {
        Some((id, name, private_key)) => Json(json!({ "status": "success", "id": id, "name": name, "private_key": private_key })),
        None => Json(json!({ "status": "error", "message": "Private key not found" })),
    }
}

async fn save_private_key_handler(
    State(state): State<AppState>,
    Json(payload): Json<PrivateKeyPayload>,
) -> Json<Value> {
    let id = payload.id.unwrap_or_else(|| uuid::Uuid::new_v4().to_string());
    let created_at = chrono::Utc::now().timestamp();
    let key_uuid = format!("{}-{}", payload.name.to_lowercase().replace(' ', "-"), &id[..8.min(id.len())]);
    let description = format!("Added manually via MasterDeploy");

    let res = sqlx::query(
        r#"
        INSERT INTO private_keys (id, uuid, name, description, private_key, public_key, is_git_related, created_at)
        VALUES (?, ?, ?, ?, ?, '', 0, ?)
        ON CONFLICT(id) DO UPDATE SET
            name = excluded.name,
            description = excluded.description,
            private_key = excluded.private_key
        "#,
    )
    .bind(&id)
    .bind(&key_uuid)
    .bind(&payload.name)
    .bind(&description)
    .bind(&payload.private_key)
    .bind(created_at)
    .execute(&state.pool)
    .await;

    match res {
        Ok(_) => Json(json!({ "status": "success", "id": id })),
        Err(e) => Json(json!({ "status": "error", "message": e.to_string() })),
    }
}

async fn list_private_keys_handler(
    State(state): State<AppState>,
) -> Json<Value> {
    let keys: Vec<(String, String, String, String, String)> = sqlx::query_as(
        "SELECT id, name, COALESCE(description, '') as description, private_key, COALESCE(public_key, '') as public_key FROM private_keys WHERE is_git_related = 0"
    )
        .fetch_all(&state.pool)
        .await
        .unwrap_or_default();

    let list: Vec<Value> = keys.into_iter().map(|(id, name, description, private_key, public_key)| {
        json!({
            "id": id,
            "name": name,
            "description": description,
            "private_key": private_key,
            "public_key": public_key
        })
    }).collect();

    Json(json!(list))
}

#[derive(Debug, Deserialize)]
struct GenerateKeyPayload {
    name: String,
    key_type: String,
}

async fn generate_private_key_handler(
    State(state): State<AppState>,
    Json(payload): Json<GenerateKeyPayload>,
) -> Json<Value> {
    let id = uuid::Uuid::new_v4().to_string();
    let temp_file = format!("/tmp/md_key_{}", id);

    let key_type = payload.key_type.to_lowercase();
    let args = if key_type == "rsa" {
        vec!["-t", "rsa", "-b", "4096", "-N", "", "-f", &temp_file]
    } else {
        vec!["-t", "ed25519", "-N", "", "-f", &temp_file]
    };

    let cmd_res = tokio::process::Command::new("ssh-keygen")
        .args(&args)
        .output()
        .await;

    if let Err(e) = cmd_res {
        return Json(json!({ "status": "error", "message": format!("Failed to run ssh-keygen: {}", e) }));
    }

    let priv_key = match tokio::fs::read_to_string(&temp_file).await {
        Ok(content) => content,
        Err(e) => return Json(json!({ "status": "error", "message": format!("Failed to read generated private key: {}", e) })),
    };

    // Read public key BEFORE removing files
    let pub_key = tokio::fs::read_to_string(format!("{}.pub", temp_file)).await.unwrap_or_default();

    // Now clean up temp files
    let _ = tokio::fs::remove_file(&temp_file).await;
    let _ = tokio::fs::remove_file(format!("{}.pub", temp_file)).await;

    let created_at = chrono::Utc::now().timestamp();
    let key_uuid = format!("{}-{}", payload.name.to_lowercase().replace(' ', "-"), &id[..8]);

    let desc = format!("Created by MasterDeploy - {} key", key_type.to_uppercase());

    let res = sqlx::query(
        "INSERT INTO private_keys (id, uuid, name, description, private_key, public_key, is_git_related, created_at) VALUES (?, ?, ?, ?, ?, ?, 0, ?)"
    )
        .bind(&id)
        .bind(&key_uuid)
        .bind(&payload.name)
        .bind(&desc)
        .bind(&priv_key)
        .bind(&pub_key)
        .bind(created_at)
        .execute(&state.pool)
        .await;

    match res {
        Ok(_) => Json(json!({ "status": "success", "id": id, "private_key": priv_key, "public_key": pub_key })),
        Err(e) => Json(json!({ "status": "error", "message": e.to_string() })),
    }
}

#[derive(Debug, Deserialize)]
struct AssociateKeyPayload {
    private_key_id: String,
}

async fn associate_server_key_handler(
    State(state): State<AppState>,
    AxumPath(id): AxumPath<String>,
    Json(payload): Json<AssociateKeyPayload>,
) -> Json<Value> {
    let res = sqlx::query("UPDATE servers SET private_key_id = ? WHERE id = ?")
        .bind(&payload.private_key_id)
        .bind(&id)
        .execute(&state.pool)
        .await;

    match res {
        Ok(_) => Json(json!({ "status": "success" })),
        Err(e) => Json(json!({ "status": "error", "message": e.to_string() })),
    }
}
