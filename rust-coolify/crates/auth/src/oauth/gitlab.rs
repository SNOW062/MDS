// completed be_1045
//! GitLab OAuth2 flow.
//! Coolify reference: OauthSetting.php (provider='gitlab'), OauthController.php

use serde::{Deserialize, Serialize};

/// GitLab OAuth2 user info (from /api/v4/user endpoint).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GitlabUser {
    pub id: i64,
    pub username: String,
    pub email: Option<String>,
    pub name: Option<String>,
    pub avatar_url: Option<String>,
}

/// Build the GitLab OAuth authorization URL.
/// Uses base_url (default: https://gitlab.com) for self-hosted GitLab support.
pub fn gitlab_auth_url(
    client_id: &str,
    redirect_uri: &str,
    state: &str,
    base_url: Option<&str>,
) -> String {
    let base = base_url.unwrap_or("https://gitlab.com");
    format!(
        "{}/oauth/authorize?client_id={}&redirect_uri={}&response_type=code&scope=read_user+email&state={}",
        base, client_id, redirect_uri, state
    )
}

/// Exchange GitLab OAuth code for a user profile.
pub async fn exchange_code(
    client_id: &str,
    client_secret: &str,
    code: &str,
    redirect_uri: &str,
    base_url: Option<&str>,
) -> anyhow::Result<GitlabUser> {
    let base = base_url.unwrap_or("https://gitlab.com");
    let client = reqwest::Client::new();

    let token_resp: serde_json::Value = client
        .post(format!("{}/oauth/token", base))
        .json(&serde_json::json!({
            "client_id": client_id,
            "client_secret": client_secret,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": redirect_uri,
        }))
        .send()
        .await?
        .json()
        .await?;

    let access_token = token_resp["access_token"]
        .as_str()
        .ok_or_else(|| anyhow::anyhow!("No access_token in GitLab response"))?;

    let user: GitlabUser = client
        .get(format!("{}/api/v4/user", base))
        .header("Authorization", format!("Bearer {}", access_token))
        .send()
        .await?
        .json()
        .await?;

    Ok(user)
}
