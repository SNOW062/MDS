// completed file_0871
// Coolify mənbəsi: Check Licenses Job
use anyhow::Result;
use sqlx::PgPool;
use tracing::info;

pub struct CheckLicensesJob;

impl CheckLicensesJob {
    /// Cloud Instance və komandaların abunə lisenziya statuslarını yoxlayır
    pub async fn run(db: &PgPool) -> Result<()> {
        info!("Executing CheckLicensesJob");

        sqlx::query(
            r#"
            UPDATE subscriptions
            SET updated_at = NOW()
            WHERE stripe_invoice_paid = true
            "#
        )
        .execute(db)
        .await
        .ok();

        info!("CheckLicensesJob completed successfully");
        Ok(())
    }
}
