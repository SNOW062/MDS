// completed file_0816
// Coolify mənbəsi: app/Mcp/Tools/GetService.php
use anyhow::Result;
use serde_json::{json, Value};
use sqlx::PgPool;
use uuid::Uuid;

pub struct GetServiceTool;

impl GetServiceTool {
    pub async fn execute(db: &PgPool, service_uuid: Uuid) -> Result<Value> {
        let service = sqlx::query!(
            r#"
            SELECT uuid, name, docker_compose_raw, status, updated_at
            FROM services
            WHERE uuid = $1
            "#,
            service_uuid
        )
        .fetch_optional(db)
        .await?;

        if let Some(record) = service {
            Ok(json!({
                "uuid": record.uuid,
                "name": record.name,
                "status": record.status,
                "updated_at": record.updated_at
            }))
        } else {
            Ok(json!({"error": "Service stack not found"}))
        }
    }
}
