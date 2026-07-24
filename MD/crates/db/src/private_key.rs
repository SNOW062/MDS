use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct PrivateKey {
    pub id: String,
    pub uuid: String,
    pub name: String,
    pub description: Option<String>,
    pub private_key: String,
    pub public_key: String,
    pub is_git_related: Option<bool>,
    pub is_default: Option<bool>,
    pub created_at: Option<i64>,
}

#[derive(Debug, Deserialize)]
pub struct CreatePrivateKeyDto {
    pub name: String,
    pub description: Option<String>,
    pub private_key: Option<String>,
    pub key_type: Option<String>, // "ed25519" or "rsa"
}
