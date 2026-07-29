// completed file_0350
// Coolify mənbəsi: app/Actions/Application/GenerateConfig.php
use anyhow::Result;
use serde_json::json;
use uuid::Uuid;
use sqlx::PgPool;

pub struct GenerateConfig;

impl GenerateConfig {
    /// Application konfiqurasiyasını (Docker Compose / Environment variables) generasiya edir
    pub async fn handle(db: &PgPool, application_uuid: Uuid, is_json: bool) -> Result<String> {
        let app = sqlx::query!(
            r#"
            SELECT name, fqdn, build_pack, ports_exposes, base_directory, dockerfile
            FROM applications
            WHERE uuid = $1
            "#,
            application_uuid
        )
        .fetch_one(db)
        .await?;

        let envs = sqlx::query!(
            r#"
            SELECT key, value
            FROM environment_variables
            WHERE applicationable_id = (SELECT id FROM applications WHERE uuid = $1 LIMIT 1)
            "#,
            application_uuid
        )
        .fetch_all(db)
        .await?;

        let env_map: std::collections::HashMap<String, String> = envs
            .into_iter()
            .map(|e| (e.key, e.value.unwrap_or_default()))
            .collect();

        if is_json {
            let config_json = json!({
                "name": app.name,
                "fqdn": app.fqdn,
                "build_pack": app.build_pack,
                "ports_exposes": app.ports_exposes,
                "base_directory": app.base_directory,
                "env": env_map
            });
            Ok(serde_json::to_string_pretty(&config_json)?)
        } else {
            let mut yaml = format!("version: '3.8'\nservices:\n  {}:\n", app.name);
            if let Some(ports) = app.ports_exposes {
                yaml.push_str(&format!("    ports:\n      - '{}:{}'\n", ports, ports));
            }
            if !env_map.is_empty() {
                yaml.push_str("    environment:\n");
                for (k, v) in env_map {
                    yaml.push_str(&format!("      - {}={}\n", k, v));
                }
            }
            Ok(yaml)
        }
    }
}
