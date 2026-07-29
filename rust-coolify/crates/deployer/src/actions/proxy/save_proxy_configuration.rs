// completed file_0377
// Coolify mənbəsi: app/Actions/Proxy/SaveProxyConfiguration.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct SaveProxyConfiguration;

impl SaveProxyConfiguration {
    /// Proxy konfiqurasiyasını serverdə `/var/coolify/proxy/docker-compose.yml` faylında saxlayır və köhnə konfiqurasiyanın arxivini (backup) yaradır
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
        configuration: &str,
        proxy_type: &str,
    ) -> Result<()> {
        info!("Saving proxy configuration for server {}", server_uuid);

        let proxy_path = match proxy_type.to_lowercase().as_str() {
            "caddy" => "/var/coolify/proxy/caddy",
            _ => "/var/coolify/proxy/traefik",
        };

        let backup_path = format!("{}/backups", proxy_path);
        let timestamp = chrono::Utc::now().format("%Y-%m-%d_%H-%M-%S").to_string();

        let cmd = format!(
            r#"
            mkdir -p {} &&
            mkdir -p {} &&
            test -f {}/docker-compose.yml && cp {}/docker-compose.yml {}/docker-compose.{}.yml || true &&
            echo '{}' > {}/docker-compose.yml
            "#,
            proxy_path,
            backup_path,
            proxy_path,
            proxy_path,
            backup_path,
            timestamp,
            configuration.replace('\'', "'\\''"),
            proxy_path
        );

        ssh_client.execute_cmd(&cmd).await?;

        // Bazada server ayarlarını güncəllə
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

        info!("Proxy configuration saved successfully on server {}", server_uuid);
        Ok(())
    }
}
