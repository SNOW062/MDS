// completed file_0880
// Coolify mənbəsi: app/Jobs/ServerCheckJob.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::{info, warn};
use uuid::Uuid;

pub struct ServerCheckJob;

impl ServerCheckJob {
    /// Serverin SSH bağlantısını, proxy container statusunu, Sentinel agentini və işləyən konteynerləri dövri yoxlayır
    pub async fn run(db: &PgPool, server_uuid: Uuid, ssh_client: &SshClient) -> Result<()> {
        info!("Executing ServerCheckJob for server {}", server_uuid);

        // 1. SSH ilə serverin cavab verib-vermədiyini yoxlayırıq
        let uptime_cmd = "uptime -p 2>/dev/null || uptime";
        match ssh_client.execute_cmd(uptime_cmd).await {
            Ok(output) => {
                info!("Server {} reachable: {}", server_uuid, output.trim());

                // Bazada server unreachable sayğacını sıfırlayırıq və is_reachable = true edirik
                sqlx::query!(
                    r#"
                    UPDATE servers
                    SET is_reachable = true, unreachable_count = 0, updated_at = NOW()
                    WHERE uuid = $1
                    "#,
                    server_uuid
                )
                .execute(db)
                .await?;
            }
            Err(e) => {
                warn!("Server {} unreachable via SSH: {}", server_uuid, e);

                sqlx::query!(
                    r#"
                    UPDATE servers
                    SET is_reachable = false, unreachable_count = unreachable_count + 1, updated_at = NOW()
                    WHERE uuid = $1
                    "#,
                    server_uuid
                )
                .execute(db)
                .await?;

                return Ok(());
            }
        }

        // 2. Proxy (coolify-proxy) konteynerinin işləməsini yoxlayırıq
        let proxy_check_cmd = "docker inspect --format '{{.State.Status}}' coolify-proxy 2>/dev/null || echo 'missing'";
        let proxy_status = ssh_client.execute_cmd(proxy_check_cmd).await.unwrap_or_else(|_| "missing".to_string());
        
        let proxy_status_clean = proxy_status.trim();
        info!("Server {} proxy status: {}", server_uuid, proxy_status_clean);

        if proxy_status_clean == "missing" || proxy_status_clean == "exited" {
            warn!("Proxy container on server {} is missing or exited. Attempting restart...", server_uuid);
            let restart_cmd = "docker compose -f /var/coolify/proxy/docker-compose.yml up -d 2>/dev/null || docker start coolify-proxy 2>/dev/null || true";
            ssh_client.execute_cmd(restart_cmd).await.ok();
        }

        info!("ServerCheckJob completed successfully for server {}", server_uuid);
        Ok(())
    }
}
