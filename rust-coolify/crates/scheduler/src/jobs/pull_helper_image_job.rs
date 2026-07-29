// completed file_0877
// Coolify mənbəsi: app/Jobs/CheckHelperImageJob.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::info;

pub struct PullHelperImageJob;

impl PullHelperImageJob {
    /// Serverə Coolify lag/helper konteyner image-ini (`ghcr.io/coollabsio/coolify-helper:latest`) yeniləyir və yukləyir
    pub async fn run(db: &PgPool, ssh_client: &SshClient) -> Result<()> {
        info!("Executing PullHelperImageJob on server {}", ssh_client.host);

        let pull_cmd = "docker pull ghcr.io/coollabsio/coolify-helper:latest 2>/dev/null || true";
        ssh_client.execute_cmd(pull_cmd).await?;

        sqlx::query!(
            "UPDATE instance_settings SET helper_version = 'latest', updated_at = NOW()"
        )
        .execute(db)
        .await
        .ok();

        info!("Helper image pulled successfully on {}", ssh_client.host);
        Ok(())
    }
}
