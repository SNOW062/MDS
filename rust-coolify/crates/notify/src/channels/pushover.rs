// completed be_1140
// Coolify mənbəsi: app/Notifications/Channels/PushoverChannel.php
use anyhow::{Result, anyhow};
use reqwest::Client;
use serde_json::json;
use tracing::info;

pub struct PushoverChannel;

impl PushoverChannel {
    /// Pushover Mobile/Desktop Push API vasitəsilə bildiriş göndərir
    pub async fn send(
        app_token: &str,
        user_key: &str,
        title: &str,
        message: &str,
        priority: i8,
    ) -> Result<()> {
        info!("Sending Pushover notification: {}", title);

        if app_token.is_empty() || user_key.is_empty() {
            return Err(anyhow!("Pushover App Token or User Key is empty"));
        }

        let url = "https://api.pushover.net/1/messages.json";
        let payload = json!({
            "token": app_token,
            "user": user_key,
            "title": title,
            "message": message,
            "priority": priority,
            "html": 1
        });

        let client = Client::new();
        let resp = client.post(url)
            .json(&payload)
            .timeout(std::time::Duration::from_secs(10))
            .send()
            .await?;

        if !resp.status().is_success() {
            let body = resp.text().await.unwrap_or_default();
            return Err(anyhow!("Pushover API error: {}", body));
        }

        info!("Pushover notification sent successfully");
        Ok(())
    }
}
