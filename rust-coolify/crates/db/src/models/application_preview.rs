// completed file_0824
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct ApplicationPreview {
    pub id: Uuid,
}
