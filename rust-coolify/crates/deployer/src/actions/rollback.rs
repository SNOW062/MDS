// completed be_1110
// Coolify mənbəsi: app/Actions/Application/RollbackApplication.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;
use rc_core::ssh::client::SshClient;

pub struct RollbackApplication;

impl RollbackApplication {
    /// Əvvəlki uğurlu deployment-in Docker image tag-inə rollback edir
    pub async fn handle(
        db: &PgPool,
        application_uuid: Uuid,
        target_commit_or_tag: &str,
        ssh_client: Option<&SshClient>,
    ) -> Result<()> {
        info!("Rolling back application {} to image tag/commit {}", application_uuid, target_commit_or_tag);

        let container_name = format!("app-{}", &application_uuid.to_string()[..8]);
        let image_name = format!("{}:{}", container_name, target_commit_or_tag);

        // 1. Köhnə konteyneri dayandır
        let stop_cmd = format!("docker stop -t 30 {} 2>/dev/null || true && docker rm -f {} 2>/dev/null || true", container_name, container_name);
        
        // 2. Rolled back image ilə konteyneri yenidən başlat
        let start_cmd = format!("docker run -d --name {} --restart unless-stopped --network coolify {}", container_name, image_name);

        let full_script = format!("{} && {}", stop_cmd, start_cmd);

        if let Some(ssh) = ssh_client {
            ssh.execute_cmd(&full_script).await?;
        } else {
            let output = std::process::Command::new("sh").arg("-c").arg(&full_script).output()?;
            if !output.status.success() {
                let stderr = String::from_utf8_lossy(&output.stderr);
                return Err(anyhow!("Rollback execution failed: {}", stderr));
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

        info!("Application {} successfully rolled back to {}", application_uuid, target_commit_or_tag);
        Ok(())
    }
}
