// completed file_0379
// Coolify mənbəsi: app/Actions/Proxy/StopProxy.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct StopProxy;

impl StopProxy {
    /// coolify-proxy konteynerini dayandırır və silir
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
        timeout_secs: u32,
    ) -> Result<()> {
        info!("Stopping coolify-proxy on server {}", server_uuid);

        let container_name = "coolify-proxy";
        let cmd = format!(
            r#"
            docker stop -t={} {} 2>/dev/null || true &&
            docker rm -f {} 2>/dev/null || true
            "#,
            timeout_secs, container_name, container_name
        );

        ssh_client.execute_cmd(&cmd).await?;

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

        info!("coolify-proxy container stopped successfully on server {}", server_uuid);
        Ok(())
    }
}
