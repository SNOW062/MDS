// completed file_0351
// Coolify mənbəsi: app/Actions/Application/IsHorizonQueueEmpty.php
use anyhow::Result;
use sqlx::PgPool;

pub struct IsHorizonQueueEmpty;

impl IsHorizonQueueEmpty {
    /// Növbədə gözləyən və ya icra olunan (in_progress, queued) deployment tapşırığının olub-olmadığını yoxlayır
    pub async fn handle(db: &PgPool) -> Result<bool> {
        let active_jobs_count: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*)
            FROM application_deployment_queues
            WHERE status IN ('queued', 'in_progress')
            "#
        )
        .fetch_one(db)
        .await?
        .unwrap_or(0);

        let is_empty = active_jobs_count == 0;
        tracing::info!("Checked deployment queue status. Is empty: {}", is_empty);
        Ok(is_empty)
    }
}
