// completed file_0849
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct ScheduledTaskExecution {
    pub id: Uuid,
}
