use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Server {
    pub id: i64,
    pub uuid: String,
    pub name: String,
    pub description: Option<String>,
    pub ip: String,
    pub user: String,
    pub port: u16,
    pub is_reachable: bool,
    pub is_usable: bool,
    pub created_at: DateTime<Utc>,
}

impl Server {
    pub fn new(name: impl Into<String>, ip: impl Into<String>) -> Self {
        Self {
            id: 0,
            uuid: Uuid::new_v4().to_string(),
            name: name.into(),
            description: None,
            ip: ip.into(),
            user: "root".to_string(),
            port: 22,
            is_reachable: true,
            is_usable: true,
            created_at: Utc::now(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Project {
    pub id: i64,
    pub uuid: String,
    pub name: String,
    pub description: Option<String>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Application {
    pub id: i64,
    pub uuid: String,
    pub name: String,
    pub git_repository: String,
    pub git_branch: String,
    pub build_pack: String, // nixpacks, dockerfile, docker-compose
    pub fqdn: Option<String>,
    pub ports_exposes: Option<String>,
    pub status: String, // running, stopped, degraded
    pub server_id: i64,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum DatabaseType {
    PostgreSQL,
    MySQL,
    MongoDB,
    Redis,
    ClickHouse,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DatabaseService {
    pub id: i64,
    pub uuid: String,
    pub name: String,
    pub db_type: DatabaseType,
    pub db_user: String,
    pub db_name: String,
    pub status: String,
    pub server_id: i64,
    pub created_at: DateTime<Utc>,
}
