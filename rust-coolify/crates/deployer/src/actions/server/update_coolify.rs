// completed file_0392
// Coolify mənbəsi: app/Actions/Server/UpdateCoolify.php
use anyhow::{Result, anyhow};
use reqwest::Client;
use serde_json::Value;
use tracing::info;

pub struct UpdateCoolify;

impl UpdateCoolify {
    /// CDN-dən ən son Coolify v4 versiyasını çəkir
    pub async fn fetch_latest_version() -> Result<String> {
        let client = Client::new();
        let resp = client.get("https://cdn.coollabs.io/coolify/versions.json")
            .timeout(std::time::Duration::from_secs(10))
            .send()
            .await?;

        if resp.status().is_success() {
            let json: Value = resp.json().await?;
            if let Some(ver) = json["coolify"]["v4"]["version"].as_str() {
                return Ok(ver.to_string());
            }
        }

        Err(anyhow!("Could not fetch latest Coolify version from CDN"))
    }

    /// Coolify özünü (local host / server 0) ən son Docker image ilə yeniləyir
    pub async fn handle(current_version: &str, manual_trigger: bool) -> Result<String> {
        info!("Checking for Coolify updates. Current version: {}", current_version);

        let latest_version = Self::fetch_latest_version().await.unwrap_or_else(|_| current_version.to_string());

        if !manual_trigger && latest_version == current_version {
            info!("Coolify is already up-to-date ({})", current_version);
            return Ok(current_version.to_string());
        }

        info!("Updating Coolify to version {}", latest_version);

        let update_script = format!(
            r#"
            curl -fsSL https://cdn.coollabs.io/coolify/upgrade.sh -o /tmp/upgrade.sh &&
            bash /tmp/upgrade.sh {}
            "#,
            latest_version
        );

        let output = std::process::Command::new("sh")
            .arg("-c")
            .arg(&update_script)
            .output()?;

        if !output.status.success() {
            let stderr = String::from_utf8_lossy(&output.stderr);
            return Err(anyhow!("Coolify upgrade script failed: {}", stderr));
        }

        info!("Coolify successfully upgraded to {}", latest_version);
        Ok(latest_version)
    }
}
