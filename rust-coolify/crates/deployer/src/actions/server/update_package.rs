// completed file_0393
// Coolify mənbəsi: app/Actions/Server/UpdatePackage.php
use anyhow::{Result, anyhow};
use rc_core::ssh::client::SshClient;
use tracing::info;

pub struct UpdatePackage;

impl UpdatePackage {
    /// Serverdə OS paket meneceri (apt, dnf, pacman, zypper) vasitəsilə tək bir paketi və ya bütün paketləri yeniləyir
    pub async fn handle(
        ssh_client: &SshClient,
        package_manager: &str,
        package_name: Option<&str>,
        update_all: bool,
    ) -> Result<String> {
        info!("Updating packages on server {} (manager: {})", ssh_client.host, package_manager);

        let command = match package_manager.to_lowercase().as_str() {
            "apt" => {
                if update_all {
                    "apt update && apt upgrade -y".to_string()
                } else if let Some(pkg) = package_name {
                    format!("apt update && apt install -y {}", pkg)
                } else {
                    return Err(anyhow!("Package name required for apt update"));
                }
            }
            "dnf" | "yum" => {
                if update_all {
                    "dnf update -y".to_string()
                } else if let Some(pkg) = package_name {
                    format!("dnf update -y {}", pkg)
                } else {
                    return Err(anyhow!("Package name required for dnf update"));
                }
            }
            "pacman" => {
                if update_all {
                    "pacman -Syu --noconfirm".to_string()
                } else if let Some(pkg) = package_name {
                    format!("pacman -S --noconfirm {}", pkg)
                } else {
                    return Err(anyhow!("Package name required for pacman update"));
                }
            }
            "zypper" => {
                if update_all {
                    "zypper update -y".to_string()
                } else if let Some(pkg) = package_name {
                    format!("zypper install -y {}", pkg)
                } else {
                    return Err(anyhow!("Package name required for zypper update"));
                }
            }
            _ => return Err(anyhow!("Unsupported package manager: {}", package_manager)),
        };

        info!("Executing package update command: {}", command);
        let output = ssh_client.execute_cmd(&command).await?;

        info!("Packages updated successfully on server {}", ssh_client.host);
        Ok(output)
    }
}
