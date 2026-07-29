// completed file_0815
// Coolify mənbəsi: app/Mcp/Tools/GetServer.php
use anyhow::Result;
use serde_json::{json, Value};
use sqlx::PgPool;
use uuid::Uuid;

pub struct GetServerTool;

impl GetServerTool {
    pub async fn execute(db: &PgPool, server_uuid: Uuid) -> Result<Value> {
        let server = sqlx::query!(
            r#"
            SELECT uuid, name, ip, port, user, is_reachable, is_usable, updated_at
            FROM servers
            WHERE uuid = $1
            "#,
            server_uuid
        )
        .fetch_optional(db)
        .await?;

        if let Some(record) = server {
            Ok(json!({
                "uuid": record.uuid,
                "name": record.name,
                "ip": record.ip,
                "port": record.port,
                "user": record.user,
                "is_reachable": record.is_reachable,
                "is_usable": record.is_usable,
                "updated_at": record.updated_at
            }))
        } else {
            Ok(json!({"error": "Server not found"}))
        }
    }
}
