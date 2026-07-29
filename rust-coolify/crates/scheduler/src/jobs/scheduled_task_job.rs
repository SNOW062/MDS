// completed file_0879
// Coolify mənbəsi: app/Jobs/ScheduledTaskJob.php
use anyhow::{Result, anyhow};
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use tracing::{info, error};
use uuid::Uuid;

pub struct ScheduledTaskJob;

impl ScheduledTaskJob {
    /// İstifadəçilərin qurduğu Cron tapşırığını (məsələn: `php artisan schedule:run`) tətbiq konteynerində icra edir
    pub async fn run(
        db: &PgPool,
        task_id: i32,
        command: &str,
        container_name: &str,
        ssh_client: &SshClient,
    ) -> Result<()> {
        info!("Executing ScheduledTaskJob (id={}) command='{}' in container={}", task_id, command, container_name);

        let execution_uuid = Uuid::new_v4();

        sqlx::query!(
            r#"
            INSERT INTO scheduled_task_executions (uuid, scheduled_task_id, status, created_at, updated_at)
            VALUES ($1, $2, 'running', NOW(), NOW())
            "#,
            execution_uuid,
            task_id
        )
        .execute(db)
        .await?;

        let exec_cmd = format!("docker exec {} sh -c '{}'", container_name, command.replace('\'', "'\\''"));

        match ssh_client.execute_cmd(&exec_cmd).await {
            Ok(output) => {
                info!("Scheduled task (id={}) executed successfully", task_id);

                sqlx::query!(
                    r#"
                    UPDATE scheduled_task_executions
                    SET status = 'success', message = $1, updated_at = NOW()
                    WHERE uuid = $2
                    "#,
                    output,
                    execution_uuid
                )
                .execute(db)
                .await?;
            }
            Err(e) => {
                error!("Scheduled task (id={}) failed: {}", task_id, e);

                sqlx::query!(
                    r#"
                    UPDATE scheduled_task_executions
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
