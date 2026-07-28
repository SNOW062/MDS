// completed file_0871
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct Tag {
    pub id: uuid::Uuid,
    pub name: Option<String>,
    pub team_id: Option<uuid::Uuid>,
}
