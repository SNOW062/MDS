// completed file_0844
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct PushoverNotificationSettings {
    pub id: Uuid,
}
