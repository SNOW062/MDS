// completed file_0495
// Coolify mənbəsi: app/Http/Controllers/Auth/OAuthController.php
// OAuth2 autentifikasiya akışı (GitHub, GitLab, Bitbucket, Gitea)

use axum::{
    routing::{get, post},
    Router, Json,
    extract::{Path, Query, State},
    http::StatusCode,
    response::Redirect,
};
use serde::{Serialize, Deserialize};
use crate::state::AppState;

#[derive(Debug, Deserialize)]
pub struct OAuthCallbackQuery {
    pub code: Option<String>,
    pub state: Option<String>,
    pub error: Option<String>,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        // OAuth redirect URL-ləri
        .route("/api/auth/oauth/:provider", get(oauth_redirect))
        .route("/api/auth/oauth/:provider/callback", get(oauth_callback))
        .with_state(state)
}

/// OAuth provayderinə yönləndir
/// Coolify: OAuthController::redirect() → Socialite::driver()->redirect()
async fn oauth_redirect(
    Path(provider): Path<String>,
) -> Result<Redirect, (StatusCode, Json<serde_json::Value>)> {
    let client_id = match provider.as_str() {
        "github" => std::env::var("GITHUB_CLIENT_ID").unwrap_or_default(),
        "gitlab" => std::env::var("GITLAB_CLIENT_ID").unwrap_or_default(),
        "bitbucket" => std::env::var("BITBUCKET_CLIENT_ID").unwrap_or_default(),
        "google" => std::env::var("GOOGLE_CLIENT_ID").unwrap_or_default(),
        _ => {
            return Err((
                StatusCode::BAD_REQUEST,
                Json(serde_json::json!({ "message": format!("Unsupported OAuth provider: {}", provider) })),
            ));
        }
    };

    if client_id.is_empty() {
        return Err((
            StatusCode::NOT_FOUND,
            Json(serde_json::json!({ "message": format!("{} OAuth is not configured.", provider) })),
        ));
    }

    let redirect_url = match provider.as_str() {
        "github" => format!(
            "https://github.com/login/oauth/authorize?client_id={}&scope=user:email",
            client_id
        ),
        "gitlab" => format!(
            "https://gitlab.com/oauth/authorize?client_id={}&response_type=code&scope=read_user",
            client_id
        ),
        _ => format!("https://{}.com/oauth/authorize?client_id={}", provider, client_id),
    };

    Ok(Redirect::temporary(&redirect_url))
}

/// OAuth callback — token mübadilə edir
/// Coolify: OAuthController::callback() → Socialite::driver()->user()
async fn oauth_callback(
    State(state): State<AppState>,
    Path(provider): Path<String>,
    Query(query): Query<OAuthCallbackQuery>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<serde_json::Value>)> {
    if let Some(error) = query.error {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(serde_json::json!({ "message": format!("OAuth error: {}", error) })),
        ));
    }

    let code = query.code.ok_or_else(|| (
        StatusCode::BAD_REQUEST,
        Json(serde_json::json!({ "message": "OAuth code missing." })),
    ))?;

    // TODO: Authorization code-u access token-ə çevir (reqwest ilə)
    // Bu, Coolify-dəki Socialite::driver()->user() əməliyyatının Rust ekvivalentidir

    Ok(Json(serde_json::json!({
        "message": "OAuth callback received. Token exchange not yet implemented.",
        "provider": provider,
        "code_received": true
    })))
}
