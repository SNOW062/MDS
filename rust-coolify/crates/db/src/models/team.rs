// completed file_0872
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct Team {
    pub id: uuid::Uuid,
    pub name: Option<String>,
    pub description: Option<String>,
    pub personal_team: bool,
    pub show_boarding: Option<String>,
    pub custom_server_limit: Option<String>,
    pub is_mcp_server_enabled: bool,
}
