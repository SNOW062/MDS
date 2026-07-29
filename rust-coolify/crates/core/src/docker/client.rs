// completed be_1055
// Coolify mənbəsi: app/Services/Docker/DockerClient.php
use anyhow::{Result, anyhow};
use bollard::Docker;
use bollard::container::{ListContainersOptions, InspectContainerOptions};
use bollard::image::ListImagesOptions;
use std::collections::HashMap;

pub struct DockerClient {
    docker: Docker,
}

impl DockerClient {
    /// Sistemdəki lokal Docker daemon-a qoşulur
    pub fn connect_local() -> Result<Self> {
        let docker = Docker::connect_with_local_defaults()
            .map_err(|e| anyhow!("Failed to connect to local Docker daemon: {}", e))?;
        Ok(Self { docker })
    }

    /// Uzaq serverin Docker API-nə HTTP/TCP və ya socket üzərindən qoşulur
    pub fn connect_remote(host: &str) -> Result<Self> {
        let docker = Docker::connect_with_http(host, 120, bollard::API_DEFAULT_VERSION)
            .map_err(|e| anyhow!("Failed to connect to remote Docker host {}: {}", host, e))?;
        Ok(Self { docker })
    }

    /// Aktiv konteynerlərin siyahısını alır
    pub async fn list_containers(&self, all: bool) -> Result<Vec<bollard::models::ContainerSummary>> {
        let mut filters = HashMap::new();
        filters.insert("label", vec!["coolify.managed=true"]);

        let options = ListContainersOptions {
            all,
            filters,
            ..Default::default()
        };

        let containers = self.docker.list_containers(Some(options)).await?;
        Ok(containers)
    }

    /// Konteyner haqqında ətraflı məlumat (inspect)
    pub async fn inspect_container(&self, container_id: &str) -> Result<bollard::models::ContainerInspectResponse> {
        let response = self.docker.inspect_container(container_id, None::<InspectContainerOptions>).await?;
        Ok(response)
    }

    /// Lokal Docker image-ləri siyahılayır
    pub async fn list_images(&self) -> Result<Vec<bollard::models::ImageSummary>> {
        let images = self.docker.list_images(None::<ListImagesOptions<String>>).await?;
        Ok(images)
    }
}