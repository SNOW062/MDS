use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use std::time::SystemTime;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Project {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    pub created_at: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Environment {
    pub id: String,
    pub project_id: String,
    pub name: String, // e.g. "production", "staging"
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Server {
    pub id: String,
    pub name: String,
    pub ip: String,
    pub port: u16,
    pub user: String,
    pub private_key_id: Option<String>,
    pub is_reachable: bool,
    pub is_build_server: bool,
    pub proxy_type: String,
    pub proxy_version: Option<String>,
    pub sentinel_enabled: bool,
    pub sentinel_token: Option<String>,
    pub sentinel_metrics_refresh_rate: i32,
    pub sentinel_metrics_history_days: i32,
    pub sentinel_push_interval: i32,
    pub created_at: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Application {
    pub id: String,
    pub environment_id: String,
    pub server_id: String,
    pub name: String,
    pub fqdn: Option<String>, // Domain name, e.g. https://app.example.com
    pub git_repository: String,
    pub git_branch: String,
    pub build_pack: String, // "nixpacks", "dockerfile", "docker-compose", "static"
    pub install_command: Option<String>,
    pub build_command: Option<String>,
    pub start_command: Option<String>,
    pub ports_exposes: Option<String>, // e.g. "3000:3000"
    pub status: String, // "running", "stopped", "degrading", "error"
    pub created_at: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct EnvironmentVariable {
    pub id: String,
    pub application_id: String,
    pub key: String,
    pub value: String,
    pub is_build_time: bool,
    pub is_secret: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Deployment {
    pub id: String,
    pub application_id: String,
    pub status: String, // "queued", "in_progress", "success", "failed"
    pub commit_hash: Option<String>,
    pub logs: Option<String>,
    pub started_at: Option<i64>,
    pub finished_at: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Database {
    pub id: String,
    pub name: String,
    pub engine: String,
    pub status: String,
    pub ports_exposes: Option<String>,
    pub db_user: Option<String>,
    pub db_password: Option<String>,
    pub db_name: Option<String>,
    pub created_at: Option<i64>,
    pub environment_id: String,
    pub server_id: String,
}
