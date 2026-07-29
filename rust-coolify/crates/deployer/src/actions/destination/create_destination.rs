// completed file_0360
// Coolify mənbəsi: app/Actions/Destination/CreateDestination.php
use anyhow::Result;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;
use rc_core::ssh::client::SshClient;

pub struct CreateDestination;

impl CreateDestination {
    /// Serverdə yeni Docker standalone şəbəkəsi (destination) yaradır və DB-də saxlayır
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        network_name: &str,
        ssh_client: Option<&SshClient>,
    ) -> Result<Uuid> {
        info!("Creating Docker destination network {} on server {}", network_name, server_uuid);

        let cmd = format!("docker network create --attachable {} 2>/dev/null || true", network_name);

        if let Some(ssh) = ssh_client {
            ssh.execute_cmd(&cmd).await?;
        } else {
            std::process::Command::new("sh").arg("-c").arg(&cmd).output()?;
        }

        let dest_uuid = Uuid::new_v4();

        sqlx::query!(
            r#"
            INSERT INTO standalone_dockers (uuid, name, network, server_id, created_at, updated_at)
            VALUES ($1, $2, $3, (SELECT id FROM servers WHERE uuid = $4 LIMIT 1), NOW(), NOW())
            "#,
            dest_uuid,
            network_name,
            network_name,
            server_uuid
        )
        .execute(db)
        .await?;

        info!("Destination network {} created with uuid={}", network_name, dest_uuid);
        Ok(dest_uuid)
    }
}
