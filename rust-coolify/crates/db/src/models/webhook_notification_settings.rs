// completed file_0877
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct WebhookNotificationSettings {
    pub id: Uuid,
}
