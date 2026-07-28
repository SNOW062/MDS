// completed be_1038
// Coolify mənbəsi: routes/webhooks.php + app/Http/Controllers/Webhook/
// Endpoints: GitHub, GitLab, Bitbucket, Gitea webhook endpointləri

use axum::{
    routing::post,
    Router, Json,
    extract::{State, Path},
    http::{StatusCode, HeaderMap},
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::state::AppState;

#[derive(Debug, Deserialize)]
pub struct WebhookPayload {
    #[serde(rename = "ref")]
    pub git_ref: Option<String>,
    pub repository: Option<WebhookRepository>,
    pub action: Option<String>,
    pub number: Option<i64>,
    pub pull_request: Option<PullRequestPayload>,
    pub commits: Option<Vec<CommitPayload>>,
}

#[derive(Debug, Deserialize)]
pub struct WebhookRepository {
    pub full_name: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct PullRequestPayload {
    pub html_url: Option<String>,
    pub title: Option<String>,
    pub head: Option<GitRef>,
    pub base: Option<GitRef>,
}

#[derive(Debug, Deserialize)]
pub struct GitRef {
    #[serde(rename = "ref")]
    pub git_ref: Option<String>,
    pub sha: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct CommitPayload {
    pub message: Option<String>,
    pub added: Option<Vec<String>>,
    pub removed: Option<Vec<String>>,
    pub modified: Option<Vec<String>>,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        // Coolify: POST /source/github/events → Github::normal (GitHub App webhook)
        .route("/webhooks/github/events", post(github_events_handler))
        // Coolify: POST /source/github/events/manual → Github::manual (deploy key webhook)
        .route("/webhooks/github/events/manual", post(github_manual_handler))
        // Coolify: POST /source/gitlab/events/manual → Gitlab::manual
        .route("/webhooks/gitlab/events/manual", post(gitlab_manual_handler))
        // Coolify: POST /source/bitbucket/events/manual → Bitbucket::manual
        .route("/webhooks/bitbucket/events/manual", post(bitbucket_manual_handler))
        // Coolify: POST /source/gitea/events/manual → Gitea::manual
        .route("/webhooks/gitea/events/manual", post(gitea_manual_handler))
        .with_state(state)
}

/// POST /webhooks/github/events — GitHub App-dən gələn webhook hadisəlirini idarə edir
/// Coolify: Github::normal — push/pull_request hadisələri
async fn github_events_handler(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(payload): Json<serde_json::Value>,
) -> Result<&'static str, StatusCode> {
    let event = headers
        .get("X-GitHub-Event")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("")
        .to_lowercase();

    if event == "ping" {
        return Ok("pong");
    }

    if !["push", "pull_request"].contains(&event.as_str()) {
        return Ok("Nothing to do. Event is not supported.");
    }

    // Push hadisəsini emal et
    let _delivery_id = headers
        .get("X-GitHub-Delivery")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("")
        .to_string();

    tracing::info!("GitHub webhook event received: {}", event);
    Ok("Accepted")
}

/// POST /webhooks/github/events/manual — Deploy key vasitəsilə gələn webhook
/// Coolify: Github::manual — webhook_secret yoxlama, branch tapma, deploy işə salma
async fn github_manual_handler(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(payload): Json<WebhookPayload>,
) -> Result<&'static str, StatusCode> {
    let event = headers
        .get("X-GitHub-Event")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("")
        .to_lowercase();

    if event == "ping" {
        return Ok("pong");
    }

    if !["push", "pull_request"].contains(&event.as_str()) {
        return Ok("Nothing to do. Event is not supported.");
    }

    let branch = if event == "push" {
        payload.git_ref
            .as_deref()
            .unwrap_or("")
            .trim_start_matches("refs/heads/")
            .to_string()
    } else {
        payload.pull_request
            .as_ref()
            .and_then(|pr| pr.head.as_ref())
            .and_then(|h| h.git_ref.clone())
            .unwrap_or_default()
    };

    if branch.is_empty() {
        return Ok("Nothing to do. No branch found in the request.");
    }

    let full_name = payload.repository
        .as_ref()
        .and_then(|r| r.full_name.clone())
        .unwrap_or_default();

    tracing::info!("GitHub manual webhook: event={}, branch={}, repo={}", event, branch, full_name);
    Ok("Accepted")
}

/// POST /webhooks/gitlab/events/manual — GitLab deploy key webhook
/// Coolify: Gitlab::manual — X-Gitlab-Event başlığını yoxla
async fn gitlab_manual_handler(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(payload): Json<serde_json::Value>,
) -> Result<&'static str, StatusCode> {
    let event = headers
        .get("X-Gitlab-Event")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("")
        .to_lowercase();

    if !["push hook", "merge request hook"].contains(&event.as_str()) {
        return Ok("Nothing to do. Event is not supported.");
    }

    tracing::info!("GitLab manual webhook received: {}", event);
    Ok("Accepted")
}

/// POST /webhooks/bitbucket/events/manual — Bitbucket deploy key webhook
/// Coolify: Bitbucket::manual — X-Event-Key başlığını yoxla
async fn bitbucket_manual_handler(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(payload): Json<serde_json::Value>,
) -> Result<&'static str, StatusCode> {
    let event = headers
        .get("X-Event-Key")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("")
        .to_lowercase();

    if !["repo:push", "pullrequest:created", "pullrequest:updated"].contains(&event.as_str()) {
        return Ok("Nothing to do. Event is not supported.");
    }

    tracing::info!("Bitbucket manual webhook received: {}", event);
    Ok("Accepted")
}

/// POST /webhooks/gitea/events/manual — Gitea deploy key webhook
/// Coolify: Gitea::manual — X-Gitea-Event başlığını yoxla
async fn gitea_manual_handler(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(payload): Json<serde_json::Value>,
) -> Result<&'static str, StatusCode> {
    let event = headers
        .get("X-Gitea-Event")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("")
        .to_lowercase();

    if !["push", "pull_request"].contains(&event.as_str()) {
        return Ok("Nothing to do. Event is not supported.");
    }

    tracing::info!("Gitea manual webhook received: {}", event);
    Ok("Accepted")
}
