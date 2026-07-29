// completed be_1056
// Coolify mənbəsi: app/Actions/Docker/ContainerActions.php
use anyhow::{Result, anyhow};
use bollard::Docker;
use bollard::container::{StartContainerOptions, StopContainerOptions, RestartContainerOptions, RemoveContainerOptions, LogsOptions};
use futures_util::StreamExt;

pub struct DockerContainerManager {
    docker: Docker,
}

impl DockerContainerManager {
    pub fn new(docker: Docker) -> Self {
        Self { docker }
    }

    /// Konteyneri başladır
    pub async fn start(&self, container_id: &str) -> Result<()> {
        self.docker.start_container(container_id, None::<StartContainerOptions<String>>).await?;
        tracing::info!("Container {} started successfully", container_id);
        Ok(())
    }

    /// Konteyneri dayandırır (timeout saniyə ilə)
    pub async fn stop(&self, container_id: &str, timeout_secs: i64) -> Result<()> {
        let options = StopContainerOptions { t: timeout_secs };
        self.docker.stop_container(container_id, Some(options)).await?;
        tracing::info!("Container {} stopped successfully", container_id);
        Ok(())
    }

    /// Konteyneri yenidən başladır
    pub async fn restart(&self, container_id: &str, timeout_secs: i64) -> Result<()> {
        let options = RestartContainerOptions { t: timeout_secs };
        self.docker.restart_container(container_id, Some(options)).await?;
        tracing::info!("Container {} restarted successfully", container_id);
        Ok(())
    }

    /// Konteyneri silir (force option ilə)
    pub async fn remove(&self, container_id: &str, force: bool) -> Result<()> {
        let options = RemoveContainerOptions {
            force,
            v: true,
            ..Default::default()
        };
        self.docker.remove_container(container_id, Some(options)).await?;
        tracing::info!("Container {} removed successfully", container_id);
        Ok(())
    }

    /// Konteyner loglarını canlı axın (stream) şəklində oxuyur
    pub async fn stream_logs<F>(&self, container_id: &str, tail: usize, mut on_log: F) -> Result<()>
    where
        F: FnMut(String),
    {
        let options = LogsOptions::<String> {
            stdout: true,
            stderr: true,
            follow: true,
            tail: tail.to_string(),
            ..Default::default()
        };

        let mut stream = self.docker.logs(container_id, Some(options));
        while let Some(log_result) = stream.next().await {
            match log_result {
                Ok(log_output) => {
                    on_log(log_output.to_string());
                }
                Err(e) => {
                    tracing::error!("Error reading logs for container {}: {}", container_id, e);
                    return Err(anyhow!("Log stream error: {}", e));
                }
            }
        }
        Ok(())
    }
}