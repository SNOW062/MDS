// completed file_0858
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct SlackNotificationSettings {
    pub id: Uuid,
}
