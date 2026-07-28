// completed file_0848
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct ScheduledTask {
    pub id: Uuid,
}
