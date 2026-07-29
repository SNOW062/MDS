// completed file_0837_webhook
// Coolify mənbəsi: app/Notifications/Channels/WebhookChannel.php
use anyhow::{Result, anyhow};
use reqwest::Client;
use serde_json::Value;
use tracing::info;

pub struct WebhookChannel;

impl WebhookChannel {
    /// Custom HTTP Webhook Endpoint-inə JSON POST payload göndərir
    pub async fn send(
        webhook_url: &str,
        payload: &Value,
    ) -> Result<()> {
        info!("Sending Generic HTTP Webhook notification to {}", webhook_url);

        if webhook_url.is_empty() {
            return Err(anyhow!("Webhook URL is empty"));
        }

        let client = Client::new();
        let resp = client.post(webhook_url)
            .json(payload)
            .timeout(std::time::Duration::from_secs(10))
            .send()
            .await?;

        if !resp.status().is_success() {
            let body = resp.text().await.unwrap_or_default();
            return Err(anyhow!("Generic Webhook HTTP error: {}", body));
        }

        info!("Generic Webhook notification sent successfully");
        Ok(())
    }
}
