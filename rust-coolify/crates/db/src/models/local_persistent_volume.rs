// completed file_0838
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct LocalPersistentVolume {
    pub id: Uuid,
}
