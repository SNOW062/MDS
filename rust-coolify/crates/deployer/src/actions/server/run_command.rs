// completed file_0387
// Coolify mənbəsi: app/Actions/Server/RunCommand.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use tracing::info;

pub struct RunCommand;

impl RunCommand {
    /// Serverdə verilmiş ixtiyari ad-hoc shell əmrini SSH ilə icra edir
    pub async fn handle(
        ssh_client: &SshClient,
        command: &str,
    ) -> Result<String> {
        info!("Running custom command on server {}: {}", ssh_client.host, command);

        let output = ssh_client.execute_cmd(command).await?;
        info!("Custom command executed successfully on server {}", ssh_client.host);

        Ok(output)
    }
}
