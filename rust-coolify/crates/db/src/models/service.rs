// completed file_0854
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct Service {
    pub id: uuid::Uuid,
    pub name: Option<String>,
    pub description: Option<String>,
    pub docker_compose_raw: Option<String>,
    pub docker_compose: Option<String>,
    pub connect_to_docker_network: Option<String>,
    pub service_type: Option<String>,
    pub config_hash: Option<String>,
    pub compose_parsing_version: Option<String>,
    pub is_container_label_escape_enabled: Option<String>,
    pub environment_id: Option<uuid::Uuid>,
    pub server_id: Option<uuid::Uuid>,
    pub destination_id: Option<uuid::Uuid>,
    pub destination_type: Option<String>,
}
