// completed file_0834
// Coolify mənbəsi: app/Notifications/Channels/TelegramChannel.php
use anyhow::{Result, anyhow};
use reqwest::Client;
use serde_json::json;
use tracing::info;

pub struct TelegramChannel;

impl TelegramChannel {
    /// Telegram Bot API vasitəsilə bildiriş mesajını çatdırır
    pub async fn send(
        bot_token: &str,
        chat_id: &str,
        thread_id: Option<&str>,
        message: &str,
    ) -> Result<()> {
        info!("Sending Telegram notification to chat_id={}", chat_id);

        if bot_token.is_empty() || chat_id.is_empty() {
            return Err(anyhow!("Telegram Bot Token or Chat ID is empty"));
        }

        let url = format!("https://api.telegram.org/bot{}/sendMessage", bot_token);
        let client = Client::new();

        let mut payload = json!({
            "chat_id": chat_id,
            "text": message,
            "parse_mode": "HTML",
            "disable_web_page_preview": true
        });

        if let Some(tid) = thread_id {
            if !tid.is_empty() {
                payload["message_thread_id"] = json!(tid);
            }
        }

        let resp = client.post(&url)
            .json(&payload)
            .timeout(std::time::Duration::from_secs(10))
            .send()
            .await?;

        if !resp.status().is_success() {
            let body = resp.text().await.unwrap_or_default();
            return Err(anyhow!("Telegram API error: {}", body));
        }

        info!("Telegram notification sent successfully");
        Ok(())
    }
}
