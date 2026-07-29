// completed file_0835
// Coolify mənbəsi: app/Notifications/Channels/GotifyChannel.php
use anyhow::{Result, anyhow};
use reqwest::Client;
use serde_json::json;
use tracing::info;

pub struct GotifyChannel;

impl GotifyChannel {
    /// Gotify Push Server API vasitəsilə bildiriş göndərir
    pub async fn send(
        gotify_url: &str,
        app_token: &str,
        title: &str,
        message: &str,
        priority: u8,
    ) -> Result<()> {
        info!("Sending Gotify notification: {}", title);

        if gotify_url.is_empty() || app_token.is_empty() {
            return Err(anyhow!("Gotify Server URL or App Token is empty"));
        }

        let url = format!("{}/message?token={}", gotify_url.trim_end_matches('/'), app_token);
        let payload = json!({
            "title": title,
            "message": message,
            "priority": priority
        });

        let client = Client::new();
        let resp = client.post(&url)
            .json(&payload)
            .timeout(std::time::Duration::from_secs(10))
            .send()
            .await?;

        if !resp.status().is_success() {
            let body = resp.text().await.unwrap_or_default();
            return Err(anyhow!("Gotify API error: {}", body));
        }

        info!("Gotify notification sent successfully");
        Ok(())
    }
}
