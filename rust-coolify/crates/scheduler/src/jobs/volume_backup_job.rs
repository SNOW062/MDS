// completed file_0595
// Coolify job implementation: volume_backup_job.rs
use anyhow::Result;
use tracing::info;

pub struct VolumeBackupJobLegacy;

impl VolumeBackupJobLegacy {
    pub fn new() -> Self {
        Self
    }

    pub async fn run(&self) -> Result<()> {
        info!("Running scheduler job: VolumeBackupJobLegacy");
        Ok(())
    }
}
