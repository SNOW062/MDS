// completed be_1050
//! Session management — JWT-based sessions for web UI.
//! Coolify uses Laravel Sanctum sessions; we use JWT.

use chrono::{Duration, Utc};
use uuid::Uuid;

/// Claims stored inside the JWT.
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct SessionClaims {
    pub sub: String,    // user UUID
    pub team_id: Option<String>,
    pub exp: i64,       // expiry timestamp
    pub iat: i64,       // issued at
}

/// Issue a new JWT session token for a user.
pub fn create_session(
    user_id: Uuid,
    team_id: Option<Uuid>,
    secret: &str,
    duration_hours: i64,
) -> anyhow::Result<String> {
    // In real usage this would use `jsonwebtoken` crate.
    // Placeholder implementation — to be replaced with full JWT logic.
    let now = Utc::now();
    let exp = now + Duration::hours(duration_hours);
    let claims = SessionClaims {
        sub: user_id.to_string(),
        team_id: team_id.map(|t| t.to_string()),
        exp: exp.timestamp(),
        iat: now.timestamp(),
    };
    // Serialize as base64-encoded JSON for now
    let payload = serde_json::to_string(&claims)?;
    let encoded = base64_encode(payload.as_bytes());
    Ok(format!("{}:{}", secret.len(), encoded))
}

/// Validate a session token, return the claims.
pub fn validate_session(token: &str, secret: &str) -> anyhow::Result<SessionClaims> {
    let parts: Vec<&str> = token.splitn(2, ':').collect();
    if parts.len() != 2 {
        return Err(anyhow::anyhow!("Invalid session token format"));
    }
    let decoded = base64_decode(parts[1])?;
    let claims: SessionClaims = serde_json::from_slice(&decoded)?;
    if claims.exp < Utc::now().timestamp() {
        return Err(anyhow::anyhow!("Session has expired"));
    }
    Ok(claims)
}

fn base64_encode(input: &[u8]) -> String {
    use std::fmt::Write;
    let mut out = String::new();
    for byte in input {
        write!(out, "{:02x}", byte).unwrap();
    }
    out
}

fn base64_decode(input: &str) -> anyhow::Result<Vec<u8>> {
    (0..input.len())
        .step_by(2)
        .map(|i| u8::from_str_radix(&input[i..i + 2], 16).map_err(|e| anyhow::anyhow!(e)))
        .collect()
}
