// completed file_0413
// Coolify mənbəsi: app/Actions/User/DeleteUserServers.php
use anyhow::Result;
use sqlx::PgPool;
use tracing::info;

pub struct DeleteUserServers;

impl DeleteUserServers {
    /// İstifadəçinin komandalarına aid olan bütün serverləri silir (Server 0 - Coolify Host mühafizə olunur)
    pub async fn handle(
        db: &PgPool,
        user_id: i32,
        is_dry_run: bool,
    ) -> Result<u64> {
        info!("Processing DeleteUserServers for user_id={} (dry_run: {})", user_id, is_dry_run);

        if is_dry_run {
            return Ok(0);
        }

        // Server ID 0 (Coolify Host) silinməməlidir
        let rows_affected = sqlx::query!(
            r#"
            DELETE FROM servers
            WHERE id != 0 AND team_id IN (
                SELECT team_id FROM team_user WHERE user_id = $1 AND role IN ('owner', 'admin')
            )
            "#,
            user_id
        )
        .execute(db)
        .await?
        .rows_affected();

        info!("Deleted {} servers for user_id={}", rows_affected, user_id);
        Ok(rows_affected)
    }
}
