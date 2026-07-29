// completed be_1116
// Coolify mənbəsi: app/Jobs/ApplicationDeploymentJob.php -> deploy_nixpacks_buildpack()
use anyhow::{Result, anyhow};
use std::collections::HashMap;
use std::path::Path;
use tracing::info;

use crate::engine::DeployContext;
use rc_core::ssh::client::SshClient;

pub struct NixpacksBuilder<'a> {
    pub ctx: &'a DeployContext,
    pub ssh_client: Option<&'a SshClient>,
    pub build_env_vars: HashMap<String, String>,
}

impl<'a> NixpacksBuilder<'a> {
    pub fn new(ctx: &'a DeployContext, ssh_client: Option<&'a SshClient>) -> Self {
        Self {
            ctx,
            ssh_client,
            build_env_vars: HashMap::new(),
        }
    }

    /// Nixpacks xüsusi NIXPACKS_* mühit dəyişənlərini tənzimləyir
    pub fn setup_nixpacks_env(&mut self, envs: &HashMap<String, String>) {
        for (k, v) in envs {
            if k.starts_with("NIXPACKS_") {
                self.build_env_vars.insert(k.clone(), v.clone());
            }
        }
    }

    /// Nixpacks build əmrini generasiya edir
    pub fn generate_nixpacks_command(&self, app_dir: &str, image_tag: &str) -> String {
        let mut env_flags = String::new();
        for (k, v) in &self.build_env_vars {
            env_flags.push_str(&format!(" --env {}='{}'", k, v.replace('\'', "'\\''")));
        }

        format!(
            "nixpacks build {} --name {}{}",
            app_dir, image_tag, env_flags
        )
    }

    /// Nixpacks build prosesini uzaq serverdə və ya yerli mühitdə icra edir
    pub async fn execute_build(&self, app_dir: &str, image_tag: &str) -> Result<String> {
        let cmd = self.generate_nixpacks_command(app_dir, image_tag);
        info!("Executing Nixpacks build command: {}", cmd);

        if let Some(ssh) = self.ssh_client {
            let output = ssh.execute_cmd(&cmd).await?;
            info!("Nixpacks remote build output: {}", output);
        } else {
            // Local execution
            let output = std::process::Command::new("sh")
                .arg("-c")
                .arg(&cmd)
                .output()?;

            if !output.status.success() {
                let stderr = String::from_utf8_lossy(&output.stderr);
                return Err(anyhow!("Nixpacks build failed: {}", stderr));
            }
        }

        Ok(image_tag.to_string())
    }
}

/// Nixpacks vasitəsilə tətbiqin build olunması üçün ana funksiya
pub async fn build(ctx: &DeployContext) -> Result<String> {
    let image_tag = format!(
        "app-{}:{}",
        &ctx.application_uuid.to_string()[..8],
        chrono::Utc::now().timestamp()
    );

    let builder = NixpacksBuilder::new(ctx, None);
    let app_dir = format!("/var/coolify/applications/{}", ctx.application_uuid);

    info!("Starting Nixpacks build pack for application {}", ctx.application_uuid);
    builder.execute_build(&app_dir, &image_tag).await
}
