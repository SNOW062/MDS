// completed file_0870
// Coolify mənbəsi: app/Jobs/DatabaseBackupJob.php
use anyhow::{Result, anyhow};
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::{info, error};
use uuid::Uuid;

pub struct DatabaseBackupJob;

impl DatabaseBackupJob {
    /// PostgreSQL/MySQL/MongoDB bazalarının avtomatik dökümünü (pg_dump/mysqldump) alır və S3-ə yükləyir
    pub async fn run(
        db: &PgPool,
        backup_id: i32,
        database_uuid: Uuid,
        db_type: &str,
        db_user: &str,
        db_name: &str,
        ssh_client: &SshClient,
        s3_bucket: Option<&str>,
    ) -> Result<()> {
        info!("Executing DatabaseBackupJob (id={}) for {} database {}", backup_id, db_type, database_uuid);

        let execution_uuid = Uuid::new_v4();
        let timestamp = chrono::Utc::now().format("%Y-%m-%d_%H-%M-%S").to_string();
        let backup_filename = format!("backup-{}-{}-{}.sql.gz", db_name, timestamp, &database_uuid.to_string()[..8]);
        let backup_dir = format!("/var/coolify/backups/{}", database_uuid);
        let backup_path = format!("{}/{}", backup_dir, backup_filename);

        // Backup Execution DB qeydi yaradırıq
        sqlx::query!(
            r#"
            INSERT INTO scheduled_database_backup_executions (uuid, scheduled_database_backup_id, status, filename, created_at, updated_at)
            VALUES ($1, $2, 'running', $3, NOW(), NOW())
            "#,
            execution_uuid,
            backup_id,
            backup_filename
        )
        .execute(db)
        .await?;

        // 1. Bazanın növlərinə əsasən dump əmri generasiya edirik
        let container_name = format!("db-{}", &database_uuid.to_string()[..8]);
        let dump_cmd = match db_type.to_lowercase().as_str() {
            "postgresql" | "postgres" => {
                format!(
                    "mkdir -p {} && docker exec {} pg_dump -U {} -d {} | gzip > {}",
                    backup_dir, container_name, db_user, db_name, backup_path
                )
            }
            "mysql" | "mariadb" => {
                format!(
                    "mkdir -p {} && docker exec {} mysqldump -u{} {} | gzip > {}",
                    backup_dir, container_name, db_user, db_name, backup_path
                )
            }
            "mongodb" | "mongo" => {
                format!(
                    "mkdir -p {} && docker exec {} mongodump --archive --gzip > {}",
                    backup_dir, container_name, backup_path
                )
            }
            _ => return Err(anyhow!("Unsupported database type for backup: {}", db_type)),
        };

        info!("Executing database dump command...");
        match ssh_client.execute_cmd(&dump_cmd).await {
            Ok(_) => {
                info!("Database backup completed successfully: {}", backup_path);

                // 2. Opsional S3 Upload
                if let Some(bucket) = s3_bucket {
                    info!("Uploading backup to S3 bucket: {}", bucket);
                    let s3_cmd = format!("aws s3 cp {} s3://{}/{}", backup_path, bucket, backup_filename);
                    ssh_client.execute_cmd(&s3_cmd).await.ok();
                }

                // Statusu success edirik
                sqlx::query!(
                    r#"
                    UPDATE scheduled_database_backup_executions
                    SET status = 'success', updated_at = NOW()
                    WHERE uuid = $1
                    "#,
                    execution_uuid
                )
                .execute(db)
                .await?;
            }
            Err(e) => {
                error!("Database backup failed: {}", e);

                sqlx::query!(
                    r#"
                    UPDATE scheduled_database_backup_executions
                    SET status = 'failed', message = $1, updated_at = NOW()
                    WHERE uuid = $2
                    "#,
                    e.to_string(),
                    execution_uuid
                )
                .execute(db)
                .await?;

                return Err(e);
            }
        }

        Ok(())
    }
}
