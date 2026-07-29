// completed file_0906
// Coolify mənbəsi: Notifications/DTO/SlackMessage.php
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct SlackField {
    pub title: String,
    pub value: String,
    pub short: Option<bool>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct SlackAttachment {
    pub color: Option<String>,
    pub title: Option<String>,
    pub title_link: Option<String>,
    pub text: Option<String>,
    pub fields: Vec<SlackField>,
    pub footer: Option<String>,
    pub ts: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct SlackMessage {
    pub text: Option<String>,
    pub username: Option<String>,
    pub icon_emoji: Option<String>,
    pub attachments: Vec<SlackAttachment>,
}

impl SlackMessage {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn with_text(mut self, text: &str) -> Self {
        self.text = Some(text.to_string());
        self
    }

    pub fn add_attachment(mut self, attachment: SlackAttachment) -> Self {
        self.attachments.push(attachment);
        self
    }
}
