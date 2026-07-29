// completed file_0980
// Coolify mənbəsi: app/Services/VultrService.php
use anyhow::{Result, anyhow};
use reqwest::Client;
use serde_json::Value;
use tracing::info;

pub struct VultrService {
    client: Client,
    api_token: String,
    base_url: String,
}

impl VultrService {
    pub fn new(api_token: String) -> Self {
        Self {
            client: Client::new(),
            api_token,
            base_url: "https://api.vultr.com/v2".to_string(),
        }
    }

    async fn request(&self, method: reqwest::Method, endpoint: &str, body: Option<&Value>) -> Result<Value> {
        let url = format!("{}{}", self.base_url, endpoint);
        let mut req = self.client.request(method, &url)
            .bearer_auth(&self.api_token);

        if let Some(b) = body {
            req = req.json(b);
        }

        let resp = req.send().await?;

        if !resp.status().is_success() {
            let status = resp.status();
            let text = resp.text().await.unwrap_or_default();
            return Err(anyhow!("Vultr API error: HTTP {} - {}", status, text));
        }

        let json: Value = resp.json().await?;
        Ok(json)
    }

    /// Vultr VPS instance-lərini alır
    pub async fn get_instances(&self) -> Result<Value> {
        self.request(reqwest::Method::GET, "/instances", None).await
    }

    /// Vultr VPS instance-ini silir
    pub async fn delete_instance(&self, instance_id: &str) -> Result<()> {
        info!("Deleting Vultr instance_id={}", instance_id);
        let endpoint = format!("/instances/{}", instance_id);
        self.request(reqwest::Method::DELETE, &endpoint, None).await?;
        info!("Vultr instance_id={} deleted successfully", instance_id);
        Ok(())
    }
}
