// completed file_0397
// Coolify mənbəsi: app/Actions/Service/DeployServiceApplication.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use uuid::Uuid;
use rc_core::ssh::client::SshClient;

pub struct DeployServiceApplication;

impl DeployServiceApplication {
    /// Bircə xidmət tətbiqini (ServiceApplication və ya ServiceDatabase) yenidən deploy edir və ya yeniləyir
    pub async fn handle(
        db: &PgPool,
        service_uuid: Uuid,
        service_name: &str,
        pull_latest: bool,
        force_rebuild: bool,
        ssh_client: Option<&SshClient>,
    ) -> Result<()> {
        tracing::info!("Deploying service application {} for service {}", service_name, service_uuid);

        let workdir = format!("/var/coolify/services/{}", service_uuid);
        let compose_file = format!("{}/docker-compose.yml", workdir);
        let project_name = format!("srv-{}", &service_uuid.to_string()[..8]);

        let mut commands = vec![
            format!("mkdir -p {}", workdir),
            format!("touch {}/.env", workdir),
        ];

        if pull_latest {
            commands.push(format!(
                "docker compose --project-directory {} -f {} --project-name {} pull {}",
                workdir, compose_file, project_name, service_name
            ));
        }

        // Docker network yaratmaq (əgər mövcud deyilsə)
        commands.push(format!(
            "docker network inspect {} >/dev/null 2>&1 || docker network create --attachable {}",
            project_name, project_name
        ));

        let mut up_cmd = format!(
            "docker compose --project-directory {} -f {} --project-name {} up -d --no-deps",
            workdir, compose_file, project_name
        );

        if force_rebuild {
            up_cmd.push_str(" --build");
        }
        up_cmd.push_str(&format!(" {}", service_name));
        commands.push(up_cmd);

        // coolify-proxy şəbəkəsinə bağlamaq
        commands.push(format!("docker network connect {} coolify-proxy 2>/dev/null || true", project_name));

        let full_script = commands.join(" && ");
        tracing::info!("Executing Service Deploy Command: {}", full_script);

        if let Some(ssh) = ssh_client {
            ssh.execute_cmd(&full_script).await?;
        } else {
            let output = std::process::Command::new("sh")
                .arg("-c")
                .arg(&full_script)
                .output()?;

            if !output.status.success() {
                let stderr = String::from_utf8_lossy(&output.stderr);
                return Err(anyhow!("Service application deployment failed: {}", stderr));
            }
        }

        // Statusu yeniləyirik
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

        tracing::info!("Service application {} deployed successfully", service_name);
        Ok(())
    }
}
