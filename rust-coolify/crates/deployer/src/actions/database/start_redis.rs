// completed file_0366
// Coolify mənbəsi: app/Actions/Database/StartRedis.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use uuid::Uuid;

pub async fn start_redis(db: &PgPool, database_uuid: Uuid) -> Result<()> {
    tracing::info!("Starting Redis database {}", database_uuid);

    let redis = sqlx::query!(
        r#"
        SELECT uuid, name, redis_password, image
        FROM standalone_redis
        WHERE uuid = $1
        "#,
        database_uuid
    )
    .fetch_one(db)
    .await?;

    let container_name = format!("redis-{}", &redis.uuid.to_string()[..8]);
    let image = redis.image.unwrap_or_else(|| "redis:7-alpine".to_string());
    let password = redis.redis_password.unwrap_or_else(|| "password".to_string());

    let compose_content = format!(
        r#"
version: '3.8'
services:
  {}:
    image: {}
    container_name: {}
    restart: unless-stopped
    command: redis-server --requirepass "{}"
    volumes:
      - {}_data:/data
    networks:
      - coolify
volumes:
  {}_data:
    name: {}_data
networks:
  coolify:
    external: true
"#,
        container_name, image, container_name, password, container_name, container_name, container_name
    );

    let config_dir = format!("/var/coolify/databases/{}", redis.uuid);
    let cmd = format!(
        r#"
        mkdir -p {} &&
        echo '{}' > {}/docker-compose.yml &&
        cd {} &&
        docker compose up -d --remove-orphans
        "#,
        config_dir,
        compose_content.replace('\'', "'\\''"),
        config_dir,
        config_dir
    );

    let output = std::process::Command::new("sh")
        .arg("-c")
        .arg(&cmd)
        .output()?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(anyhow!("Failed to start Redis container: {}", stderr));
    }

    sqlx::query!(
        r#"
        UPDATE standalone_redis
        SET updated_at = NOW()
        WHERE uuid = $1
        "#,
        database_uuid
    )
    .execute(db)
    .await?;

    tracing::info!("Redis database {} started successfully", database_uuid);
    Ok(())
}
