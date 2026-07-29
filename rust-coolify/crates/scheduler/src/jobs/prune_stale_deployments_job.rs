// completed file_0878
// Coolify mənbəsi: Stale Deployments Cleanup Job
use anyhow::Result;
use sqlx::PgPool;
use tracing::info;

pub struct PruneStaleDeploymentsJob;

impl PruneStaleDeploymentsJob {
    /// 6 saatdan çox dondurulmuş və ya ilişib qalmış deployment növbə qeydlərini 'failed' olaraq təyin edir
    pub async fn run(db: &PgPool) -> Result<u64> {
        info!("Executing PruneStaleDeploymentsJob");

        let rows_affected = sqlx::query!(
            r#"
            UPDATE application_deployment_queues
            SET status = 'failed', updated_at = NOW()
            WHERE status IN ('queued', 'in_progress')
              AND created_at < NOW() - INTERVAL '6 hours'
            "#
        )
        .execute(db)
        .await?
        .rows_affected();

        info!("Pruned {} stale deployment records", rows_affected);
        Ok(rows_affected)
    }
}
