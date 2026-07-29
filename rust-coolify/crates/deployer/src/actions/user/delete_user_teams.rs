// completed file_0414
// Coolify mənbəsi: app/Actions/User/DeleteUserTeams.php
use anyhow::Result;
use sqlx::PgPool;
use tracing::info;

pub struct DeleteUserTeamsResult {
    pub teams_deleted: u64,
    pub teams_left: u64,
}

pub struct DeleteUserTeams;

impl DeleteUserTeams {
    /// İstifadəçiyə aid komandaları silir və ya istifadəçini üzv olduğu komandalardan çıxarır
    pub async fn handle(
        db: &PgPool,
        user_id: i32,
        is_dry_run: bool,
    ) -> Result<DeleteUserTeamsResult> {
        info!("Processing DeleteUserTeams for user_id={} (dry_run: {})", user_id, is_dry_run);

        if is_dry_run {
            return Ok(DeleteUserTeamsResult {
                teams_deleted: 0,
                teams_left: 0,
            });
        }

        let mut tx = db.begin().await?;

        // 1. İstifadəçinin tək üzvü olduğu komandaları tapıb silirik (Team 0 qorunur)
        let deleted_count = sqlx::query!(
            r#"
            DELETE FROM teams
            WHERE id != 0 AND id IN (
                SELECT team_id FROM team_user
                GROUP BY team_id
                HAVING COUNT(user_id) = 1 AND MAX(user_id) = $1
            )
            "#,
            user_id
        )
        .execute(&mut *tx)
        .await?
        .rows_affected();

        // 2. İstifadəçini digər çoxüzvlü komandalardan çıxarırıq
        let left_count = sqlx::query!(
            r#"
            DELETE FROM team_user
            WHERE user_id = $1
            "#,
            user_id
        )
        .execute(&mut *tx)
        .await?
        .rows_affected();

        tx.commit().await?;

        info!("DeleteUserTeams completed: deleted={}, left={}", deleted_count, left_count);
        Ok(DeleteUserTeamsResult {
            teams_deleted: deleted_count,
            teams_left: left_count,
        })
    }
}
