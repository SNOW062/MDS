// completed file_0840
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct PersonalAccessToken {
    pub id: Uuid,
}
