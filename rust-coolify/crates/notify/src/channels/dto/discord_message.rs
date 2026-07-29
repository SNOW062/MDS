// completed file_0904
// Coolify mənbəsi: Notifications/DTO/DiscordMessage.php
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct DiscordEmbedFooter {
    pub text: String,
    pub icon_url: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct DiscordEmbedField {
    pub name: String,
    pub value: String,
    pub inline: Option<bool>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct DiscordEmbed {
    pub title: Option<String>,
    pub description: Option<String>,
    pub url: Option<String>,
    pub color: Option<u32>,
    pub footer: Option<DiscordEmbedFooter>,
    pub fields: Vec<DiscordEmbedField>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct DiscordMessage {
    pub username: Option<String>,
    pub avatar_url: Option<String>,
    pub content: Option<String>,
    pub embeds: Vec<DiscordEmbed>,
}

impl DiscordMessage {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn with_content(mut self, content: &str) -> Self {
        self.content = Some(content.to_string());
        self
    }

    pub fn add_embed(mut self, embed: DiscordEmbed) -> Self {
        self.embeds.push(embed);
        self
    }
}
