// completed file_0939
// Coolify mənbəsi: app/Policies/ProjectPolicy.php
use sqlx::PgPool;
use uuid::Uuid;

pub struct ProjectPolicy;

impl ProjectPolicy {
    /// İstifadəçinin layihəni görmək hüququnun olub-olmadığını yoxlayır
    pub async fn can_view(db: &PgPool, user_id: i32, project_uuid: Uuid) -> bool {
        let count: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*) FROM projects p
            JOIN team_user tu ON tu.team_id = p.team_id
            WHERE p.uuid = $1 AND tu.user_id = $2
            "#,
            project_uuid,
            user_id
        )
        .fetch_one(db)
        .await
        .unwrap_or(Some(0))
        .unwrap_or(0);

        count > 0
    }

    /// İstifadəçinin layihəni idarə etmək/silmək hüququnun (Admin/Owner) olub-olmadığını yoxlayır
    pub async fn can_manage(db: &PgPool, user_id: i32, project_uuid: Uuid) -> bool {
        let count: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*) FROM projects p
            JOIN team_user tu ON tu.team_id = p.team_id
            WHERE p.uuid = $1 AND tu.user_id = $2 AND tu.role IN ('owner', 'admin')
            "#,
            project_uuid,
            user_id
        )
        .fetch_one(db)
        .await
        .unwrap_or(Some(0))
        .unwrap_or(0);

        count > 0
    }
}
