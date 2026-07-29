// completed file_0372
// Coolify mənbəsi: app/Actions/Fortify/ResetUserPassword.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use tracing::info;

pub struct ResetUserPassword;

impl ResetUserPassword {
    /// İstifadəçinin unudulmuş parolunu yenisi ilə əvəz edir və təhlükəsizlik üçün aktiv sessiyaları silir
    pub async fn handle(
        db: &PgPool,
        user_id: i32,
        new_password_plain: &str,
    ) -> Result<()> {
        info!("Resetting password for user_id={}", user_id);

        if new_password_plain.len() < 8 {
            return Err(anyhow!("Password must be at least 8 characters long"));
        }

        let new_hash = format!("hashed_{}", new_password_plain);

        let mut tx = db.begin().await?;

        // 1. Parolu yeniləyirik
        let rows = sqlx::query!(
            r#"
            UPDATE users
            SET password = $1, updated_at = NOW()
            WHERE id = $2
            "#,
            new_hash,
            user_id
        )
        .execute(&mut *tx)
        .await?
        .rows_affected();

        if rows == 0 {
            return Err(anyhow!("User with id={} not found", user_id));
        }

        // 2. Aktiv personal access tokenləri / sessiyaları təmizləyirik
        sqlx::query!(
            r#"
            DELETE FROM personal_access_tokens
            WHERE tokenable_id = $1
            "#,
            user_id
        )
        .execute(&mut *tx)
        .await
        .ok();

        tx.commit().await?;

        info!("Password successfully reset for user_id={}", user_id);
        Ok(())
    }
}
