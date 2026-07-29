// completed be_1108
// Coolify mənbəsi: app/Actions/Application/CleanupPreviewDeployment.php
use anyhow::Result;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;
use rc_core::ssh::client::SshClient;

pub struct CleanupPreview;

impl CleanupPreview {
    /// PR / Preview tətbiqinin dondurulması və müvafiq Docker konteynerinin silinməsi
    pub async fn handle(
        db: &PgPool,
        preview_uuid: Uuid,
        pull_request_id: u32,
        ssh_client: Option<&SshClient>,
    ) -> Result<()> {
        info!("Cleaning up preview deployment for PR #{} (uuid: {})", pull_request_id, preview_uuid);

        let container_name = format!("pr-{}-{}", pull_request_id, &preview_uuid.to_string()[..8]);
        let cmd = format!("docker stop -t 30 {} 2>/dev/null || true && docker rm -f {} 2>/dev/null || true", container_name, container_name);

        if let Some(ssh) = ssh_client {
            ssh.execute_cmd(&cmd).await?;
        } else {
            std::process::Command::new("sh").arg("-c").arg(&cmd).output()?;
        }

        sqlx::query!(
            r#"
            DELETE FROM application_previews
            WHERE pull_request_id = $1
            "#,
            pull_request_id as i32
        )
        .execute(db)
        .await
        .ok();

        info!("Preview deployment for PR #{} cleaned up successfully", pull_request_id);
        Ok(())
    }
}
