// completed file_0829
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct DiscordNotificationSettings {
    pub id: Uuid,
}
