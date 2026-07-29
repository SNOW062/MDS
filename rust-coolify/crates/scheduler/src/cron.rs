// completed be_1171
// Coolify mənbəsi: app/Console/Kernel.php — Cron job scheduler
use anyhow::Result;
use tokio::time::{sleep, Duration};
use tracing::info;

pub struct CronScheduler {
    interval: Duration,
}

impl CronScheduler {
    pub fn new(interval_secs: u64) -> Self {
        Self {
            interval: Duration::from_secs(interval_secs),
        }
    }

    pub async fn start<F, Fut>(&self, job: F) -> Result<()>
    where
        F: Fn() -> Fut,
        Fut: std::future::Future<Output = Result<()>>,
    {
        info!("CronScheduler engine started");
        loop {
            if let Err(err) = job().await {
                tracing::error!("Scheduled cron job execution error: {:?}", err);
            }
            sleep(self.interval).await;
        }
    }
}
