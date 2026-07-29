// completed file_0925
// Coolify mənbəsi: app/Policies/ApplicationPolicy.php
use sqlx::PgPool;
use uuid::Uuid;

pub struct ApplicationPolicy;

impl ApplicationPolicy {
    /// İstifadəçinin müəyyən tətbiqə baxmaq hüququnun olub-olmadığını yoxlayır
    pub async fn can_view(db: &PgPool, user_id: i32, application_uuid: Uuid) -> bool {
        let count: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*) FROM applications a
            JOIN environments e ON e.id = a.environment_id
            JOIN projects p ON p.id = e.project_id
            JOIN team_user tu ON tu.team_id = p.team_id
            WHERE a.uuid = $1 AND tu.user_id = $2
            "#,
            application_uuid,
            user_id
        )
        .fetch_one(db)
        .await
        .unwrap_or(Some(0))
        .unwrap_or(0);

        count > 0
    }

    /// İstifadəçinin tətbiqi idarə etmək (deploy/update/delete) üçün Admin/Owner hüququnun olub-olmadığını yoxlayır
    pub async fn can_manage(db: &PgPool, user_id: i32, application_uuid: Uuid) -> bool {
        let count: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*) FROM applications a
            JOIN environments e ON e.id = a.environment_id
            JOIN projects p ON p.id = e.project_id
            JOIN team_user tu ON tu.team_id = p.team_id
            WHERE a.uuid = $1 AND tu.user_id = $2 AND tu.role IN ('owner', 'admin')
            "#,
            application_uuid,
            user_id
        )
        .fetch_one(db)
        .await
        .unwrap_or(Some(0))
        .unwrap_or(0);

        count > 0
    }
}
