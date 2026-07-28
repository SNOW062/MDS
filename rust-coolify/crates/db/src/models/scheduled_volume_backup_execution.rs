// completed file_0851
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct ScheduledVolumeBackupExecution {
    pub id: Uuid,
}
