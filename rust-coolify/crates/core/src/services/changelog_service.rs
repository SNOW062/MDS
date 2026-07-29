// completed file_0973
// Coolify mənbəsi: app/Services/ChangelogService.php
use anyhow::Result;
use reqwest::Client;
use serde_json::Value;
use tracing::info;

pub struct ChangelogService {
    client: Client,
}

impl ChangelogService {
    pub fn new() -> Self {
        Self { client: Client::new() }
    }

    /// CDN və ya GitHub API-dən versiyaların dəyişiklik siyahısını (changelog) çəkir
    pub async fn fetch_latest_changelog(&self) -> Result<Value> {
        info!("Fetching Coolify release changelog");
        let url = "https://cdn.coollabs.io/coolify/changelog.json";

        let resp = self.client.get(url)
            .timeout(std::time::Duration::from_secs(10))
            .send()
            .await?;

        if resp.status().is_success() {
            let json: Value = resp.json().await?;
            return Ok(json);
        }

        Ok(serde_json::json!({ "releases": [] }))
    }
}
