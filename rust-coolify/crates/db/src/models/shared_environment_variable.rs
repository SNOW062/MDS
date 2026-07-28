// completed file_0857
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct SharedEnvironmentVariable {
    pub id: Uuid,
}
