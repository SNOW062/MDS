// completed file_0874
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct TelegramNotificationSettings {
    pub id: Uuid,
}
