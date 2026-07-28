// completed file_0831
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct EmailNotificationSettings {
    pub id: Uuid,
}
