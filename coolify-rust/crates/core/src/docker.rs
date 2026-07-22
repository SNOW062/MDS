use anyhow::Result;
use bollard::Docker;

pub struct DockerManager {
    client: Docker,
}

impl DockerManager {
    pub fn new() -> Result<Self> {
        let client = Docker::connect_with_local_defaults()?;
        Ok(Self { client })
    }

    pub async fn ping(&self) -> Result<()> {
        self.client.ping().await?;
        Ok(())
    }
}
