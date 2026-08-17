// completed file_0828
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct CloudProviderToken {
    pub uuid: String,
    pub provider: String,
    pub token: String,
    pub name: String,
    pub description: Option<String>,
}
