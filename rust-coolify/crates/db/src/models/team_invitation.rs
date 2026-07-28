// completed file_0873
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct TeamInvitation {
    pub id: Uuid,
}
