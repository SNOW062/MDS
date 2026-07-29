// completed file_0358
// Coolify mənbəsi: app/Actions/Database/StartDatabase.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use uuid::Uuid;

use crate::actions::database::start_postgresql::start_postgresql;
use crate::actions::database::start_mysql::start_mysql;
use crate::actions::database::start_redis::start_redis;
use crate::actions::database::start_mongodb::start_mongodb;

pub async fn start_database(db: &PgPool, database_uuid: Uuid, database_type: &str) -> Result<()> {
    tracing::info!("Starting database {} of type {}", database_uuid, database_type);

    match database_type.to_lowercase().as_str() {
        "postgresql" | "postgres" => {
            start_postgresql(db, database_uuid).await?;
        }
        "mysql" => {
            start_mysql(db, database_uuid).await?;
        }
        "redis" => {
            start_redis(db, database_uuid).await?;
        }
        "mongodb" | "mongo" => {
            start_mongodb(db, database_uuid).await?;
        }
        _ => {
            return Err(anyhow!("Unsupported database type for start: {}", database_type));
        }
    }

    tracing::info!("Database {} started successfully", database_uuid);
    Ok(())
}
