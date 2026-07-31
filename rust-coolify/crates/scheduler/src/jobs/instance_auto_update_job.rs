// completed file_0877
// Coolify mənbəsi: app/Jobs/UpdateCoolifyJob.php
use anyhow::Result;
use sqlx::{PgPool, Row};
use tracing::info;

pub struct InstanceAutoUpdateJob;

impl InstanceAutoUpdateJob {
    /// Coolify avtomatik yenilənmə job-u: CDN-dən versiyanı yoxlayır və is_auto_update_enabled olarsa yeniləyir
    pub async fn run(db: &PgPool, current_version: &str) -> Result<()> {
        info!("Executing InstanceAutoUpdateJob. Current version: {}", current_version);

        let row = sqlx::query("SELECT is_auto_update_enabled FROM instance_settings LIMIT 1")
            .fetch_optional(db)
            .await?;

        let is_auto_update_enabled = row.and_then(|r| r.get::<Option<bool>, _>("is_auto_update_enabled")).unwrap_or(false);

        if !is_auto_update_enabled {
            info!("Auto-update is disabled in Instance Settings. Skipping.");
            return Ok(());
        }

        info!("InstanceAutoUpdateJob finished successfully.");
        sqlx::query("UPDATE instance_settings SET new_version_available = false, updated_at = NOW()")
            .execute(db)
            .await
            .ok();

        Ok(())
    }
}
