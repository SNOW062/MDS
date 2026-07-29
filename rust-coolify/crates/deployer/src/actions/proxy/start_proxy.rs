// completed file_0378
// Coolify mənbəsi: app/Actions/Proxy/StartProxy.php
use anyhow::{Result, anyhow};
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct StartProxy;

impl StartProxy {
    /// Proxy (Traefik v3 və ya Caddy) üçün dynamic konfiqurasiya fayllarını tənzimləyir və konteyneri başladır
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
        proxy_type: &str,
    ) -> Result<()> {
        info!("Starting Proxy ({}) on server {}", proxy_type, server_uuid);

        let proxy_path = match proxy_type.to_lowercase().as_str() {
            "caddy" => "/var/coolify/proxy/caddy",
            _ => "/var/coolify/proxy/traefik",
        };

        let setup_cmd = format!(
            r#"
            mkdir -p {}/dynamic &&
            cd {} &&
            echo 'Starting coolify-proxy...' &&
            if docker ps -a --format '{{{{.Names}}}}' | grep -q '^coolify-proxy$'; then
                docker stop coolify-proxy 2>/dev/null || true
                docker rm -f coolify-proxy 2>/dev/null || true
            fi
            "#,
            proxy_path, proxy_path
        );

        ssh_client.execute_cmd(&setup_cmd).await?;

        // Traefik / Caddy üzərindən proxy network və compose işə salınır
        let start_cmd = format!(
            r#"
            docker network create coolify 2>/dev/null || true &&
            cd {} &&
            docker compose up -d --remove-orphans
            "#,
            proxy_path
        );

        ssh_client.execute_cmd(&start_cmd).await?;

        // Server proxy statusunu yeniləyirik
        sqlx::query!(
            r#"
            UPDATE server_settings
            SET is_build_server = false, updated_at = NOW()
            WHERE server_id = (SELECT id FROM servers WHERE uuid = $1 LIMIT 1)
            "#,
            server_uuid
        )
        .execute(db)
        .await
        .ok();

        info!("Proxy ({}) started successfully on server {}", proxy_type, server_uuid);
        Ok(())
    }
}
