// completed be_1117
// Coolify mənbəsi: Static HTML Application Serving
use anyhow::{Result, anyhow};
use tracing::info;
use crate::engine::DeployContext;
use rc_core::ssh::client::SshClient;

pub struct StaticHtmlBuilder<'a> {
    pub ctx: &'a DeployContext,
    pub ssh_client: Option<&'a SshClient>,
}

impl<'a> StaticHtmlBuilder<'a> {
    pub fn new(ctx: &'a DeployContext, ssh_client: Option<&'a SshClient>) -> Self {
        Self { ctx, ssh_client }
    }

    /// Nginx statik fayl xidməti üçün Dockerfile hazırlayır (əgər mövcud deyilsə)
    pub fn generate_nginx_dockerfile(&self) -> String {
        r#"
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
"#.trim().to_string()
    }

    pub async fn execute_build(&self, app_dir: &str, image_tag: &str) -> Result<String> {
        let dockerfile_content = self.generate_nginx_dockerfile();
        let cmd = format!(
            "echo '{}' > {}/Dockerfile.coolify-static && docker build -f {}/Dockerfile.coolify-static -t {} {}",
            dockerfile_content.replace('\'', "'\\''"),
            app_dir,
            app_dir,
            image_tag,
            app_dir
        );

        info!("Building Static HTML Nginx image: {}", cmd);

        if let Some(ssh) = self.ssh_client {
            ssh.execute_cmd(&cmd).await?;
        } else {
            let output = std::process::Command::new("sh").arg("-c").arg(&cmd).output()?;
            if !output.status.success() {
                return Err(anyhow!("Static HTML Nginx build failed: {}", String::from_utf8_lossy(&output.stderr)));
            }
        }

        Ok(image_tag.to_string())
    }
}

pub async fn build(ctx: &DeployContext) -> Result<String> {
    let image_tag = format!(
        "static-{}:{}",
        &ctx.application_uuid.to_string()[..8],
        chrono::Utc::now().timestamp()
    );

    let builder = StaticHtmlBuilder::new(ctx, None);
    let app_dir = format!("/var/coolify/applications/{}", ctx.application_uuid);

    info!("Starting Static HTML deployment for application {}", ctx.application_uuid);
    builder.execute_build(&app_dir, &image_tag).await
}
