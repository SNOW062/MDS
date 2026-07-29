// completed be_1131
// Coolify menkesi: real-time deployment log streaming
// WebSocket ve DB-ye eyni zamanda log yazir

use tokio::sync::broadcast;
use uuid::Uuid;

/// Real-time log satiri
#[derive(Debug, Clone)]
pub struct LogLine {
    pub deployment_uuid: Uuid,
    pub content: String,
    pub level: LogLevel,
    pub timestamp: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Clone, PartialEq)]
pub enum LogLevel {
    Info,
    Warning,
    Error,
    Debug,
}

impl LogLevel {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Info => "INFO",
            Self::Warning => "WARN",
            Self::Error => "ERROR",
            Self::Debug => "DEBUG",
        }
    }
}

/// Log stream idarecisi — DB + WebSocket broadcast
pub struct LogStreamer {
    deployment_uuid: Uuid,
    db: sqlx::PgPool,
    broadcast_tx: broadcast::Sender<LogLine>,
}

impl LogStreamer {
    pub fn new(
        deployment_uuid: Uuid,
        db: sqlx::PgPool,
    ) -> (Self, broadcast::Receiver<LogLine>) {
        let (tx, rx) = broadcast::channel(1024);
        let streamer = Self {
            deployment_uuid,
            db,
            broadcast_tx: tx,
        };
        (streamer, rx)
    }

    /// Log satiri yaz — DB-ye ve broadcast-a
    pub async fn log(&self, content: String, level: LogLevel) -> anyhow::Result<()> {
        let line = LogLine {
            deployment_uuid: self.deployment_uuid,
            content: content.clone(),
            level,
            timestamp: chrono::Utc::now(),
        };

        // DB-ye yaz
        sqlx::query(
            r#"INSERT INTO deployment_logs (deployment_uuid, content, created_at)
               VALUES ($1, $2, NOW())"#
        )
        .bind(self.deployment_uuid)
        .bind(&content)
        .execute(&self.db)
        .await
        .ok(); // Log xetasi deploy-u dayandirmasin

        // Broadcast et (WebSocket abunecilere)
        let _ = self.broadcast_tx.send(line);

        Ok(())
    }

    pub async fn info(&self, msg: &str) -> anyhow::Result<()> {
        self.log(msg.to_string(), LogLevel::Info).await
    }

    pub async fn error(&self, msg: &str) -> anyhow::Result<()> {
        self.log(msg.to_string(), LogLevel::Error).await
    }
}
