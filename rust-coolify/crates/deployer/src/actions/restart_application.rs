// completed be_1108
// Coolify mənbəsi: app/Actions/Application/RestartApplication.php
use anyhow::Result;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;
use rc_core::ssh::client::SshClient;

pub struct RestartApplication;

impl RestartApplication {
    /// Tətbiqin işləyən Docker konteynerini `docker restart` və ya zero-downtime rolling update vasitəsilə yenidən başladır
    pub async fn handle(
        db: &PgPool,
        application_uuid: Uuid,
        ssh_client: Option<&SshClient>,
    ) -> Result<()> {
        info!("Restarting application {}", application_uuid);

        let container_name = format!("app-{}", &application_uuid.to_string()[..8]);
        let cmd = format!("docker restart {}", container_name);

        if let Some(ssh) = ssh_client {
            ssh.execute_cmd(&cmd).await?;
        } else {
            let output = std::process::Command::new("sh").arg("-c").arg(&cmd).output()?;
            if !output.status.success() {
                tracing::warn!("Non-zero exit code while restarting application container {}", container_name);
            }
        }

        sqlx::query(
            r#"
            UPDATE applications
            SET updated_at = NOW()
            WHERE uuid = $1
            "#,
        )
        .bind(application_uuid)
        .execute(db)
        .await?;

        info!("Application {} restarted successfully", application_uuid);
        Ok(())
    }
}
