// completed file_0827
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct CloudInitScript {
    pub id: Uuid,
}
