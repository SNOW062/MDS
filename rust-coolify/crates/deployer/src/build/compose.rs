// completed be_1112
// Coolify mənbəsi: app/Actions/Application/LoadComposeFile.php & Docker Compose Build
use anyhow::{Result, anyhow};
use serde_yaml::Value;
use tracing::info;
use crate::engine::DeployContext;
use rc_core::ssh::client::SshClient;

pub struct DockerComposeBuilder<'a> {
    pub ctx: &'a DeployContext,
    pub ssh_client: Option<&'a SshClient>,
}

impl<'a> DockerComposeBuilder<'a> {
    pub fn new(ctx: &'a DeployContext, ssh_client: Option<&'a SshClient>) -> Self {
        Self { ctx, ssh_client }
    }

    /// Docker Compose proyekt adını generasiya edir
    pub fn project_name(&self) -> String {
        format!("app-{}", &self.ctx.application_uuid.to_string()[..8])
    }

    /// Docker Compose build əmrini hazırlayır
    pub fn generate_compose_build_cmd(&self, compose_file_path: &str) -> String {
        let proj = self.project_name();
        format!("docker compose -p {} -f {} build", proj, compose_file_path)
    }

    /// Docker Compose up əmrini hazırlayır
    pub fn generate_compose_up_cmd(&self, compose_file_path: &str) -> String {
        let proj = self.project_name();
        format!("docker compose -p {} -f {} up -d --remove-orphans", proj, compose_file_path)
    }

    pub async fn execute_deploy(&self, compose_file_path: &str) -> Result<String> {
        let build_cmd = self.generate_compose_build_cmd(compose_file_path);
        let up_cmd = self.generate_compose_up_cmd(compose_file_path);

        info!("Executing Docker Compose build: {}", build_cmd);

        if let Some(ssh) = self.ssh_client {
            ssh.execute_cmd(&build_cmd).await?;
            info!("Executing Docker Compose up: {}", up_cmd);
            ssh.execute_cmd(&up_cmd).await?;
        } else {
            let build_output = std::process::Command::new("sh").arg("-c").arg(&build_cmd).output()?;
            if !build_output.status.success() {
                return Err(anyhow!("Docker compose build failed: {}", String::from_utf8_lossy(&build_output.stderr)));
            }

            let up_output = std::process::Command::new("sh").arg("-c").arg(&up_cmd).output()?;
            if !up_output.status.success() {
                return Err(anyhow!("Docker compose up failed: {}", String::from_utf8_lossy(&up_output.stderr)));
            }
        }

        Ok(self.project_name())
    }
}

pub async fn build(ctx: &DeployContext) -> Result<String> {
    let builder = DockerComposeBuilder::new(ctx, None);
    let compose_file_path = format!("/var/coolify/applications/{}/docker-compose.yml", ctx.application_uuid);

    info!("Starting Docker Compose deployment for application {}", ctx.application_uuid);
    builder.execute_deploy(&compose_file_path).await
}

/// Compose faylının strukturunu yoxlamaq üçün yardımçı funksiya
pub fn parse_compose_content(raw: &str) -> Result<Value> {
    let parsed: Value = serde_yaml::from_str(raw)
        .map_err(|e| anyhow!("Invalid Docker Compose YAML: {}", e))?;
    Ok(parsed)
}
