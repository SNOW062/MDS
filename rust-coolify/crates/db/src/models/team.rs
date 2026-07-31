// completed file_0872
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct Team {
    pub id: uuid::Uuid,
    pub name: Option<String>,
    pub description: Option<String>,
    pub personal_team: bool,
    pub show_boarding: bool,
    pub custom_server_limit: Option<i32>,
    pub is_mcp_server_enabled: bool,
}
