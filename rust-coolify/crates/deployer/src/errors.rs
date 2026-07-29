// completed be_1122
// Coolify menkesi: app/Exceptions/Handler.php + custom deploy errors

use thiserror::Error;

#[derive(Debug, Error)]
pub enum DeployError {
    #[error("Git clone failed: {0}")]
    GitClone(String),

    #[error("Git pull failed: {0}")]
    GitPull(String),

    #[error("Build failed: {0}")]
    Build(String),

    #[error("Docker error: {0}")]
    Docker(String),

    #[error("SSH connection failed: {0}")]
    Ssh(String),

    #[error("Application not found: {0}")]
    NotFound(String),

    #[error("Server not reachable: {0}")]
    ServerUnreachable(String),

    #[error("Timeout after {0}s")]
    Timeout(u64),

    #[error("Health check failed: {0}")]
    HealthCheck(String),

    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),

    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("Unknown error: {0}")]
    Unknown(String),
}

impl DeployError {
    pub fn is_retryable(&self) -> bool {
        matches!(
            self,
            DeployError::Timeout(_) | DeployError::ServerUnreachable(_)
        )
    }
}
