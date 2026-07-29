// completed file_0994
// Coolify mənbəsi: app/Traits/ExecuteRemoteCommand.php
use anyhow::Result;
use crate::ssh::client::SshClient;
use tracing::info;

pub struct ExecuteRemoteCommand;

impl ExecuteRemoteCommand {
    /// Uzaq serverdə shell əmrlərini təhlükəsiz şəkildə icra edir və log edir
    pub async fn execute(ssh_client: &SshClient, command: &str) -> Result<String> {
        info!("Executing remote command on {}: {}", ssh_client.host, command);
        let output = ssh_client.execute_cmd(command).await?;
        Ok(output)
    }
}
