// completed be_1044
//! GitHub OAuth2 flow.
//! Coolify reference: OauthSetting.php (provider='github'), Http/Controllers/OauthController.php

use serde::{Deserialize, Serialize};

/// GitHub OAuth2 user info (from /user API).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GithubUser {
    pub id: i64,
    pub login: String,
    pub email: Option<String>,
    pub name: Option<String>,
    pub avatar_url: Option<String>,
}

/// Build the GitHub OAuth authorization URL.
/// Coolify scope: "user:email,read:user"
pub fn github_auth_url(client_id: &str, redirect_uri: &str, state: &str) -> String {
    format!(
        "https://github.com/login/oauth/authorize?client_id={}&redirect_uri={}&scope=user:email,read:user&state={}",
        client_id, redirect_uri, state
    )
}

/// Exchange the OAuth authorization code for a user profile.
pub async fn exchange_code(
    client_id: &str,
    client_secret: &str,
    code: &str,
    redirect_uri: &str,
) -> anyhow::Result<GithubUser> {
    let client = reqwest::Client::new();

    // 1. Get access token
    let token_resp: serde_json::Value = client
        .post("https://github.com/login/oauth/access_token")
        .header("Accept", "application/json")
        .json(&serde_json::json!({
            "client_id": client_id,
            "client_secret": client_secret,
            "code": code,
            "redirect_uri": redirect_uri,
        }))
        .send()
        .await?
        .json()
        .await?;

    let access_token = token_resp["access_token"]
        .as_str()
        .ok_or_else(|| anyhow::anyhow!("No access_token in GitHub response"))?;

    // 2. Get user profile
    let user: GithubUser = client
        .get("https://api.github.com/user")
        .header("Authorization", format!("Bearer {}", access_token))
        .header("User-Agent", "masterdeploy/1.0")
        .send()
        .await?
        .json()
        .await?;

    Ok(user)
}
