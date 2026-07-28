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
}
