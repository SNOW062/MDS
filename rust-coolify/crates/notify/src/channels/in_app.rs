// completed be_1138
// Coolify mənbəsi: Notifications/Channels/InAppChannel.php
use anyhow::Result;
use sqlx::PgPool;
use uuid::Uuid;
use serde_json::Value;

pub struct InAppChannel {
    db: PgPool,
}

impl InAppChannel {
    pub fn new(db: PgPool) -> Self {
        Self { db }
    }

    pub async fn notify(&self, team_id: i64, title: &str, message: &str, data: Option<Value>) -> Result<Uuid> {
        let notification_id = Uuid::new_v4();

        sqlx::query!(
            r#"
            INSERT INTO notifications (uuid, team_id, title, message, payload, read_at, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, NULL, NOW(), NOW())
            "#,
            notification_id,
            team_id as i32,
            title,
            message,
            data
        )
        .execute(&self.db)
        .await?;

        tracing::info!("In-app notification created for team {}", team_id);
        Ok(notification_id)
    }
}
