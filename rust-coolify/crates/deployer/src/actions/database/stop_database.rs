// completed file_0367
// Coolify mənbəsi: app/Actions/Database/StopDatabase.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use uuid::Uuid;

pub async fn stop_database(db: &PgPool, database_uuid: Uuid, database_type: &str) -> Result<()> {
    tracing::info!("Stopping database {} of type {}", database_uuid, database_type);

    let prefix = match database_type.to_lowercase().as_str() {
        "postgresql" | "postgres" => "postgres",
        "mysql" => "mysql",
        "redis" => "redis",
        "mongodb" | "mongo" => "mongo",
        "mariadb" => "mariadb",
        "keydb" => "keydb",
        "dragonfly" => "dragonfly",
        "clickhouse" => "clickhouse",
        _ => "db",
    };

    let container_name = format!("{}-{}", prefix, &database_uuid.to_string()[..8]);

    // Docker stop və rm əmrini icra edirik
    let cmd = format!(
        "docker stop -t 30 {} 2>/dev/null || true && docker rm -f {} 2>/dev/null || true",
        container_name, container_name
    );

    let output = std::process::Command::new("sh")
        .arg("-c")
        .arg(&cmd)
        .output()?;

    if !output.status.success() {
        tracing::warn!("Non-zero exit code while stopping database container {}", container_name);
    }

    // Statusu bazada yeniləyirik
    let table_name = match database_type.to_lowercase().as_str() {
        "postgresql" | "postgres" => "standalone_postgresqls",
        "mysql" => "standalone_mysqls",
        "redis" => "standalone_redis",
        "mongodb" | "mongo" => "standalone_mongodbs",
        "mariadb" => "standalone_mariadbs",
        "keydb" => "standalone_keydbs",
        "dragonfly" => "standalone_dragonflies",
        "clickhouse" => "standalone_clickhouses",
        _ => return Err(anyhow!("Unsupported database table type: {}", database_type)),
    };

    let query_str = format!("UPDATE {} SET updated_at = NOW() WHERE uuid = $1", table_name);
    sqlx::query(&query_str)
        .bind(database_uuid)
        .execute(db)
        .await?;

    tracing::info!("Database container {} stopped and removed successfully", container_name);
    Ok(())
}
