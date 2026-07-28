// completed file_0833
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct EnvironmentVariable {
    pub id: Uuid,
}
