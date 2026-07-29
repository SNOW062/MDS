// completed be_1128
// Coolify menkesi: webhook payload-dan git melumat cixarir

use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WebhookGitInfo {
    pub repository: String,
    pub branch: String,
    pub commit_sha: String,
    pub commit_message: String,
    pub author: String,
    pub pr_number: Option<u32>,
}

/// GitHub webhook payload-dan git melumat cixar
pub fn extract_from_github(payload: &serde_json::Value) -> Option<WebhookGitInfo> {
    let repo = payload["repository"]["clone_url"].as_str()?.to_string();
    let r#ref = payload["ref"].as_str().unwrap_or("refs/heads/main");
    let branch = r#ref.trim_start_matches("refs/heads/").to_string();
    let commit_sha = payload["after"].as_str().unwrap_or("").to_string();
    let commit_message = payload["head_commit"]["message"].as_str().unwrap_or("").to_string();
    let author = payload["head_commit"]["author"]["name"].as_str().unwrap_or("").to_string();

    Some(WebhookGitInfo {
        repository: repo,
        branch,
        commit_sha,
        commit_message,
        author,
        pr_number: None,
    })
}

/// GitLab webhook payload-dan git melumat cixar
pub fn extract_from_gitlab(payload: &serde_json::Value) -> Option<WebhookGitInfo> {
    let repo = payload["repository"]["git_http_url"].as_str()?.to_string();
    let r#ref = payload["ref"].as_str().unwrap_or("refs/heads/main");
    let branch = r#ref.trim_start_matches("refs/heads/").to_string();
    let commit_sha = payload["checkout_sha"].as_str().unwrap_or("").to_string();
    let commit_message = payload["commits"][0]["message"].as_str().unwrap_or("").to_string();
    let author = payload["user_name"].as_str().unwrap_or("").to_string();

    Some(WebhookGitInfo {
        repository: repo,
        branch,
        commit_sha,
        commit_message,
        author,
        pr_number: None,
    })
}
