// completed file_0374
// Coolify mənbəsi: app/Actions/Fortify/UpdateUserProfileInformation.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use tracing::info;

pub struct UpdateUserProfileInformation;

impl UpdateUserProfileInformation {
    /// İstifadəçinin profil məlumatlarını (ad və unikal e-poçt ünvanı) yeniləyir
    pub async fn handle(
        db: &PgPool,
        user_id: i32,
        new_name: &str,
        new_email: &str,
    ) -> Result<()> {
        info!("Updating profile information for user_id={}", user_id);

        // 1. Email unukallığını yoxlayırıq (başqa istifadəçidə olmamalıdır)
        let email_exists: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*) FROM users
            WHERE email = $1 AND id != $2
            "#,
            new_email,
            user_id
        )
        .fetch_one(db)
        .await?
        .unwrap_or(0);

        if email_exists > 0 {
            return Err(anyhow!("The email address {} is already in use", new_email));
        }

        // 2. Profil məlumatlarını yeniləyirik
        sqlx::query!(
            r#"
            UPDATE users
            SET name = $1, email = $2, updated_at = NOW()
            WHERE id = $3
            "#,
            new_name,
            new_email,
            user_id
        )
        .execute(db)
        .await?;

        info!("Profile information updated successfully for user_id={}", user_id);
        Ok(())
    }
}
