// completed file_0868
// Coolify Scheduler Jobs Manager & Dispatcher
pub mod application_deployment_job;
pub mod database_backup_job;
pub mod server_check_job;
pub mod docker_cleanup_job;
pub mod container_status_job;
pub mod instance_auto_update_job;
pub mod scheduled_task_job;
pub mod check_licenses_job;
pub mod pull_helper_image_job;
pub mod prune_stale_deployments_job;

use anyhow::Result;
use sqlx::PgPool;
use tracing::{info, error};
use uuid::Uuid;
use rc_core::ssh::client::SshClient;

pub struct JobDispatcher;

impl JobDispatcher {
    /// Serverlərin dövri yoxlanış job-unu tetikləyir
    pub async fn dispatch_server_check(db: &PgPool, server_uuid: Uuid, ssh_client: &SshClient) -> Result<()> {
        info!("Dispatching ServerCheckJob for server {}", server_uuid);
        server_check_job::ServerCheckJob::run(db, server_uuid, ssh_client).await
    }

    /// Verilənlər bazasının avtomatik backup job-unu tetikləyir
    pub async fn dispatch_database_backup(
        db: &PgPool,
        backup_id: i32,
        database_uuid: Uuid,
        db_type: &str,
        db_user: &str,
        db_name: &str,
        ssh_client: &SshClient,
        s3_bucket: Option<&str>,
    ) -> Result<()> {
        info!("Dispatching DatabaseBackupJob for database {}", database_uuid);
        database_backup_job::DatabaseBackupJob::run(
            db,
            backup_id,
            database_uuid,
            db_type,
            db_user,
            db_name,
            ssh_client,
            s3_bucket,
        )
        .await
    }

    /// Docker təmizlik (prune) job-unu tetikləyir
    pub async fn dispatch_docker_cleanup(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
        cleanup_volumes: bool,
    ) -> Result<String> {
        info!("Dispatching DockerCleanupJob for server {}", server_uuid);
        docker_cleanup_job::DockerCleanupJob::run(db, server_uuid, ssh_client, cleanup_volumes).await
    }

    /// Coolify avtomatik yenilənmə job-unu tetikləyir
    pub async fn dispatch_instance_update(db: &PgPool, current_version: &str) -> Result<()> {
        info!("Dispatching InstanceAutoUpdateJob");
        instance_auto_update_job::InstanceAutoUpdateJob::run(db, current_version).await
    }

    /// Tətbiq daxili istifadəçi Cron tapşırığını tetikləyir
    pub async fn dispatch_scheduled_task(
        db: &PgPool,
        task_id: i32,
        command: &str,
        container_name: &str,
        ssh_client: &SshClient,
    ) -> Result<()> {
        info!("Dispatching ScheduledTaskJob for task_id={}", task_id);
        scheduled_task_job::ScheduledTaskJob::run(db, task_id, command, container_name, ssh_client).await
    }

    /// İlişib qalmış stale deployment-ləri təmizləyir
    pub async fn dispatch_prune_stale_deployments(db: &PgPool) -> Result<u64> {
        info!("Dispatching PruneStaleDeploymentsJob");
        prune_stale_deployments_job::PruneStaleDeploymentsJob::run(db).await
    }

    /// Coolify Helper Image yeniləyir
    pub async fn dispatch_pull_helper_image(db: &PgPool, ssh_client: &SshClient) -> Result<()> {
        info!("Dispatching PullHelperImageJob");
        pull_helper_image_job::PullHelperImageJob::run(db, ssh_client).await
    }
}
