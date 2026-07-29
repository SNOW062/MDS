// completed file_0385
// Coolify mənbəsi: app/Actions/Server/InstallPrerequisites.php
use anyhow::{Result, anyhow};
use rc_core::ssh::client::SshClient;
use tracing::info;

pub struct InstallPrerequisites;

impl InstallPrerequisites {
    /// Serverin OS növünə əsasən (apt, dnf, pacman, zypper) əskik olan kommunalları (curl, git, jq, wget) quraşdırır
    pub async fn handle(ssh_client: &SshClient, os_family: &str) -> Result<()> {
        info!("Installing prerequisites on server {} ({})", ssh_client.host, os_family);

        let script = match os_family.to_lowercase().as_str() {
            "debian" | "ubuntu" => r#"
                apt-get update -y &&
                command -v curl >/dev/null || apt-get install -y curl &&
                command -v wget >/dev/null || apt-get install -y wget &&
                command -v git >/dev/null || apt-get install -y git &&
                command -v jq >/dev/null || apt-get install -y jq
            "#,
            "rhel" | "centos" | "fedora" => r#"
                command -v curl >/dev/null || dnf install -y curl &&
                command -v wget >/dev/null || dnf install -y wget &&
                command -v git >/dev/null || dnf install -y git &&
                command -v jq >/dev/null || dnf install -y jq
            "#,
            "arch" => r#"
                pacman -Syu --noconfirm --needed curl wget git jq
            "#,
            "sles" | "opensuse" => r#"
                zypper update -y &&
                command -v curl >/dev/null || zypper install -y curl &&
                command -v wget >/dev/null || zypper install -y wget &&
                command -v git >/dev/null || zypper install -y git &&
                command -v jq >/dev/null || zypper install -y jq
            "#,
            _ => return Err(anyhow!("Unsupported OS type for prerequisites installation: {}", os_family)),
        };

        info!("Executing prerequisites install script for {}", os_family);
        ssh_client.execute_cmd(script.trim()).await?;

        info!("Prerequisites installed successfully on server {}", ssh_client.host);
        Ok(())
    }
}
