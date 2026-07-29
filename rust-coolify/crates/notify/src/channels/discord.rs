// completed file_0831
// Coolify mənbəsi: app/Notifications/Channels/DiscordChannel.php
use anyhow::{Result, anyhow};
use reqwest::Client;
use serde_json::json;
use tracing::info;

pub struct DiscordChannel;

impl DiscordChannel {
    /// Discord Webhook API vasitəsilə bildiriş göndərir
    pub async fn send(
        webhook_url: &str,
        title: &str,
        description: &str,
        color_hex: u32,
    ) -> Result<()> {
        info!("Sending Discord Webhook notification: {}", title);

        if webhook_url.is_empty() {
            return Err(anyhow!("Discord Webhook URL is empty"));
        }

        let payload = json!({
            "embeds": [
                {
                    "title": title,
                    "description": description,
                    "color": color_hex,
                    "footer": {
                        "text": "Coolify Cloud Engine"
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
            return Err(anyhow!("Discord Webhook error: {}", body));
        }

        info!("Discord notification sent successfully");
        Ok(())
    }
}
