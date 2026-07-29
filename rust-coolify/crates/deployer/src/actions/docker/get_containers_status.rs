// completed file_0370
// Coolify mənbəsi: app/Actions/Docker/GetContainersStatus.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use serde::{Serialize, Deserialize};
use sqlx::PgPool;
use std::collections::HashMap;
use tracing::info;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContainerStatusInfo {
    pub name: String,
    pub state: String, // running, exited, restarting
    pub health: String, // healthy, unhealthy, starting, none
}

pub struct GetContainersStatus;

impl GetContainersStatus {
    /// Uzaq serverdə `docker ps` vasitəsilə bütün konteynerlərin işləmə statusunu alır
    pub async fn handle(
        _db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
    ) -> Result<HashMap<String, ContainerStatusInfo>> {
        info!("Fetching Docker containers status on server {}", server_uuid);

        let cmd = "docker ps -a --format '{{.Names}}|{{.State}}|{{.Status}}' 2>/dev/null || true";
        let output = ssh_client.execute_cmd(cmd).await?;

        let mut status_map = HashMap::new();

        for line in output.lines() {
            let parts: Vec<&str> = line.split('|').collect();
            if parts.len() >= 2 {
                let name = parts[0].trim().to_string();
                let state = parts[1].trim().to_string();
                let status_raw = if parts.len() >= 3 { parts[2].trim() } else { "" };

                let health = if status_raw.contains("(healthy)") {
                    "healthy".to_string()
                } else if status_raw.contains("(unhealthy)") {
                    "unhealthy".to_string()
                } else if status_raw.contains("(health: starting)") {
                    "starting".to_string()
                } else {
                    "none".to_string()
                };

                status_map.insert(name.clone(), ContainerStatusInfo {
                    name,
                    state,
                    health,
                });
            }
        }

        info!("Fetched status for {} containers on server {}", status_map.len(), server_uuid);
        Ok(status_map)
    }
}
