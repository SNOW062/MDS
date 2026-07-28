// completed be_1097
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct VolumeBackup {
    pub id: Uuid,
}
