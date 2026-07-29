// completed file_0400
// Coolify mənbəsi: app/Actions/Service/StartService.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use uuid::Uuid;
use rc_core::ssh::client::SshClient;

pub struct StartService;

impl StartService {
    /// Bütöv kompleks servisi (məsələn: Supabase, Pocketbase, Appwrite və s. qrup konteynerləri) işə salır
    pub async fn handle(
        db: &PgPool,
        service_uuid: Uuid,
        pull_latest_images: bool,
        ssh_client: Option<&SshClient>,
    ) -> Result<()> {
        tracing::info!("Starting full service {}", service_uuid);

        let workdir = format!("/var/coolify/services/{}", service_uuid);
        let compose_file = format!("{}/docker-compose.yml", workdir);
        let project_name = format!("srv-{}", &service_uuid.to_string()[..8]);

        let mut commands = vec![
            format!("mkdir -p {}", workdir),
            format!("touch {}/.env", workdir),
        ];

        if pull_latest_images {
            commands.push(format!("docker compose --project-directory {} pull", workdir));
        }

        // Dedicated network yaradılır
        commands.push(format!(
            "docker network inspect {} >/dev/null 2>&1 || docker network create --attachable {}",
            project_name, project_name
        ));

        // Docker compose up command
        commands.push(format!(
            "docker compose --project-directory {} -f {} --project-name {} up -d --remove-orphans --force-recreate --build",
            workdir, compose_file, project_name
        ));

        // Network connect coolify-proxy
        commands.push(format!(
            "docker network connect {} coolify-proxy 2>/dev/null || true",
            project_name
        ));

        let full_script = commands.join(" && ");
        tracing::info!("Executing StartService Command: {}", full_script);

        if let Some(ssh) = ssh_client {
            ssh.execute_cmd(&full_script).await?;
        } else {
            let output = std::process::Command::new("sh")
                .arg("-c")
                .arg(&full_script)
                .output()?;

            if !output.status.success() {
                let stderr = String::from_utf8_lossy(&output.stderr);
                return Err(anyhow!("Service start failed: {}", stderr));
            }
        }

        // Statusu bazada yeniləyirik
        sqlx::query!(
            r#"
            UPDATE services
            SET updated_at = NOW()
            WHERE uuid = $1
            "#,
            service_uuid
        )
        .execute(db)
        .await?;

        tracing::info!("Service {} started successfully", service_uuid);
        Ok(())
    }
}
