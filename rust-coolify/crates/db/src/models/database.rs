// completed be_1086
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct Database {
    pub id: Uuid,
    pub environment_id: Uuid,
    pub server_id: Uuid,
    pub name: String,
    pub db_engine: String,
    pub status: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
