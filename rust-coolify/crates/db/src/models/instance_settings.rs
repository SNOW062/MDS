// completed file_0836
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct InstanceSettings {
    pub id: Uuid,
}
