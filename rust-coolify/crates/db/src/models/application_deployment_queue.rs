// completed file_0823
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct ApplicationDeploymentQueue {
    pub id: Uuid,
}
