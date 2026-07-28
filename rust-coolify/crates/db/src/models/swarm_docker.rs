// completed file_0870
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct SwarmDocker {
    pub id: Uuid,
}
