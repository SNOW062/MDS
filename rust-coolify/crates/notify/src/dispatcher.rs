// completed be_1144
// Coolify mənbəsi: Notifications/Dispatcher.php
use anyhow::Result;
use crate::events::NotificationEvent;
use crate::channels::discord::DiscordChannel;
use crate::channels::telegram::TelegramChannel;
use crate::channels::slack::SlackChannel;
use crate::channels::webhook::WebhookChannel;
use crate::channels::dto::discord_message::{DiscordMessage, DiscordEmbed};
use crate::channels::dto::slack_message::SlackMessage;

pub struct NotificationDispatcher {
    pub discord: Option<DiscordChannel>,
    pub telegram: Option<TelegramChannel>,
    pub slack: Option<SlackChannel>,
    pub webhook: Option<WebhookChannel>,
}

impl NotificationDispatcher {
    pub fn new() -> Self {
        Self {
            discord: None,
            telegram: None,
            slack: None,
            webhook: None,
        }
    }

    pub async fn dispatch(&self, event: &NotificationEvent) -> Result<()> {
        match event {
            NotificationEvent::DeploymentFailed { application_name, deployment_uuid, reason } => {
                let title = format!("❌ Deployment Failed: {}", application_name);
                let body = format!("Deployment ID: {}\nReason: {}", deployment_uuid, reason);

                if let Some(discord) = &self.discord {
                    let msg = DiscordMessage::new().add_embed(DiscordEmbed {
                        title: Some(title.clone()),
                        description: Some(body.clone()),
                        color: Some(0xFF0000),
                        ..Default::default()
                    });
                    let _ = discord.send(&msg).await;
                }

                if let Some(telegram) = &self.telegram {
                    let text = format!("<b>{}</b>\n{}", title, body);
                    let _ = telegram.send_message(&text, true).await;
                }

                if let Some(slack) = &self.slack {
                    let msg = SlackMessage::new().with_text(&format!("{}\n{}", title, body));
                    let _ = slack.send(&msg).await;
                }
            }
            NotificationEvent::DeploymentSuccess { application_name, deployment_uuid, url } => {
                let title = format!("✅ Deployment Successful: {}", application_name);
                let body = format!("Deployment ID: {}\nURL: {}", deployment_uuid, url.as_deref().unwrap_or("N/A"));

                if let Some(discord) = &self.discord {
                    let msg = DiscordMessage::new().add_embed(DiscordEmbed {
                        title: Some(title.clone()),
                        description: Some(body.clone()),
                        color: Some(0x00FF00),
                        ..Default::default()
                    });
                    let _ = discord.send(&msg).await;
                }

                if let Some(telegram) = &self.telegram {
                    let text = format!("<b>{}</b>\n{}", title, body);
                    let _ = telegram.send_message(&text, true).await;
                }
            }
            NotificationEvent::ServerUnreachable { server_name, ip } => {
                let title = format!("🚨 Server Unreachable: {}", server_name);
                let body = format!("Server IP: {}", ip);

                if let Some(telegram) = &self.telegram {
                    let text = format!("<b>{}</b>\n{}", title, body);
                    let _ = telegram.send_message(&text, true).await;
                }
            }
            _ => {
                tracing::info!("Event notification processing fallback");
            }
        }

        Ok(())
    }
}
