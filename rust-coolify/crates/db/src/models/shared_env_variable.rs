// completed be_1094
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct SharedEnvVariable {
    pub id: Uuid,
}
