// completed file_0365
// Coolify mənbəsi: app/Actions/Database/StartPostgresql.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use uuid::Uuid;
use rc_core::ssh::client::SshClient;

pub async fn start_postgresql(db: &PgPool, database_uuid: Uuid) -> Result<()> {
    tracing::info!("Starting PostgreSQL database {}", database_uuid);

    // 1. PostgreSQL məlumatlarını DB-dən çəkirik
    let pg = sqlx::query!(
        r#"
        SELECT uuid, name, postgres_user, postgres_password, postgres_db, image, ports_mappings, is_public, public_port
        FROM standalone_postgresqls
        WHERE uuid = $1
        "#,
        database_uuid
    )
    .fetch_one(db)
    .await?;

    let container_name = format!("postgres-{}", &pg.uuid.to_string()[..8]);
    let image = pg.image.unwrap_or_else(|| "postgres:16-alpine".to_string());
    let user = pg.postgres_user.unwrap_or_else(|| "postgres".to_string());
    let password = pg.postgres_password.unwrap_or_else(|| "password".to_string());
    let db_name = pg.postgres_db.unwrap_or_else(|| "postgres".to_string());

    // 2. Dynamic docker compose generasiya edirik
    let compose_content = format!(
        r#"
version: '3.8'
services:
  {}:
    image: {}
    container_name: {}
    restart: unless-stopped
    environment:
      POSTGRES_USER: "{}"
      POSTGRES_PASSWORD: "{}"
      POSTGRES_DB: "{}"
    volumes:
      - {}_data:/var/lib/postgresql/data
    networks:
      - coolify
volumes:
  {}_data:
    name: {}_data
networks:
  coolify:
    external: true
"#,
        container_name, image, container_name, user, password, db_name, container_name, container_name, container_name
    );

    let config_dir = format!("/var/coolify/databases/{}", pg.uuid);
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

    // 3. Əmri SSH və ya local process ilə icra edirik
    let output = std::process::Command::new("sh")
        .arg("-c")
        .arg(&cmd)
        .output()?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(anyhow!("Failed to start PostgreSQL container: {}", stderr));
    }

    // 4. Statusu bazada 'running' olaraq yeniləyirik
    sqlx::query!(
        r#"
        UPDATE standalone_postgresqls
        SET updated_at = NOW()
        WHERE uuid = $1
        "#,
        database_uuid
    )
    .execute(db)
    .await?;

    tracing::info!("PostgreSQL database {} started successfully as container {}", database_uuid, container_name);
    Ok(())
}
