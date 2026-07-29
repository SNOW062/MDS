// completed file_0930
// Coolify mənbəsi: app/Policies/DatabasePolicy.php
use sqlx::PgPool;
use uuid::Uuid;

pub struct DatabasePolicy;

impl DatabasePolicy {
    /// İstifadəçinin müəyyən verilənlər bazasını görmək hüququnun olub-olmadığını yoxlayır
    pub async fn can_view(db: &PgPool, user_id: i32, database_uuid: Uuid) -> bool {
        let count: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*) FROM standalone_postgresqls db
            JOIN environments e ON e.id = db.environment_id
            JOIN projects p ON p.id = e.project_id
            JOIN team_user tu ON tu.team_id = p.team_id
            WHERE db.uuid = $1 AND tu.user_id = $2
            "#,
            database_uuid,
            user_id
        )
        .fetch_one(db)
        .await
        .unwrap_or(Some(0))
        .unwrap_or(0);

        count > 0
    }

    /// İstifadəçinin verilənlər bazasını dondurmaq/başlatmaq/silmək hüququnun (Admin/Owner) olub-olmadığını yoxlayır
    pub async fn can_manage(db: &PgPool, user_id: i32, database_uuid: Uuid) -> bool {
        let count: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*) FROM standalone_postgresqls db
            JOIN environments e ON e.id = db.environment_id
            JOIN projects p ON p.id = e.project_id
            JOIN team_user tu ON tu.team_id = p.team_id
            WHERE db.uuid = $1 AND tu.user_id = $2 AND tu.role IN ('owner', 'admin')
            "#,
            database_uuid,
            user_id
        )
        .fetch_one(db)
        .await
        .unwrap_or(Some(0))
        .unwrap_or(0);

        count > 0
    }
}
