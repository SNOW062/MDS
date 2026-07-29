// completed file_0375
// Coolify mənbəsi: app/Actions/Proxy/CheckProxy.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct CheckProxy;

impl CheckProxy {
    /// coolify-proxy konteynerinin işlək (running) olub-olmadığını və ya yenidən başladılmasının lazım olduğunu yoxlayır
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
    ) -> Result<bool> {
        info!("Checking proxy status on server {}", server_uuid);

        let cmd = "docker inspect -f '{{.State.Running}}' coolify-proxy 2>/dev/null || echo 'false'";
        let output = ssh_client.execute_cmd(cmd).await.unwrap_or_else(|_| "false".to_string());

        let is_running = output.trim() == "true";

        if is_running {
            info!("Proxy is running healthy on server {}", server_uuid);
            return Ok(false); // proxy artıq işləyir, start-a ehtiyac yoxdur
        }

        // Portların (80, 443) başqa proseslər tərəfindən tutulub-tutulmadığını yoxlayır
        let port_cmd = "lsof -i :80 -i :443 -t 2>/dev/null || true";
        let port_output = ssh_client.execute_cmd(port_cmd).await.unwrap_or_default();

        if !port_output.trim().is_empty() {
            tracing::warn!("Port 80 or 443 conflict detected on server {}: {}", server_uuid, port_output);
        }

        info!("Proxy needs to be started on server {}", server_uuid);
        Ok(true) // StartProxy.run() cağırılmalıdır
    }
}
