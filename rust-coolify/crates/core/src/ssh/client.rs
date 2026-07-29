// completed be_1068
// Coolify mənbəsi: app/Actions/CoolifyTask/RunRemoteProcess.php
use anyhow::{Result, anyhow};
use std::process::Command;

pub struct SshClient {
    pub host: String,
    pub port: u16,
    pub user: String,
    pub private_key_path: Option<String>,
}

impl SshClient {
    pub fn new(host: String, port: u16, user: String, private_key_path: Option<String>) -> Self {
        Self {
            host,
            port,
            user,
            private_key_path,
        }
    }

    /// Uzaq serverdə SSH əmri icra edir
    pub async fn execute_cmd(&self, command: &str) -> Result<String> {
        let mut ssh_args = vec![
            "-o".to_string(), "StrictHostKeyChecking=no".to_string(),
            "-o".to_string(), "UserKnownHostsFile=/dev/null".to_string(),
            "-p".to_string(), self.port.to_string(),
        ];

        if let Some(key_path) = &self.private_key_path {
            ssh_args.push("-i".to_string());
            ssh_args.push(key_path.clone());
        }

        let destination = format!("{}@{}", self.user, self.host);
        ssh_args.push(destination);
        ssh_args.push(command.to_string());

        let output = Command::new("ssh")
            .args(&ssh_args)
            .output()?;

        if output.status.success() {
            let stdout = String::from_utf8_lossy(&output.stdout).to_string();
            Ok(stdout)
        } else {
            let stderr = String::from_utf8_lossy(&output.stderr).to_string();
            Err(anyhow!("SSH execution failed on {}: {}", self.host, stderr))
        }
    }

    /// Uzaq serverə fayl kopyalayır (SCP/SFTP müqabili)
    pub async fn upload_file(&self, local_path: &str, remote_path: &str) -> Result<()> {
        let mut scp_args = vec![
            "-P".to_string(), self.port.to_string(),
            "-o".to_string(), "StrictHostKeyChecking=no".to_string(),
        ];

        if let Some(key_path) = &self.private_key_path {
            scp_args.push("-i".to_string());
            scp_args.push(key_path.clone());
        }

        let destination = format!("{}@{}:{}", self.user, self.host, remote_path);
        scp_args.push(local_path.to_string());
        scp_args.push(destination);

        let output = Command::new("scp")
            .args(&scp_args)
            .output()?;

        if output.status.success() {
            Ok(())
        } else {
            let stderr = String::from_utf8_lossy(&output.stderr).to_string();
            Err(anyhow!("SCP upload failed: {}", stderr))
        }
    }
}
