// completed file_0852
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct Server {
    pub id: uuid::Uuid,
    pub name: Option<String>,
    pub ip: Option<String>,
    pub port: Option<String>,
    pub user: Option<String>,
    pub description: Option<String>,
    pub private_key_id: Option<uuid::Uuid>,
    pub cloud_provider_token_id: Option<uuid::Uuid>,
    pub team_id: Option<uuid::Uuid>,
    pub hetzner_server_id: Option<uuid::Uuid>,
    pub hetzner_server_status: Option<String>,
    pub vultr_instance_id: Option<uuid::Uuid>,
    pub vultr_instance_status: Option<String>,
    pub digitalocean_droplet_id: Option<uuid::Uuid>,
    pub digitalocean_droplet_status: Option<String>,
    pub is_validating: Option<String>,
    pub validation_logs: Option<String>,
    pub detected_traefik_version: Option<String>,
    pub traefik_outdated_info: Option<String>,
    pub server_metadata: Option<String>,
    pub ip_previous: Option<String>,
    
    // Orijinal Coolify server modelindən 1-ə-1 əskik olan sütunlar
    pub is_swarm_manager: Option<bool>,
    pub is_swarm_worker: Option<bool>,
    pub connection_timeout: Option<i32>,
    pub concurrent_builds: Option<i32>,
    
    // Sentinel və Log Drain
    pub sentinel_enabled: Option<bool>,
    pub sentinel_token: Option<String>,
    pub sentinel_metrics_refresh_rate: Option<i32>,
    pub sentinel_metrics_history_days: Option<i32>,
    pub sentinel_push_interval: Option<i32>,
    pub wildcard_domain: Option<String>,
}
