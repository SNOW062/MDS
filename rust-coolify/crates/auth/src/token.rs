// completed be_1054
//! API Token management — mirrors Coolify's PersonalAccessToken (Laravel Sanctum).
//!
//! Coolify token fields:
//!   name, token (hash), abilities, expires_at,
//!   api_token_expiration_warning_sent_at, team_id
//!
//! Token format: "rc_" + 40 random hex chars (e.g. rc_a3f9...)

use chrono::{DateTime, Utc};
use sha2::{Digest, Sha256};
use rand::Rng;
use uuid::Uuid;
use sqlx::PgPool;

/// Internal representation of a stored API token.
#[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct ApiToken {
    pub id: Uuid,
    pub user_id: Uuid,
    pub team_id: Option<Uuid>,
    pub name: String,
    pub token_hash: String,
    pub abilities: Option<Vec<String>>,
    pub expires_at: Option<DateTime<Utc>>,
    pub api_token_expiration_warning_sent_at: Option<DateTime<Utc>>,
    pub last_used_at: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
}

/// Create a new API token. Returns (raw_token_string, stored_ApiToken).
/// The raw token is shown only once. Only the SHA-256 hash is stored.
pub async fn create_token(
    pool: &PgPool,
    user_id: Uuid,
    team_id: Option<Uuid>,
    name: &str,
    abilities: Vec<String>,
    expires_at: Option<DateTime<Utc>>,
) -> anyhow::Result<(String, ApiToken)> {
    // Generate "rc_" + 40 random hex chars
    let random_bytes: Vec<u8> = rand::thread_rng()
        .sample_iter(&rand::distributions::Uniform::from(0u8..=255u8))
        .take(20)
        .collect();
    let raw_token = format!("rc_{}", hex::encode(&random_bytes));

    // Hash for storage (SHA-256, same pattern as Sanctum)
    let token_hash = format!("{:x}", Sha256::digest(raw_token.as_bytes()));

    let abilities_json = serde_json::to_value(&abilities)?;

    let token = sqlx::query_as::<_, ApiToken>(
        r#"INSERT INTO api_tokens
           (id, user_id, team_id, name, token_hash, abilities, expires_at, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
           RETURNING *"#,
    )
    .bind(Uuid::new_v4())
    .bind(user_id)
    .bind(team_id)
    .bind(name)
    .bind(&token_hash)
    .bind(abilities_json)
    .bind(expires_at)
    .fetch_one(pool)
    .await?;

    Ok((raw_token, token))
}

/// Verify a raw token string. Hash it, find in DB, update last_used_at.
pub async fn verify_token(pool: &PgPool, raw_token: &str) -> anyhow::Result<ApiToken> {
    let token_hash = format!("{:x}", Sha256::digest(raw_token.as_bytes()));

    let token = sqlx::query_as::<_, ApiToken>(
        "SELECT * FROM api_tokens WHERE token_hash = $1",
    )
    .bind(&token_hash)
    .fetch_optional(pool)
    .await?
    .ok_or_else(|| anyhow::anyhow!("Invalid or expired token"))?;

    // Check expiry
    if let Some(exp) = token.expires_at {
        if exp < Utc::now() {
            return Err(anyhow::anyhow!("Token has expired"));
        }
    }

    // Update last_used_at
    sqlx::query("UPDATE api_tokens SET last_used_at = NOW() WHERE id = $1")
        .bind(token.id)
        .execute(pool)
        .await?;

    Ok(token)
}

/// Revoke (delete) a token by its ID.
pub async fn revoke_token(pool: &PgPool, token_id: Uuid) -> anyhow::Result<()> {
    sqlx::query("DELETE FROM api_tokens WHERE id = $1")
        .bind(token_id)
        .execute(pool)
        .await?;
    Ok(())
}

/// List all tokens for a user.
pub async fn list_tokens(pool: &PgPool, user_id: Uuid) -> anyhow::Result<Vec<ApiToken>> {
    let tokens = sqlx::query_as::<_, ApiToken>(
        "SELECT * FROM api_tokens WHERE user_id = $1 ORDER BY created_at DESC",
    )
    .bind(user_id)
    .fetch_all(pool)
    .await?;
    Ok(tokens)
}
