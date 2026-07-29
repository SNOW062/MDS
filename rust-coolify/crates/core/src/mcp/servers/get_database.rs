// completed file_0813
// Coolify mənbəsi: app/Mcp/Tools/GetDatabase.php
use anyhow::Result;
use serde_json::{json, Value};
use sqlx::PgPool;
use uuid::Uuid;

pub struct GetDatabaseTool;

impl GetDatabaseTool {
    pub async fn execute(db: &PgPool, database_uuid: Uuid) -> Result<Value> {
        let db_record = sqlx::query!(
            r#"
            SELECT uuid, name, postgres_user, postgres_db, is_public, public_port, status
            FROM standalone_postgresqls
            WHERE uuid = $1
            "#,
            database_uuid
        )
        .fetch_optional(db)
        .await?;

        if let Some(record) = db_record {
            Ok(json!({
                "uuid": record.uuid,
                "name": record.name,
                "user": record.postgres_user,
                "database_name": record.postgres_db,
                "is_public": record.is_public,
                "public_port": record.public_port,
                "status": record.status
            }))
        } else {
            Ok(json!({"error": "Database not found"}))
        }
    }
}
