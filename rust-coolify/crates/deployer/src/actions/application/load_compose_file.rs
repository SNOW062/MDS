// completed file_0352
// Coolify mənbəsi: app/Actions/Application/LoadComposeFile.php
use anyhow::{Result, anyhow};
use serde_yaml::Value;
use sqlx::{PgPool, Row};
use uuid::Uuid;

pub struct LoadComposeFile;

impl LoadComposeFile {
    /// Application üçün docker_compose_raw faylını yükləyir, YAML kimi parse edir və verilənlər bazasında yeniləyir
    pub async fn handle(db: &PgPool, application_uuid: Uuid) -> Result<Value> {
        let app_row = sqlx::query(
            r#"
            SELECT docker_compose_raw, docker_compose_location
            FROM applications
            WHERE uuid = $1
            "#,
        )
        .bind(application_uuid)
        .fetch_one(db)
        .await?;

        let docker_compose_raw: Option<String> = app_row.get("docker_compose_raw");

        let compose_content = docker_compose_raw
            .ok_or_else(|| anyhow!("Docker compose raw content is missing for application {}", application_uuid))?;

        // YAML tərkibini doğrula və parse et
        let parsed_yaml: Value = serde_yaml::from_str(&compose_content)
            .map_err(|e| anyhow!("Failed to parse Docker Compose YAML: {}", e))?;

        // Uğurlu yükləndiyini bazada update et
        sqlx::query(
            r#"
            UPDATE applications
            SET updated_at = NOW()
            WHERE uuid = $1
            "#,
        )
        .bind(application_uuid)
        .execute(db)
        .await?;

        tracing::info!("Docker compose file successfully loaded for application {}", application_uuid);
        Ok(parsed_yaml)
    }
}
