// completed file_0549
// Coolify mənbəsi: app/Jobs/ApplicationDeploymentJob.php (247 KB)
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use uuid::Uuid;
use rc_deployer::engine::{DeployEngine, DeployContext};
use tokio::sync::mpsc;

pub struct ApplicationDeploymentJob {
    pub deployment_uuid: Uuid,
}

impl ApplicationDeploymentJob {
    pub fn new(deployment_uuid: Uuid) -> Self {
        Self { deployment_uuid }
    }

    /// Application deployment növbə tapşırığını icra edir
    pub async fn handle(&self, db: &PgPool) -> Result<()> {
        tracing::info!("Handling ApplicationDeploymentJob for deployment {}", self.deployment_uuid);

        // 1. Queue-dən deployment məlumatlarını alırıq
        let deploy_req = sqlx::query!(
            r#"
            SELECT adq.uuid as deployment_uuid, adq.application_uuid, a.git_repository, a.git_branch, a.build_pack
            FROM application_deployment_queues adq
            JOIN applications a ON a.uuid = adq.application_uuid
            WHERE adq.uuid = $1
            "#,
            self.deployment_uuid
        )
        .fetch_optional(db)
        .await?
        .ok_or_else(|| anyhow!("Deployment queue item not found: {}", self.deployment_uuid))?;

        // 2. Statusu 'in_progress' olaraq yeniləyirik
        sqlx::query!(
            r#"
            UPDATE application_deployment_queues
            SET status = 'in_progress', updated_at = NOW()
            WHERE uuid = $1
            "#,
            self.deployment_uuid
        )
        .execute(db)
        .await?;

        // 3. DeployContext formalaşdırırıq
        let ctx = DeployContext::new(
            deploy_req.deployment_uuid,
            deploy_req.application_uuid,
            Uuid::nil(), // Server UUID placeholder
            deploy_req.git_repository,
            deploy_req.git_branch,
            deploy_req.build_pack.unwrap_or_else(|| "nixpacks".to_string()),
        );

        // 4. Event channel və DeployEngine vasitəsilə icra edirik
        let (tx, mut rx) = mpsc::channel(100);
        let engine = DeployEngine::new(db.clone(), tx);

        // Event-ləri fon rejimində dinləyib loglamaq
        tokio::spawn(async move {
            while let Some(event) = rx.recv().await {
                tracing::info!("Deployment Event: {:?}", event);
            }
        });

        match engine.run(ctx).await {
            Ok(_) => {
                tracing::info!("ApplicationDeploymentJob completed successfully for {}", self.deployment_uuid);
                sqlx::query!(
                    r#"
                    UPDATE application_deployment_queues
                    SET status = 'finished', finished_at = NOW(), updated_at = NOW()
                    WHERE uuid = $1
                    "#,
                    self.deployment_uuid
                )
                .execute(db)
                .await?;
                Ok(())
            }
            Err(err) => {
                tracing::error!("ApplicationDeploymentJob failed for {}: {:?}", self.deployment_uuid, err);
                sqlx::query!(
                    r#"
                    UPDATE application_deployment_queues
                    SET status = 'failed', finished_at = NOW(), updated_at = NOW()
                    WHERE uuid = $1
                    "#,
                    self.deployment_uuid
                )
                .execute(db)
                .await?;
                Err(anyhow!("Deployment job failed: {}", err))
            }
        }
    }
}
