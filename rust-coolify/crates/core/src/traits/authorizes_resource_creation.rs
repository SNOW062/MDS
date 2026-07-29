// completed file_0990
// Coolify mənbəsi: app/Traits/AuthorizesResourceCreation.php
use sqlx::PgPool;

pub struct AuthorizesResourceCreation;

impl AuthorizesResourceCreation {
    /// İstifadəçinin yeni resurs (App, DB, Server) yaratmaq hüququnun olub-olmadığını yoxlayır
    pub async fn authorize(db: &PgPool, user_id: i32, team_id: i32) -> bool {
        let is_owner_or_admin: Result<i64, _> = sqlx::query_scalar(
            "SELECT COUNT(*) FROM team_user WHERE user_id = $1 AND team_id = $2 AND role IN ('owner', 'admin')"
        )
        .bind(user_id)
        .bind(team_id)
        .fetch_one(db)
        .await;

        match is_owner_or_admin {
            Ok(count) => count > 0,
            Err(_) => false,
        }
    }
}
