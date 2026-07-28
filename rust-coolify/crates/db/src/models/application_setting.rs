// completed file_0825
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct ApplicationSetting {
    pub id: Uuid,
}
