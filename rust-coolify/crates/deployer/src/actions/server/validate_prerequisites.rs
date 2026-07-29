// completed file_0394
// Coolify mənbəsi: app/Actions/Server/ValidatePrerequisites.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use tracing::info;

pub struct PrerequisitesResult {
    pub success: bool,
    pub missing_commands: Vec<String>,
    pub found_commands: Vec<String>,
}

pub struct ValidatePrerequisites;

impl ValidatePrerequisites {
    /// Serverdə tələb olunan sistem komandalarının (curl, git, jq, tar) olub-olmadığını yoxlayır
    pub async fn handle(ssh_client: &SshClient) -> Result<PrerequisitesResult> {
        info!("Validating prerequisites on server {}", ssh_client.host);

        let required = vec!["curl", "git", "jq", "tar"];
        let mut missing = Vec::new();
        let mut found = Vec::new();

        for cmd in required {
            let check_cmd = format!("command -v {} 2>/dev/null || echo ''", cmd);
            let output = ssh_client.execute_cmd(&check_cmd).await.unwrap_or_default();

            if output.trim().is_empty() {
                missing.push(cmd.to_string());
            } else {
                found.push(cmd.to_string());
            }
        }

        let success = missing.is_empty();
        info!("Prerequisites check on {}: success={}, missing={:?}", ssh_client.host, success, missing);

        Ok(PrerequisitesResult {
            success,
            missing_commands: missing,
            found_commands: found,
        })
    }
}
