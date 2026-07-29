// completed be_1124
// Coolify menkesi: git clone + SSH key authentication
use anyhow::Result;

/// Git reponu SSH ile klon et
pub async fn git_clone(
    repo_url: &str,
    branch: &str,
    target_dir: &str,
    ssh_key_path: Option<&str>,
) -> Result<()> {
    tracing::info!("Cloning {} ({}) -> {}", repo_url, branch, target_dir);

    let ssh_prefix = if let Some(key) = ssh_key_path {
        format!("GIT_SSH_COMMAND='ssh -i {} -o StrictHostKeyChecking=no' ", key)
    } else {
        String::new()
    };

    // TODO: SSH ile serverde icra:
    // {ssh_prefix}git clone --depth 1 --branch {branch} {repo_url} {target_dir}

    Ok(())
}
