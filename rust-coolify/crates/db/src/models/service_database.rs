// completed file_0856
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct ServiceDatabase {
    pub id: Uuid,
}
