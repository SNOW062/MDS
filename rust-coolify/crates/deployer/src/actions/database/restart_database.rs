// completed file_0356
// Coolify mənbəsi: app/Actions/Database/RestartDatabase.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use uuid::Uuid;
use crate::actions::database::stop_database::stop_database;
use crate::actions::database::start_database::start_database;

pub struct RestartDatabase;

impl RestartDatabase {
    /// Hər hansı növdən olan verilənlər bazasını (PostgreSQL, MySQL, Redis, MongoDB və s.) dayandırır və yenidən başladır
    pub async fn handle(db: &PgPool, database_uuid: Uuid, database_type: &str) -> Result<()> {
        tracing::info!("Restarting database {} of type {}", database_uuid, database_type);

        // 1. Əvvəlcə bazanı dayandır (Stop)
        if let Err(e) = stop_database(db, database_uuid, database_type).await {
            tracing::warn!("Failed to stop database {} cleanly during restart: {}", database_uuid, e);
        }

        // 2. Yenidən başlat (Start)
        start_database(db, database_uuid, database_type).await?;

        // 3. Bazada statusu güncəllə
        let table_name = match database_type.to_lowercase().as_str() {
            "postgresql" | "postgres" => "standalone_postgresqls",
            "mysql" => "standalone_mysqls",
            "redis" => "standalone_redis",
            "mongodb" | "mongo" => "standalone_mongodbs",
            "mariadb" => "standalone_mariadbs",
            "keydb" => "standalone_keydbs",
            "dragonfly" => "standalone_dragonflies",
            "clickhouse" => "standalone_clickhouses",
            _ => return Err(anyhow!("Unsupported database type: {}", database_type)),
        };

        let query_str = format!("UPDATE {} SET status = 'running', updated_at = NOW() WHERE uuid = $1", table_name);
        sqlx::query(&query_str)
            .bind(database_uuid)
            .execute(db)
            .await?;

        tracing::info!("Database {} restarted successfully", database_uuid);
        Ok(())
    }
}
