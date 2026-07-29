// completed be_1127
use anyhow::Result;

/// Movcud repo-nu yenile
pub async fn git_pull(repo_dir: &str, branch: &str) -> Result<()> {
    tracing::info!("Pulling {} in {}", branch, repo_dir);
    // TODO: git -C {repo_dir} pull origin {branch}
    Ok(())
}
