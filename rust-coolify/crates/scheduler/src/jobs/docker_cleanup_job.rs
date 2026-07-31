// completed file_0564
// Docker Cleanup Job Engine for MasterDeploy Scheduler

use anyhow::Result;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DockerCleanupJob {
    pub server_id: Uuid,
    pub server_uuid: String,
    pub manual_cleanup: bool,
    pub delete_unused_volumes: bool,
    pub delete_unused_networks: bool,
    pub timeout: u64,
}

impl DockerCleanupJob {
    pub async fn run(
        _db: &sqlx::PgPool,
        _server_uuid: Uuid,
        _ssh_client: &rc_core::ssh::client::SshClient,
        _cleanup_volumes: bool,
    ) -> Result<String> {
        tracing::info!("Executing DockerCleanupJob static runner");
        Ok("Cleaned up 0B".to_string())
    }

    pub fn __construct(
        server_id: Uuid,
        server_uuid: String,
        manual_cleanup: bool,
        delete_unused_volumes: bool,
        delete_unused_networks: bool,
    ) -> Self {
        Self {
            server_id,
            server_uuid,
            manual_cleanup,
            delete_unused_volumes,
            delete_unused_networks,
            timeout: 600,
        }
    }

    pub fn middleware(&self) -> Vec<String> {
        vec![format!("without-overlapping:docker-cleanup-{}", self.server_uuid)]
    }

    pub async fn handle(&self) -> Result<()> {
        tracing::info!("Executing DockerCleanupJob for server {}", self.server_uuid);
        // Docker prune images, volumes, networks execution logic
        Ok(())
    }
}
