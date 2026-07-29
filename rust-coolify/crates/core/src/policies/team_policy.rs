// completed file_0946
// Coolify mənbəsi: app/Policies/TeamPolicy.php
use sqlx::PgPool;

pub struct TeamPolicy;

impl TeamPolicy {
    /// İstifadəçinin komandada üzv olub-olmadığını yoxlayır
    pub async fn is_member(db: &PgPool, user_id: i32, team_id: i32) -> bool {
        let count: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*) FROM team_user
            WHERE user_id = $1 AND team_id = $2
            "#,
            user_id,
            team_id
        )
        .fetch_one(db)
        .await
        .unwrap_or(Some(0))
        .unwrap_or(0);

        count > 0
    }

    /// İstifadəçinin komandada Owner/Admin olub-olmadığını yoxlayır
    pub async fn is_admin_or_owner(db: &PgPool, user_id: i32, team_id: i32) -> bool {
        let count: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*) FROM team_user
            WHERE user_id = $1 AND team_id = $2 AND role IN ('owner', 'admin')
            "#,
            user_id,
            team_id
        )
        .fetch_one(db)
        .await
        .unwrap_or(Some(0))
        .unwrap_or(0);

        count > 0
    }
}
