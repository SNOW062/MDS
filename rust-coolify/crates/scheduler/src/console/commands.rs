// completed be_1169
use anyhow::Result;
use sqlx::PgPool;
use tracing::info;

pub struct SchedulerConsoleCommands;

impl SchedulerConsoleCommands {
    pub async fn run_cleanup_command(db: &PgPool) -> Result<()> {
        info!("Executing console cleanup command");
        crate::jobs::prune_stale_deployments_job::PruneStaleDeploymentsJob::run(db).await?;
        Ok(())
    }
}
