// completed file_0872
// Coolify mənbəsi: app/Jobs/DockerCleanupJob.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::{info, warn};
use uuid::Uuid;

pub struct DockerCleanupJob;

impl DockerCleanupJob {
    /// Serverdə istifadə olunmayan Docker image-lərini, build cache-i və dayandırılmış konteynerləri təmizləyir
    pub async fn run(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
        cleanup_volumes: bool,
    ) -> Result<String> {
        info!("Executing DockerCleanupJob on server {} (cleanup_volumes={})", server_uuid, cleanup_volumes);

        // 1. Təmizləmədən qabaq disk faizini alırıq
        let disk_before_cmd = "df -h / | tail -n 1 | awk '{print $5}' | tr -d '%'";
        let disk_before = ssh_client.execute_cmd(disk_before_cmd).await.unwrap_or_default().trim().to_string();

        // 2. Prune komandalarını generasiya edib icra edirik
        let mut cleanup_cmds = vec![
            "docker image prune -af --filter \"until=24h\"",
            "docker builder prune -af --filter \"until=24h\"",
            "docker container prune -f",
        ];

        if cleanup_volumes {
            cleanup_cmds.push("docker volume prune -f");
        }

        let full_script = cleanup_cmds.join(" && ");
        info!("Running docker cleanup script: {}", full_script);

        let cleanup_output = match ssh_client.execute_cmd(&full_script).await {
            Ok(out) => out,
            Err(e) => {
                warn!("Docker cleanup script failed on server {}: {}", server_uuid, e);
                return Err(e);
            }
        };

        // 3. Təmizləmədən sonra disk faizini alırıq
        let disk_after = ssh_client.execute_cmd(disk_before_cmd).await.unwrap_or_default().trim().to_string();

        let summary = format!(
            "Docker cleanup completed on server {}. Disk usage before: {}%, after: {}%. Output:\n{}",
            server_uuid, disk_before, disk_after, cleanup_output
        );

        sqlx::query!(
            r#"
            UPDATE server_settings
            SET updated_at = NOW()
            WHERE server_id = (SELECT id FROM servers WHERE uuid = $1 LIMIT 1)
            "#,
            server_uuid
        )
        .execute(db)
        .await
        .ok();

        info!("{}", summary);
        Ok(summary)
    }
}
