// completed file_0832
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct Environment {
    pub id: uuid::Uuid,
    pub name: Option<String>,
    pub description: Option<String>,
    pub project_id: Option<uuid::Uuid>,
}
