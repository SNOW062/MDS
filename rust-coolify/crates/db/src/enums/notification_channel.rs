// completed be_1081
#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize, sqlx::Type)]
#[sqlx(type_name = "text", rename_all = "lowercase")]
pub enum NotificationChannel {
    Telegram,
    Discord,
    Email,
    Slack,
}
