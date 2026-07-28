// completed be_1046
//! Google OAuth2 flow.
//! Coolify reference: OauthSetting.php (provider='google'), OauthController.php

use serde::{Deserialize, Serialize};

/// Google user info (from /oauth2/v2/userinfo endpoint).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GoogleUser {
    pub id: String,
    pub email: Option<String>,
    pub name: Option<String>,
    pub picture: Option<String>,
}

/// Build the Google OAuth2 authorization URL.
pub fn google_auth_url(client_id: &str, redirect_uri: &str, state: &str) -> String {
    format!(
        "https://accounts.google.com/o/oauth2/v2/auth?client_id={}&redirect_uri={}&response_type=code&scope=openid+email+profile&state={}",
        client_id, redirect_uri, state
    )
}

/// Exchange Google OAuth2 code for a user profile.
pub async fn exchange_code(
    client_id: &str,
    client_secret: &str,
    code: &str,
    redirect_uri: &str,
) -> anyhow::Result<GoogleUser> {
    let client = reqwest::Client::new();

    let token_resp: serde_json::Value = client
        .post("https://oauth2.googleapis.com/token")
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
        .ok_or_else(|| anyhow::anyhow!("No access_token in Google response"))?;

    let user: GoogleUser = client
        .get("https://www.googleapis.com/oauth2/v2/userinfo")
        .header("Authorization", format!("Bearer {}", access_token))
        .send()
        .await?
        .json()
        .await?;

    Ok(user)
}
