// completed file_0830
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct DockerCleanupExecution {
    pub id: Uuid,
}
