// completed file_0351
// Coolify mənbəsi: app/Actions/Application/IsHorizonQueueEmpty.php
use anyhow::Result;
use sqlx::{PgPool, Row};

pub struct IsHorizonQueueEmpty;

impl IsHorizonQueueEmpty {
    /// Növbədə gözləyən və ya icra olunan (in_progress, queued) deployment tapşırığının olub-olmadığını yoxlayır
    pub async fn handle(db: &PgPool) -> Result<bool> {
        let row = sqlx::query(
            r#"
            SELECT COUNT(*) as count
            FROM application_deployment_queues
            WHERE status IN ('queued', 'in_progress')
            "#
        )
        .fetch_one(db)
        .await?;

        let active_jobs_count: i64 = row.get("count");
        let is_empty = active_jobs_count == 0;
        tracing::info!("Checked deployment queue status. Is empty: {}", is_empty);
        Ok(is_empty)
    }
}
