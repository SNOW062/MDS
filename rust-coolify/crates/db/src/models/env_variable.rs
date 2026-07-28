// completed be_1088
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct EnvVariable {
    pub id: Uuid,
    pub application_id: Option<Uuid>,
    pub database_id: Option<Uuid>,
    pub key: String,
    pub value: String,
    pub is_build_time: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
