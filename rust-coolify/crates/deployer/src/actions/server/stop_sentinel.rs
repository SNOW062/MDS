// completed file_0391
// Coolify mənbəsi: app/Actions/Server/StopSentinel.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct StopSentinel;

impl StopSentinel {
    /// coolify-sentinel konteynerini dayandırır və silir
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
    ) -> Result<()> {
        info!("Stopping Sentinel Agent on server {}", server_uuid);

        let cmd = "docker rm -f coolify-sentinel 2>/dev/null || true";
        ssh_client.execute_cmd(cmd).await?;

        sqlx::query!(
            r#"
            UPDATE server_settings
            SET is_sentinel_enabled = false, updated_at = NOW()
            WHERE server_id = (SELECT id FROM servers WHERE uuid = $1 LIMIT 1)
            "#,
            server_uuid
        )
        .execute(db)
        .await
        .ok();

        info!("Sentinel Agent stopped successfully on server {}", server_uuid);
        Ok(())
    }
}
