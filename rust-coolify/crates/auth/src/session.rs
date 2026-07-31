// completed be_1050
//! Session management — JWT-based sessions for web UI.
//! Coolify uses Laravel Sanctum sessions; we use JWT.

use chrono::Utc;
use uuid::Uuid;
use crate::jwt::{generate_jwt, decode_jwt};

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
    let tid = team_id.unwrap_or_else(Uuid::nil);
    // Biz email-i boş ötürürük, lakin lazım gələrsə user modelindən oxuna bilər
    let token = generate_jwt(user_id, "", tid, secret)
        .map_err(|e| anyhow::anyhow!("JWT generation failed: {:?}", e))?;
    Ok(token)
}

/// Validate a session token, return the claims.
pub fn validate_session(token: &str, secret: &str) -> anyhow::Result<SessionClaims> {
    let claims = decode_jwt(token, secret)
        .map_err(|e| anyhow::anyhow!("JWT validation failed: {:?}", e))?;
    
    Ok(SessionClaims {
        sub: claims.sub.to_string(),
        team_id: Some(claims.team_id.to_string()),
        exp: claims.exp,
        iat: Utc::now().timestamp(),
    })
}
