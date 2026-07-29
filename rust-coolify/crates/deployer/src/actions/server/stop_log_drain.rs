// completed file_0390
// Coolify mənbəsi: app/Actions/Server/StopLogDrain.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct StopLogDrain;

impl StopLogDrain {
    /// coolify-log-drain konteynerini dayandırır və silir
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
    ) -> Result<()> {
        info!("Stopping Log Drain container on server {}", server_uuid);

        let cmd = "docker rm -f coolify-log-drain 2>/dev/null || true";
        ssh_client.execute_cmd(cmd).await?;

        sqlx::query!(
            r#"
            UPDATE server_settings
            SET is_logdrain_custom_enabled = false, updated_at = NOW()
            WHERE server_id = (SELECT id FROM servers WHERE uuid = $1 LIMIT 1)
            "#,
            server_uuid
        )
        .execute(db)
        .await
        .ok();

        info!("Log Drain stopped successfully on server {}", server_uuid);
        Ok(())
    }
}
