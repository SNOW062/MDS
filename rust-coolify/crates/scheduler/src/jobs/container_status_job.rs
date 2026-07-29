// completed file_0869
// Coolify mənbəsi: Container Status Check Job
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct ContainerStatusJob;

impl ContainerStatusJob {
    /// Bütün konteynerlərin statuslarını `docker ps` vasitəsilə alıb DB statuslarını güncəlləyir
    pub async fn run(db: &PgPool, server_uuid: Uuid, ssh_client: &SshClient) -> Result<()> {
        info!("Executing ContainerStatusJob for server {}", server_uuid);

        let ps_cmd = "docker ps -a --format '{{.Names}}|{{.State}}' 2>/dev/null || true";
        let output = ssh_client.execute_cmd(ps_cmd).await?;

        for line in output.lines() {
            let parts: Vec<&str> = line.split('|').collect();
            if parts.len() == 2 {
                let name = parts[0].trim();
                let state = parts[1].trim();

                if name.starts_with("app-") {
                    let app_uuid_prefix = name.trim_start_matches("app-");
                    sqlx::query!(
                        "UPDATE applications SET status = $1, updated_at = NOW() WHERE uuid::text LIKE $2",
                        state,
                        format!("{}%", app_uuid_prefix)
                    )
                    .execute(db)
                    .await
                    .ok();
                }
            }
        }

        info!("ContainerStatusJob finished for server {}", server_uuid);
        Ok(())
    }
}
