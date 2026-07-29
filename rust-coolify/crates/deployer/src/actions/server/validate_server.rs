// completed file_0395
// Coolify mənbəsi: app/Actions/Server/ValidateServer.php
use anyhow::{Result, anyhow};
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct ServerValidationResult {
    pub is_reachable: bool,
    pub uptime: String,
    pub os_type: String,
    pub is_docker_installed: bool,
    pub docker_version: String,
}

pub struct ValidateServer;

impl ValidateServer {
    /// Serverin SSH bağlantısını, Uptime-nı, OS növünü və Docker Engine versiyasını yoxlayır
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
    ) -> Result<ServerValidationResult> {
        info!("Validating server {}", server_uuid);

        // 1. Uptime yoxlanışı
        let uptime_cmd = "uptime -p 2>/dev/null || uptime";
        let uptime_output = ssh_client.execute_cmd(uptime_cmd).await
            .map_err(|e| anyhow!("Server unreachable via SSH: {}", e))?;

        // 2. OS növünün yoxlanışı
        let os_cmd = "cat /etc/os-release | grep '^ID=' | cut -d'=' -f2 | tr -d '\"'";
        let os_type = ssh_client.execute_cmd(os_cmd).await.unwrap_or_else(|_| "linux".to_string());

        // 3. Docker Engine yoxlanışı
        let docker_ver_cmd = "docker version --format '{{.Server.Version}}' 2>/dev/null || echo ''";
        let docker_version = ssh_client.execute_cmd(docker_ver_cmd).await.unwrap_or_default();

        let is_docker_installed = !docker_version.trim().is_empty();

        let result = ServerValidationResult {
            is_reachable: true,
            uptime: uptime_output.trim().to_string(),
            os_type: os_type.trim().to_string(),
            is_docker_installed,
            docker_version: docker_version.trim().to_string(),
        };

        // Bazada server statusunu doğrulandı olaraq qeyd edirik
        sqlx::query!(
            r#"
            UPDATE servers
            SET updated_at = NOW()
            WHERE uuid = $1
            "#,
            server_uuid
        )
        .execute(db)
        .await?;

        info!("Server {} validated successfully. Docker: {}", server_uuid, result.docker_version);
        Ok(result)
    }
}
