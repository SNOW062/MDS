// completed be_1090
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct NotificationSettings {
    pub id: Uuid,
}
