// completed file_0828
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct CloudProviderToken {
    pub id: Uuid,
}
