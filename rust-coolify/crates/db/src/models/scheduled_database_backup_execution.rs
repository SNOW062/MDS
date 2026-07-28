// completed file_0847
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct ScheduledDatabaseBackupExecution {
    pub id: Uuid,
}
