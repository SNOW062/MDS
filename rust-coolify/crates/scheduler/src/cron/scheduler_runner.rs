// completed file_0881
// Coolify Cron Scheduler Runner
use anyhow::Result;
use sqlx::PgPool;
use std::time::Duration;
use tracing::info;

pub struct SchedulerRunner;

impl SchedulerRunner {
    /// Background task olaraq hər 60 saniyədən bir dövri cron tapşırıqlarını icra edir
    pub async fn start_loop(db: PgPool) -> Result<()> {
        info!("Starting Tokio Cron Scheduler Runner loop...");
        let mut interval = tokio::time::interval(Duration::from_secs(60));

        loop {
            interval.tick().await;
            info!("Cron Scheduler tick: checking scheduled jobs...");

            // Stale deployments cleanup
            crate::jobs::prune_stale_deployments_job::PruneStaleDeploymentsJob::run(&db).await.ok();

            // License status sync
            crate::jobs::check_licenses_job::CheckLicensesJob::run(&db).await.ok();
        }
    }
}
