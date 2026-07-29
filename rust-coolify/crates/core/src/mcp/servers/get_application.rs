// completed file_0812
// Coolify mənbəsi: app/Mcp/Tools/GetApplication.php
use anyhow::Result;
use serde_json::{json, Value};
use sqlx::PgPool;
use uuid::Uuid;

pub struct GetApplicationTool;

impl GetApplicationTool {
    pub async fn execute(db: &PgPool, application_uuid: Uuid) -> Result<Value> {
        let app = sqlx::query!(
            r#"
            SELECT uuid, name, fqdn, build_pack, git_repository, git_branch, status, updated_at
            FROM applications
            WHERE uuid = $1
            "#,
            application_uuid
        )
        .fetch_optional(db)
        .await?;

        if let Some(record) = app {
            Ok(json!({
                "uuid": record.uuid,
                "name": record.name,
                "fqdn": record.fqdn,
                "build_pack": record.build_pack,
                "git_repository": record.git_repository,
                "git_branch": record.git_branch,
                "status": record.status,
                "updated_at": record.updated_at
            }))
        } else {
            Ok(json!({"error": "Application not found"}))
        }
    }
}
