// completed file_0386
// Coolify mənbəsi: app/Actions/Server/RestartContainer.php
use anyhow::{Result, anyhow};
use rc_core::ssh::client::SshClient;
use tracing::info;

pub struct RestartContainer;

impl RestartContainer {
    /// Serverdə müəyyən bir Docker konteynerini (container_name / container_id) yenidən başladır
    pub async fn handle(
        ssh_client: &SshClient,
        container_name: &str,
    ) -> Result<()> {
        info!("Restarting container {} on server {}", container_name, ssh_client.host);

        let cmd = format!("docker restart {}", container_name);
        let output = ssh_client.execute_cmd(&cmd).await?;

        info!("Container {} restarted successfully. Output: {}", container_name, output.trim());
        Ok(())
    }
}
