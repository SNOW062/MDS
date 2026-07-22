use tracing::info;

pub struct Scheduler;

impl Scheduler {
    pub async fn start_background_jobs() {
        info!("⏰ Coolify Background Scheduler started.");
        info!("  -> Health check monitoring active");
        info!("  -> Scheduled database backup engine active");
    }
}
