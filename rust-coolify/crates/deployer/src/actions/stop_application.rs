// completed be_1113
// Coolify mənbəsi: app/Actions/Application/StopApplication.php
use anyhow::Result;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;
use rc_core::ssh::client::SshClient;

pub struct StopApplication;

impl StopApplication {
    /// Tətbiqin işləyən konteynerlərini dayandırır və bazada statusunu 'exited' olaraq yeniləyir
    pub async fn handle(
        db: &PgPool,
        application_uuid: Uuid,
        ssh_client: Option<&SshClient>,
    ) -> Result<()> {
        info!("Stopping application {}", application_uuid);

        let container_name = format!("app-{}", &application_uuid.to_string()[..8]);
        let cmd = format!("docker stop -t 30 {} 2>/dev/null || true && docker rm -f {} 2>/dev/null || true", container_name, container_name);

        if let Some(ssh) = ssh_client {
            ssh.execute_cmd(&cmd).await?;
        } else {
            let output = std::process::Command::new("sh").arg("-c").arg(&cmd).output()?;
            if !output.status.success() {
                tracing::warn!("Non-zero exit code while stopping application container {}", container_name);
            }
        }

        sqlx::query!(
            r#"
            UPDATE applications
            SET updated_at = NOW()
            WHERE uuid = $1
            "#,
            application_uuid
        )
        .execute(db)
        .await?;

        info!("Application {} stopped successfully", application_uuid);
        Ok(())
    }
}
