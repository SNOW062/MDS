// completed file_0382
// Coolify mənbəsi: app/Actions/Server/ConfigureCloudflared.php
use anyhow::{Result, anyhow};
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct ConfigureCloudflared;

impl ConfigureCloudflared {
    /// Cloudflare Tunnel (cloudflared) konteynerini uzaq serverdə konfiqurasiya edir və başladır
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
        cloudflare_token: &str,
    ) -> Result<()> {
        info!("Configuring Cloudflare Tunnel on server {}", server_uuid);

        let compose_content = format!(
            r#"
version: '3.8'
services:
  coolify-cloudflared:
    container_name: coolify-cloudflared
    image: cloudflare/cloudflared:latest
    restart: unless-stopped
    network_mode: host
    command: tunnel run
    environment:
      - TUNNEL_TOKEN={}
      - TUNNEL_METRICS=127.0.0.1:60123
    healthcheck:
      test: ["CMD", "cloudflared", "tunnel", "--metrics", "127.0.0.1:60123", "ready"]
      interval: 5s
      timeout: 30s
      retries: 5
"#,
            cloudflare_token
        );

        let workdir = "/var/coolify/cloudflared";
        let cmd = format!(
            r#"
            mkdir -p {} &&
            echo '{}' > {}/docker-compose.yml &&
            cd {} &&
            docker compose pull &&
            docker rm -f coolify-cloudflared 2>/dev/null || true &&
            docker compose up -d --remove-orphans
            "#,
            workdir,
            compose_content.replace('\'', "'\\''"),
            workdir,
            workdir
        );

        info!("Executing Cloudflare Tunnel start script...");
        ssh_client.execute_cmd(&cmd).await?;

        // Bazada server parametrlərini güncəllə
        sqlx::query!(
            r#"
            UPDATE server_settings
            SET is_cloudflare_tunnel = true, updated_at = NOW()
            WHERE server_id = (SELECT id FROM servers WHERE uuid = $1 LIMIT 1)
            "#,
            server_uuid
        )
        .execute(db)
        .await
        .ok();

        info!("Cloudflare Tunnel configured and started successfully on server {}", server_uuid);
        Ok(())
    }
}
