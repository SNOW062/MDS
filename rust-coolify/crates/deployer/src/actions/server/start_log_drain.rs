// completed file_0388
// Coolify mənbəsi: app/Actions/Server/StartLogDrain.php
use anyhow::{Result, anyhow};
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct StartLogDrain;

impl StartLogDrain {
    /// Vector / FluentBit əsaslı log-drain konteynerini (coolify-log-drain) uzaq serverdə başladır
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
        drain_type: &str,
        api_key: &str,
        endpoint: Option<&str>,
    ) -> Result<()> {
        info!("Starting Log Drain ({}) on server {}", drain_type, server_uuid);

        let fluentbit_config = format!(
            r#"
[SERVICE]
    Flush        5
    Daemon       off
    Log_Level    info

[INPUT]
    Name         forward
    Host         0.0.0.0
    Port         24224

[OUTPUT]
    Name         http
    Match        *
    Host         {}
    Port         443
    URI          /api/v1/logs
    Header       Authorization Bearer {}
    Format       json
"#,
            endpoint.unwrap_or("log-api.coolify.io"),
            api_key
        );

        let compose_content = format!(
            r#"
version: '3.8'
services:
  coolify-log-drain:
    container_name: coolify-log-drain
    image: fluent/fluent-bit:2.2
    restart: unless-stopped
    ports:
      - "127.0.0.1:24224:24224"
    volumes:
      - /var/coolify/log-drain/fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf
    networks:
      - coolify
networks:
  coolify:
    external: true
"#
        );

        let workdir = "/var/coolify/log-drain";
        let cmd = format!(
            r#"
            mkdir -p {} &&
            echo '{}' > {}/fluent-bit.conf &&
            echo '{}' > {}/docker-compose.yml &&
            cd {} &&
            docker rm -f coolify-log-drain 2>/dev/null || true &&
            docker compose up -d --remove-orphans
            "#,
            workdir,
            fluentbit_config.replace('\'', "'\\''"),
            workdir,
            compose_content.replace('\'', "'\\''"),
            workdir,
            workdir
        );

        ssh_client.execute_cmd(&cmd).await?;

        sqlx::query!(
            r#"
            UPDATE server_settings
            SET is_logdrain_custom_enabled = true, updated_at = NOW()
            WHERE server_id = (SELECT id FROM servers WHERE uuid = $1 LIMIT 1)
            "#,
            server_uuid
        )
        .execute(db)
        .await
        .ok();

        info!("Log Drain ({}) started successfully on server {}", drain_type, server_uuid);
        Ok(())
    }
}
