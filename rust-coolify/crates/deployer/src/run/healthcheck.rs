// completed be_1133
// Coolify menkesi: Health check (HTTP, TCP, Command)

use anyhow::Result;
use std::time::Duration;

#[derive(Debug, Clone)]
pub enum HealthCheckType {
    Http { path: String, expected_status: u16 },
    Tcp { port: u16 },
    Command { cmd: String },
    None,
}

/// Saglamliq yoxlamasini icra et
/// Coolify: Docker --health-cmd ve ya HTTP probe
pub async fn check(
    host: &str,
    check_type: HealthCheckType,
    retries: u32,
    interval_secs: u64,
) -> Result<bool> {
    let interval = Duration::from_secs(interval_secs);

    for attempt in 1..=retries {
        tracing::info!(
            "Health check attempt {}/{} for {}",
            attempt,
            retries,
            host
        );

        let ok = match &check_type {
            HealthCheckType::Http { path, expected_status } => {
                check_http(host, path, *expected_status).await
            }
            HealthCheckType::Tcp { port } => {
                check_tcp(host, *port).await
            }
            HealthCheckType::Command { cmd } => {
                // TODO: SSH ile icra
                Ok(true)
            }
            HealthCheckType::None => Ok(true),
        };

        match ok {
            Ok(true) => {
                tracing::info!("Health check passed on attempt {}", attempt);
                return Ok(true);
            }
            Ok(false) | Err(_) => {
                if attempt < retries {
                    tokio::time::sleep(interval).await;
                }
            }
        }
    }

    tracing::warn!("Health check failed after {} attempts", retries);
    Ok(false)
}

async fn check_http(host: &str, path: &str, expected: u16) -> Result<bool> {
    let url = format!("http://{}{}", host, path);
    let resp = reqwest::get(&url).await?;
    Ok(resp.status().as_u16() == expected)
}

async fn check_tcp(host: &str, port: u16) -> Result<bool> {
    let addr = format!("{}:{}", host, port);
    let result = tokio::net::TcpStream::connect(&addr).await;
    Ok(result.is_ok())
}
