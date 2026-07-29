// completed file_0940
// Coolify mənbəsi: app/Policies/ServerPolicy.php
use sqlx::PgPool;
use uuid::Uuid;

pub struct ServerPolicy;

impl ServerPolicy {
    /// İstifadəçinin müəyyən serveri görmək hüququnun olub-olmadığını yoxlayır
    pub async fn can_view(db: &PgPool, user_id: i32, server_uuid: Uuid) -> bool {
        let count: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*) FROM servers s
            JOIN team_user tu ON tu.team_id = s.team_id
            WHERE s.uuid = $1 AND tu.user_id = $2
            "#,
            server_uuid,
            user_id
        )
        .fetch_one(db)
        .await
        .unwrap_or(Some(0))
        .unwrap_or(0);

        count > 0
    }

    /// İstifadəçinin serveri idarə etmək (Proxy start/stop, Sentinel, Server delete) hüququnun (Admin/Owner) olub-olmadığını yoxlayır
    pub async fn can_manage(db: &PgPool, user_id: i32, server_uuid: Uuid) -> bool {
        let count: i64 = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*) FROM servers s
            JOIN team_user tu ON tu.team_id = s.team_id
            WHERE s.uuid = $1 AND tu.user_id = $2 AND tu.role IN ('owner', 'admin')
            "#,
            server_uuid,
            user_id
        )
        .fetch_one(db)
        .await
        .unwrap_or(Some(0))
        .unwrap_or(0);

        count > 0
    }
}
