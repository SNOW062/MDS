// completed be_1114
// Coolify mənbəsi: app/Jobs/ApplicationDeploymentJob.php -> Dockerfile Build
use anyhow::{Result, anyhow};
use std::collections::HashMap;
use tracing::info;
use crate::engine::DeployContext;
use rc_core::ssh::client::SshClient;

pub struct DockerfileBuilder<'a> {
    pub ctx: &'a DeployContext,
    pub ssh_client: Option<&'a SshClient>,
    pub build_args: HashMap<String, String>,
}

impl<'a> DockerfileBuilder<'a> {
    pub fn new(ctx: &'a DeployContext, ssh_client: Option<&'a SshClient>) -> Self {
        Self {
            ctx,
            ssh_client,
            build_args: HashMap::new(),
        }
    }

    pub fn add_build_arg(&mut self, key: &str, value: &str) {
        self.build_args.insert(key.to_string(), value.to_string());
    }

    /// Docker buildx / docker build əmrini generasiya edir
    pub fn generate_build_command(&self, context_path: &str, dockerfile_path: &str, image_tag: &str) -> String {
        let mut build_arg_flags = String::new();
        for (k, v) in &self.build_args {
            build_arg_flags.push_str(&format!(" --build-arg {}='{}'", k, v.replace('\'', "'\\''")));
        }

        format!(
            "DOCKER_BUILDKIT=1 docker build -f {} -t {}{} {}",
            dockerfile_path, image_tag, build_arg_flags, context_path
        )
    }

    pub async fn execute_build(&self, context_path: &str, dockerfile_path: &str, image_tag: &str) -> Result<String> {
        let cmd = self.generate_build_command(context_path, dockerfile_path, image_tag);
        info!("Executing Dockerfile build command: {}", cmd);

        if let Some(ssh) = self.ssh_client {
            let output = ssh.execute_cmd(&cmd).await?;
            info!("Remote Dockerfile build output: {}", output);
        } else {
            let output = std::process::Command::new("sh")
                .arg("-c")
                .arg(&cmd)
                .output()?;

            if !output.status.success() {
                let stderr = String::from_utf8_lossy(&output.stderr);
                return Err(anyhow!("Dockerfile build failed: {}", stderr));
            }
        }

        Ok(image_tag.to_string())
    }
}

pub async fn build(ctx: &DeployContext) -> Result<String> {
    let image_tag = format!(
        "app-{}:{}",
        &ctx.application_uuid.to_string()[..8],
        chrono::Utc::now().timestamp()
    );

    let builder = DockerfileBuilder::new(ctx, None);
    let context_path = format!("/var/coolify/applications/{}", ctx.application_uuid);
    let dockerfile_path = ctx.dockerfile.as_deref().unwrap_or("Dockerfile");

    info!("Starting Dockerfile build pack for application {}", ctx.application_uuid);
    builder.execute_build(&context_path, dockerfile_path, &image_tag).await
}
