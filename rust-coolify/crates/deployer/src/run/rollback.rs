// completed be_1135
use anyhow::Result;

/// Konteyner rollback -- evvelki image-e qayit
pub async fn rollback_container(
    container_name: &str,
    rollback_image: &str,
) -> Result<()> {
    tracing::info!("Rolling back {} to {}", container_name, rollback_image);
    // TODO:
    // 1. docker stop {container_name}
    // 2. docker rm {container_name}
    // 3. docker run -d --name {container_name} {rollback_image}
    Ok(())
}
