// completed file_0855
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct ServiceApplication {
    pub id: Uuid,
}
