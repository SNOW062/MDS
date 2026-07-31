// completed file_0350
// Coolify mənbəsi: app/Actions/Application/GenerateConfig.php
use anyhow::Result;
use serde_json::json;
use uuid::Uuid;
use sqlx::{PgPool, Row};

pub struct GenerateConfig;

impl GenerateConfig {
    /// Application konfiqurasiyasını (Docker Compose / Environment variables) generasiya edir
    pub async fn handle(db: &PgPool, application_uuid: Uuid, is_json: bool) -> Result<String> {
        let app_row = sqlx::query(
            r#"
            SELECT name, fqdn, build_pack, ports_exposes, base_directory, dockerfile
            FROM applications
            WHERE uuid = $1
            "#,
        )
        .bind(application_uuid)
        .fetch_one(db)
        .await?;

        let name: String = app_row.get("name");
        let fqdn: Option<String> = app_row.get("fqdn");
        let build_pack: String = app_row.get("build_pack");
        let ports_exposes: Option<String> = app_row.get("ports_exposes");
        let base_directory: Option<String> = app_row.get("base_directory");

        let env_rows = sqlx::query(
            r#"
            SELECT key, value
            FROM environment_variables
            WHERE applicationable_id = (SELECT id FROM applications WHERE uuid = $1 LIMIT 1)
            "#,
        )
        .bind(application_uuid)
        .fetch_all(db)
        .await?;

        let mut env_map = std::collections::HashMap::new();
        for row in env_rows {
            let k: String = row.get("key");
            let v: Option<String> = row.get("value");
            env_map.insert(k, v.unwrap_or_default());
        }

        if is_json {
            let config_json = json!({
                "name": name,
                "fqdn": fqdn,
                "build_pack": build_pack,
                "ports_exposes": ports_exposes,
                "base_directory": base_directory,
                "env": env_map
            });
            Ok(serde_json::to_string_pretty(&config_json)?)
        } else {
            let mut yaml = format!("version: '3.8'\nservices:\n  {}:\n", name);
            if let Some(ports) = ports_exposes {
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
