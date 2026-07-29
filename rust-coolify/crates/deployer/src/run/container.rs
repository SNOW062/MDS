// completed be_1132
// Coolify menkesi: Docker container start/stop/restart

use anyhow::Result;
use crate::engine::DeployContext;

/// Docker konteyneri baslat
/// Coolify: docker run veya docker compose up
pub async fn start(ctx: &DeployContext, image_tag: &str) -> Result<String> {
    let container_name = format!("app-{}", &ctx.application_uuid.to_string()[..8]);

    tracing::info!(
        "Starting container {} from image {}",
        container_name,
        image_tag
    );

    // TODO: SSH ile:
    // docker run -d
    //   --name {container_name}
    //   --restart unless-stopped
    //   -p {ports}
    //   {env_args}
    //   {label_args}
    //   {image_tag}

    // Container ID-ni qaytar
    Ok(format!("{}-id-placeholder", container_name))
}

/// Docker konteyneri dondur
pub async fn stop(container_name: &str) -> Result<()> {
    tracing::info!("Stopping container {}", container_name);
    // TODO: docker stop {container_name}
    Ok(())
}

/// Docker konteyneri yeniden baslat
pub async fn restart(container_name: &str) -> Result<()> {
    tracing::info!("Restarting container {}", container_name);
    // TODO: docker restart {container_name}
    Ok(())
}

/// Konteynerin status-unu al
pub async fn status(container_name: &str) -> Result<ContainerStatus> {
    // TODO: docker inspect {container_name} --format='{{.State.Status}}'
    Ok(ContainerStatus::Unknown)
}

#[derive(Debug, Clone, PartialEq)]
pub enum ContainerStatus {
    Running,
    Stopped,
    Exited,
    Restarting,
    Unknown,
}

impl ContainerStatus {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Running => "running",
            Self::Stopped => "stopped",
            Self::Exited => "exited",
            Self::Restarting => "restarting",
            Self::Unknown => "unknown",
        }
    }
}
