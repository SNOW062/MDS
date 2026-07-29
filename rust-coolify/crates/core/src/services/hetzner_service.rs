// completed file_0977
// Coolify mənbəsi: app/Services/HetznerService.php
use anyhow::{Result, anyhow};
use reqwest::Client;
use serde_json::Value;
use tracing::info;

pub struct HetznerService {
    client: Client,
    api_token: String,
    base_url: String,
}

impl HetznerService {
    pub fn new(api_token: String) -> Self {
        Self {
            client: Client::new(),
            api_token,
            base_url: "https://api.hetzner.cloud/v1".to_string(),
        }
    }

    /// Hetzner Cloud API request göndərir
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
            return Err(anyhow!("Hetzner Cloud API error: HTTP {} - {}", status, text));
        }

        let json: Value = resp.json().await?;
        Ok(json)
    }

    /// Hetzner-də mövcud server siyahısını çəkir
    pub async fn get_servers(&self) -> Result<Value> {
        self.request(reqwest::Method::GET, "/servers", None).await
    }

    /// Hetzner Cloud serverini silir (Delete Server API)
    pub async fn delete_server(&self, hetzner_server_id: u64) -> Result<()> {
        info!("Deleting Hetzner Cloud server_id={}", hetzner_server_id);
        let endpoint = format!("/servers/{}", hetzner_server_id);
        self.request(reqwest::Method::DELETE, &endpoint, None).await?;
        info!("Hetzner Cloud server_id={} deleted successfully", hetzner_server_id);
        Ok(())
    }

    /// Yeni Hetzner Cloud VPS serveri yaradır (Create Server API)
    pub async fn create_server(
        &self,
        name: &str,
        server_type: &str,
        image: &str,
        location: &str,
        ssh_key_ids: Vec<u64>,
    ) -> Result<Value> {
        info!("Creating Hetzner Cloud server: {}", name);
        let payload = serde_json::json!({
            "name": name,
            "server_type": server_type,
            "image": image,
            "location": location,
            "ssh_keys": ssh_key_ids,
        });

        self.request(reqwest::Method::POST, "/servers", Some(&payload)).await
    }
}
