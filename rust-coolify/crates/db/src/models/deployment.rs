// completed be_1087
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct Deployment {
    pub id: Uuid,
    pub application_id: Uuid,
    pub build_id: String,
    pub status: String,
    pub logs: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
