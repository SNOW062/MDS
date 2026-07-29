// completed file_0389
// Coolify mənbəsi: app/Actions/Server/StartSentinel.php
use anyhow::{Result, anyhow};
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct StartSentinel;

impl StartSentinel {
    /// coolify-sentinel (sistem metriklərini yığan və server sağlamlığını izləyən agent) konteynerini başladır
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
        sentinel_token: &str,
        push_endpoint: &str,
        version: &str,
    ) -> Result<()> {
        info!("Starting Sentinel Agent on server {}", server_uuid);

        let image = format!("ghcr.io/coollabsio/sentinel:{}", version);
        let mount_dir = "/var/coolify/sentinel";

        let run_cmd = format!(
            r#"
            docker rm -f coolify-sentinel 2>/dev/null || true &&
            mkdir -p {} &&
            docker run -d \
              --name coolify-sentinel \
              --restart unless-stopped \
              -e TOKEN='{}' \
              -e PUSH_ENDPOINT='{}' \
              -e PUSH_INTERVAL_SECONDS=30 \
              -e COLLECTOR_ENABLED=true \
              -v /var/run/docker.sock:/var/run/docker.sock \
              -v {}:/app/db \
              --pid host \
              --label coolify.managed=true \
              {}
            "#,
            mount_dir,
            sentinel_token,
            push_endpoint,
            mount_dir,
            image
        );

        info!("Executing Sentinel container run command...");
        ssh_client.execute_cmd(&run_cmd).await?;

        // Bazada sentinel aktiv olaraq saxla
        sqlx::query!(
            r#"
            UPDATE server_settings
            SET is_sentinel_enabled = true, updated_at = NOW()
            WHERE server_id = (SELECT id FROM servers WHERE uuid = $1 LIMIT 1)
            "#,
            server_uuid
        )
        .execute(db)
        .await
        .ok();

        info!("Sentinel Agent started successfully on server {}", server_uuid);
        Ok(())
    }
}
