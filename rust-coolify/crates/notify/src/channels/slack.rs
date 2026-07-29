// completed file_0833
// Coolify mənbəsi: app/Notifications/Channels/SlackChannel.php
use anyhow::{Result, anyhow};
use reqwest::Client;
use serde_json::json;
use tracing::info;

pub struct SlackChannel;

impl SlackChannel {
    /// Slack Incoming Webhook API vasitəsilə bildiriş göndərir
    pub async fn send(
        webhook_url: &str,
        text: &str,
    ) -> Result<()> {
        info!("Sending Slack Webhook notification");

        if webhook_url.is_empty() {
            return Err(anyhow!("Slack Webhook URL is empty"));
        }

        let payload = json!({
            "text": text,
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": text
                    }
                }
            ]
        });

        let client = Client::new();
        let resp = client.post(webhook_url)
            .json(&payload)
            .timeout(std::time::Duration::from_secs(10))
            .send()
            .await?;

        if !resp.status().is_success() {
            let body = resp.text().await.unwrap_or_default();
            return Err(anyhow!("Slack Webhook error: {}", body));
        }

        info!("Slack notification sent successfully");
        Ok(())
    }
}
