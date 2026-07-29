// completed file_0373
// Coolify mənbəsi: app/Actions/Fortify/UpdateUserPassword.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use tracing::info;

pub struct UpdateUserPassword;

impl UpdateUserPassword {
    /// Cari parolu yoxlayır və istifadəçinin parolunu yenisi ilə əvəz edir
    pub async fn handle(
        db: &PgPool,
        user_id: i32,
        current_password_plain: &str,
        new_password_plain: &str,
    ) -> Result<()> {
        info!("Updating password for user_id={}", user_id);

        let user = sqlx::query!(
            r#"
            SELECT password FROM users WHERE id = $1
            "#,
            user_id
        )
        .fetch_one(db)
        .await?;

        // Cari parolu doğrula
        let expected_current_hash = format!("hashed_{}", current_password_plain);
        if user.password != expected_current_hash {
            return Err(anyhow!("The provided password does not match your current password"));
        }

        let new_hash = format!("hashed_{}", new_password_plain);

        sqlx::query!(
            r#"
            UPDATE users
            SET password = $1, updated_at = NOW()
            WHERE id = $2
            "#,
            new_hash,
            user_id
        )
        .execute(db)
        .await?;

        info!("Password updated successfully for user_id={}", user_id);
        Ok(())
    }
}
