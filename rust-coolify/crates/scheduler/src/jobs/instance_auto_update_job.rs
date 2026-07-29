// completed file_0877
// Coolify mənbəsi: app/Jobs/UpdateCoolifyJob.php
use anyhow::Result;
use sqlx::PgPool;
use tracing::{info, warn};
use rc_deployer::actions::server::update_coolify::UpdateCoolify;

pub struct InstanceAutoUpdateJob;

impl InstanceAutoUpdateJob {
    /// Coolify avtomatik yenilənmə job-u: CDN-dən versiyanı yoxlayır və is_auto_update_enabled olarsa yeniləyir
    pub async fn run(db: &PgPool, current_version: &str) -> Result<()> {
        info!("Executing InstanceAutoUpdateJob. Current version: {}", current_version);

        let is_auto_update_enabled: bool = sqlx::query_scalar!(
            "SELECT is_auto_update_enabled FROM instance_settings LIMIT 1"
        )
        .fetch_one(db)
        .await
        .unwrap_or(Some(false))
        .unwrap_or(false);

        if !is_auto_update_enabled {
            info!("Auto-update is disabled in Instance Settings. Skipping.");
            return Ok(());
        }

        match UpdateCoolify::handle(current_version, false).await {
            Ok(new_ver) => {
                info!("InstanceAutoUpdateJob finished successfully. Upgraded to {}", new_ver);
                sqlx::query!(
                    "UPDATE instance_settings SET new_version_available = false, updated_at = NOW()"
                )
                .execute(db)
                .await
                .ok();
            }
            Err(e) => {
                warn!("InstanceAutoUpdateJob failed: {}", e);
            }
        }

        Ok(())
    }
}
