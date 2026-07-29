// completed be_1063
// SSH Connection & Command Execution Retry Strategy for MasterDeploy Core

use std::time::Duration;
use anyhow::{Result, anyhow};
use tokio::time::sleep;

#[derive(Debug, Clone)]
pub struct SshRetryPolicy {
    pub max_retries: u32,
    pub initial_delay: Duration,
    pub max_delay: Duration,
    pub backoff_factor: f64,
}

impl Default for SshRetryPolicy {
    fn default() -> Self {
        Self {
            max_retries: 5,
            initial_delay: Duration::from_millis(500),
            max_delay: Duration::from_secs(10),
            backoff_factor: 2.0,
        }
    }
}

/// Dynamic closure əmrlərini exponential backoff ilə təkrar sınayan wrapper
pub async fn execute_with_retry<F, Fut, T, E>(policy: SshRetryPolicy, mut operation: F) -> Result<T>
where
    F: FnMut() -> Fut,
    Fut: std::future::Future<Output = std::result::Result<T, E>>,
    E: std::fmt::Display,
{
    let mut current_delay = policy.initial_delay;
    let mut attempts = 0;

    loop {
        attempts += 1;
        match operation().await {
            Ok(result) => return Ok(result),
            Err(err) => {
                if attempts >= policy.max_retries {
                    tracing::error!("SSH operation failed after {} attempts. Last error: {}", attempts, err);
                    return Err(anyhow!("SSH retry exhausted after {} attempts: {}", attempts, err));
                }

                tracing::warn!(
                    "SSH command attempt {} failed ({}), retrying in {:?}...",
                    attempts, err, current_delay
                );

                sleep(current_delay).await;
                current_delay = std::cmp::min(
                    Duration::from_secs_f64(current_delay.as_secs_f64() * policy.backoff_factor),
                    policy.max_delay,
                );
            }
        }
    }
}

pub async fn retry_ssh() -> Result<()> {
    let policy = SshRetryPolicy::default();
    execute_with_retry(policy, || async {
        // Simple ping test operation
        Ok(())
    }).await
}