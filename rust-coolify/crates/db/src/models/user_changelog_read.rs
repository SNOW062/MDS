// completed file_0876
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct UserChangelogRead {
    pub id: Uuid,
}
