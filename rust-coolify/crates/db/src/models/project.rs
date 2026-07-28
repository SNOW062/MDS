// completed file_0842
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct Project {
    pub id: uuid::Uuid,
    pub name: Option<String>,
    pub description: Option<String>,
    pub team_id: Option<uuid::Uuid>,
}
