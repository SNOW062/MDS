// completed file_0363
// Coolify mənbəsi: app/Actions/Database/StartMongodb.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use uuid::Uuid;

pub async fn start_mongodb(db: &PgPool, database_uuid: Uuid) -> Result<()> {
    tracing::info!("Starting MongoDB database {}", database_uuid);

    let mongo = sqlx::query!(
        r#"
        SELECT uuid, name, mongo_initdb_root_username, mongo_initdb_root_password, image
        FROM standalone_mongodbs
        WHERE uuid = $1
        "#,
        database_uuid
    )
    .fetch_one(db)
    .await?;

    let container_name = format!("mongo-{}", &mongo.uuid.to_string()[..8]);
    let image = mongo.image.unwrap_or_else(|| "mongo:7".to_string());
    let root_user = mongo.mongo_initdb_root_username.unwrap_or_else(|| "root".to_string());
    let root_password = mongo.mongo_initdb_root_password.unwrap_or_else(|| "password".to_string());

    let compose_content = format!(
        r#"
version: '3.8'
services:
  {}:
    image: {}
    container_name: {}
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: "{}"
      MONGO_INITDB_ROOT_PASSWORD: "{}"
    volumes:
      - {}_data:/data/db
    networks:
      - coolify
volumes:
  {}_data:
    name: {}_data
networks:
  coolify:
    external: true
"#,
        container_name, image, container_name, root_user, root_password, container_name, container_name, container_name
    );

    let config_dir = format!("/var/coolify/databases/{}", mongo.uuid);
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
        return Err(anyhow!("Failed to start MongoDB container: {}", stderr));
    }

    sqlx::query!(
        r#"
        UPDATE standalone_mongodbs
        SET updated_at = NOW()
        WHERE uuid = $1
        "#,
        database_uuid
    )
    .execute(db)
    .await?;

    tracing::info!("MongoDB database {} started successfully", database_uuid);
    Ok(())
}
