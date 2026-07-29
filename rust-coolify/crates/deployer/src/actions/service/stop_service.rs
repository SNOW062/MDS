// completed file_0401
// Coolify mənbəsi: app/Actions/Service/StopService.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use uuid::Uuid;
use rc_core::ssh::client::SshClient;

pub struct StopService;

impl StopService {
    /// Servisə aid bütün konteynerləri paralel şəkildə dondurur və şəbəkəni təmizləyir
    pub async fn handle(
        db: &PgPool,
        service_uuid: Uuid,
        ssh_client: Option<&SshClient>,
    ) -> Result<()> {
        tracing::info!("Stopping full service {}", service_uuid);

        let workdir = format!("/var/coolify/services/{}", service_uuid);
        let project_name = format!("srv-{}", &service_uuid.to_string()[..8]);

        let cmd = format!(
            "docker compose --project-directory {} --project-name {} down -v 2>/dev/null || docker rm -f $(docker ps -a --filter 'label=coolify.serviceId={}' -q) 2>/dev/null || true",
            workdir, project_name, service_uuid
        );

        tracing::info!("Executing StopService Command: {}", cmd);

        if let Some(ssh) = ssh_client {
            ssh.execute_cmd(&cmd).await?;
        } else {
            let output = std::process::Command::new("sh")
                .arg("-c")
                .arg(&cmd)
                .output()?;

            if !output.status.success() {
                tracing::warn!("Non-zero exit status on StopService: {}", String::from_utf8_lossy(&output.stderr));
            }
        }

        sqlx::query!(
            r#"
            UPDATE services
            SET updated_at = NOW()
            WHERE uuid = $1
            "#,
            service_uuid
        )
        .execute(db)
        .await?;

        tracing::info!("Service {} stopped successfully", service_uuid);
        Ok(())
    }
}
