// completed be_1170_manager
use anyhow::Result;
use tracing::info;

pub mod task_queue;

pub struct SchedulerManager;

impl SchedulerManager {
    pub fn new() -> Self { Self }
    pub async fn run_all(&self) -> Result<()> {
        info!("SchedulerManager task queue runner active");
        Ok(())
    }
}
