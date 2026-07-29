// completed file_0381
// Coolify mənbəsi: app/Actions/Server/CleanupDocker.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use tracing::info;

pub struct CleanupDocker;

impl CleanupDocker {
    /// Serverdə köhnəlmiş / istifadə olunmayan Docker konteynerlərini, build keşlərini və un-dangling image-ləri təmizləyir
    pub async fn handle(
        ssh_client: &SshClient,
        delete_unused_volumes: bool,
        delete_unused_networks: bool,
    ) -> Result<Vec<String>> {
        info!("Starting Docker cleanup process on server {}", ssh_client.host);

        let mut commands = vec![
            // 1. İşləməyən idarəolunmayan konteynerləri sil
            "docker container prune -f --filter 'label=coolify.managed=true'".to_string(),
            // 2. Dangling (asılı qalan) image-ləri təmizlə
            "docker image prune -f".to_string(),
            // 3. Docker buildx cache-ləri sil (diskdə yer açmaq üçün)
            "docker builder prune -af".to_string(),
        ];

        if delete_unused_volumes {
            commands.push("docker volume prune -af".to_string());
        }

        if delete_unused_networks {
            commands.push("docker network prune -f".to_string());
        }

        let mut logs = Vec::new();
        for cmd in &commands {
            info!("Executing cleanup command: {}", cmd);
            match ssh_client.execute_cmd(cmd).await {
                Ok(output) => logs.push(format!("Command: {}\nOutput: {}", cmd, output)),
                Err(err) => logs.push(format!("Command: {}\nError: {:?}", cmd, err)),
            }
        }

        info!("Docker cleanup completed on server {}", ssh_client.host);
        Ok(logs)
    }
}
