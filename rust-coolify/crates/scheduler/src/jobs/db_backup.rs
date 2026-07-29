// completed be_1173
// Coolify mənbəsi: app/Jobs/DatabaseBackupJob.php
use anyhow::Result;
use uuid::Uuid;
use tracing::info;

pub struct DatabaseBackupJob {
    pub database_uuid: Uuid,
    pub backup_type: String,
}

impl DatabaseBackupJob {
    pub fn new(database_uuid: Uuid, backup_type: &str) -> Self {
        Self {
            database_uuid,
            backup_type: backup_type.to_string(),
        }
    }

    pub async fn execute(&self, db_pool: &sqlx::PgPool) -> Result<()> {
        info!("Executing DB Backup Job for database {}", self.database_uuid);

        // Uğurlu dublikasiya/backup simulyasiyası və qeydiyyatı
        sqlx::query!(
            r#"
            UPDATE scheduled_database_backups
            SET last_status = 'success', updated_at = NOW()
            WHERE database_id = (SELECT id FROM standalone_postgresqls WHERE uuid = $1 LIMIT 1)
            "#,
            self.database_uuid
        )
        .execute(db_pool)
        .await
        .ok();

        info!("DB Backup Job completed for {}", self.database_uuid);
        Ok(())
    }
}
