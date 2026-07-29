// completed file_0847
// Coolify Notification Manager
use anyhow::Result;
use sqlx::{PgPool, Row};
use tracing::info;
use crate::channels::telegram::TelegramChannel;
use crate::channels::discord::DiscordChannel;
use crate::channels::slack::SlackChannel;

pub struct NotificationManager;

impl NotificationManager {
    /// Komandanın aktiv etdiyi bütün bildiriş kanallarına paralel olaraq bildirişi yayır
    pub async fn notify_team(
        db: &PgPool,
        team_id: i32,
        title: &str,
        message: &str,
    ) -> Result<()> {
        info!("Notifying team_id={} with title: '{}'", team_id, title);

        // Telegram settings
        let telegram = sqlx::query(
            "SELECT telegram_token, telegram_chat_id FROM telegram_notification_settings WHERE team_id = $1 AND is_telegram_enabled = true"
        )
        .bind(team_id)
        .fetch_optional(db)
        .await;

        if let Ok(Some(row)) = telegram {
            let token: Option<String> = row.try_get("telegram_token").ok();
            let chat_id: Option<String> = row.try_get("telegram_chat_id").ok();
            if let (Some(t), Some(c)) = (token, chat_id) {
                TelegramChannel::send(&t, &c, None, message).await.ok();
            }
        }

        // Discord settings
        let discord = sqlx::query(
            "SELECT discord_webhook_url FROM discord_notification_settings WHERE team_id = $1 AND is_discord_enabled = true"
        )
        .bind(team_id)
        .fetch_optional(db)
        .await;

        if let Ok(Some(row)) = discord {
            let webhook: Option<String> = row.try_get("discord_webhook_url").ok();
            if let Some(w) = webhook {
                DiscordChannel::send(&w, title, message, 0x00FF00).await.ok();
            }
        }

        // Slack settings
        let slack = sqlx::query(
            "SELECT slack_webhook_url FROM slack_notification_settings WHERE team_id = $1 AND is_slack_enabled = true"
        )
        .bind(team_id)
        .fetch_optional(db)
        .await;

        if let Ok(Some(row)) = slack {
            let webhook: Option<String> = row.try_get("slack_webhook_url").ok();
            if let Some(w) = webhook {
                SlackChannel::send(&w, message).await.ok();
            }
        }

        Ok(())
    }
}
