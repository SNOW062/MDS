// completed file_0975
// Coolify mənbəsi: app/Services/DigitalOceanService.php
use anyhow::{Result, anyhow};
use reqwest::Client;
use serde_json::Value;
use tracing::info;

pub struct DigitalOceanService {
    client: Client,
    api_token: String,
    base_url: String,
}

impl DigitalOceanService {
    pub fn new(api_token: String) -> Self {
        Self {
            client: Client::new(),
            api_token,
            base_url: "https://api.digitalocean.com/v2".to_string(),
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
            return Err(anyhow!("DigitalOcean API error: HTTP {} - {}", status, text));
        }

        let json: Value = resp.json().await?;
        Ok(json)
    }

    /// DigitalOcean Droplets siyahısını alır
    pub async fn get_droplets(&self) -> Result<Value> {
        self.request(reqwest::Method::GET, "/droplets", None).await
    }

    /// Droplet-i silir (Delete Droplet API)
    pub async fn delete_droplet(&self, droplet_id: u64) -> Result<()> {
        info!("Deleting DigitalOcean droplet_id={}", droplet_id);
        let endpoint = format!("/droplets/{}", droplet_id);
        self.request(reqwest::Method::DELETE, &endpoint, None).await?;
        info!("DigitalOcean droplet_id={} deleted successfully", droplet_id);
        Ok(())
    }

    /// Yeni Droplet yaradır
    pub async fn create_droplet(
        &self,
        name: &str,
        region: &str,
        size: &str,
        image: &str,
        ssh_keys: Vec<Value>,
    ) -> Result<Value> {
        info!("Creating DigitalOcean droplet: {}", name);
        let payload = serde_json::json!({
            "name": name,
            "region": region,
            "size": size,
            "image": image,
            "ssh_keys": ssh_keys,
        });

        self.request(reqwest::Method::POST, "/droplets", Some(&payload)).await
    }
}
