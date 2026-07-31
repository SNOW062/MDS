// completed file_0875
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct User {
    pub id: uuid::Uuid,
    pub name: Option<String>,
    pub email: Option<String>,
    pub password: Option<String>,
    pub force_password_reset: bool,
    pub marketing_emails: bool,
    pub pending_email: Option<String>,
    pub email_change_code: Option<String>,
    pub email_change_code_expires_at: Option<chrono::DateTime<chrono::Utc>>,
}
