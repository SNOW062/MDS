// completed file_0861
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct StandaloneDocker {
    pub id: Uuid,
}
