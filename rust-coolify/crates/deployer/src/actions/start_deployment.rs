// completed be_1110
// Coolify mənbəsi: app/Actions/Application/StartDeployment.php
use anyhow::Result;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct StartDeployment;

impl StartDeployment {
    /// Yeni deployment növbə tapşırığı (ApplicationDeploymentQueue) yaradır və DB-yə daxil edir
    pub async fn handle(
        db: &PgPool,
        application_uuid: Uuid,
        commit_sha: Option<&str>,
        is_force_rebuild: bool,
    ) -> Result<Uuid> {
        let deployment_uuid = Uuid::new_v4();
        info!("Dispatching new deployment (uuid: {}) for application {}", deployment_uuid, application_uuid);

        sqlx::query(
            r#"
            INSERT INTO application_deployment_queues (uuid, application_uuid, status, commit, is_force_rebuild, created_at, updated_at)
            VALUES ($1, $2, 'queued', $3, $4, NOW(), NOW())
            "#,
        )
        .bind(deployment_uuid)
        .bind(application_uuid)
        .bind(commit_sha)
        .bind(is_force_rebuild)
        .execute(db)
        .await?;

        info!("Deployment {} queued successfully", deployment_uuid);
        Ok(deployment_uuid)
    }
}
