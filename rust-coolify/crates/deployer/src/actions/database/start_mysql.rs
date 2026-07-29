// completed file_0364
// Coolify mənbəsi: app/Actions/Database/StartMysql.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use uuid::Uuid;

pub async fn start_mysql(db: &PgPool, database_uuid: Uuid) -> Result<()> {
    tracing::info!("Starting MySQL database {}", database_uuid);

    // 1. MySQL məlumatlarını DB-dən çəkirik
    let mysql = sqlx::query!(
        r#"
        SELECT uuid, name, mysql_user, mysql_password, mysql_database, mysql_root_password, image
        FROM standalone_mysqls
        WHERE uuid = $1
        "#,
        database_uuid
    )
    .fetch_one(db)
    .await?;

    let container_name = format!("mysql-{}", &mysql.uuid.to_string()[..8]);
    let image = mysql.image.unwrap_or_else(|| "mysql:8.0".to_string());
    let root_password = mysql.mysql_root_password.unwrap_or_else(|| "rootpassword".to_string());
    let user = mysql.mysql_user.unwrap_or_else(|| "mysql".to_string());
    let password = mysql.mysql_password.unwrap_or_else(|| "password".to_string());
    let db_name = mysql.mysql_database.unwrap_or_else(|| "mysql".to_string());

    // 2. Compose file hazırlayırıq
    let compose_content = format!(
        r#"
version: '3.8'
services:
  {}:
    image: {}
    container_name: {}
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: "{}"
      MYSQL_USER: "{}"
      MYSQL_PASSWORD: "{}"
      MYSQL_DATABASE: "{}"
    volumes:
      - {}_data:/var/lib/mysql
    networks:
      - coolify
volumes:
  {}_data:
    name: {}_data
networks:
  coolify:
    external: true
"#,
        container_name, image, container_name, root_password, user, password, db_name, container_name, container_name, container_name
    );

    let config_dir = format!("/var/coolify/databases/{}", mysql.uuid);
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
        return Err(anyhow!("Failed to start MySQL container: {}", stderr));
    }

    sqlx::query!(
        r#"
        UPDATE standalone_mysqls
        SET updated_at = NOW()
        WHERE uuid = $1
        "#,
        database_uuid
    )
    .execute(db)
    .await?;

    tracing::info!("MySQL database {} started successfully", database_uuid);
    Ok(())
}
