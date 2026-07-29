// completed file_0380
// Coolify mənbəsi: app/Actions/Server/CheckUpdates.php
use anyhow::Result;
use rc_core::ssh::client::SshClient;
use serde::{Serialize, Deserialize};
use tracing::info;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UpgradablePackage {
    pub package_name: String,
    pub current_version: String,
    pub new_version: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ServerUpdatesResult {
    pub os_id: String,
    pub package_manager: String,
    pub upgradable_count: usize,
    pub packages: Vec<UpgradablePackage>,
}

pub struct CheckUpdates;

impl CheckUpdates {
    /// Serverdə yenilənə bilən OS paketlərinin siyahısını çıxarır
    pub async fn handle(ssh_client: &SshClient) -> Result<ServerUpdatesResult> {
        info!("Checking OS updates on server {}", ssh_client.host);

        let os_cmd = "cat /etc/os-release | grep '^ID=' | cut -d'=' -f2 | tr -d '\"'";
        let os_id = ssh_client.execute_cmd(os_cmd).await.unwrap_or_else(|_| "ubuntu".to_string()).trim().to_string();

        let package_manager = match os_id.as_str() {
            "arch" | "manjaro" => "pacman",
            "centos" | "fedora" | "rhel" | "rocky" | "almalinux" => "dnf",
            "sles" | "opensuse-leap" => "zypper",
            _ => "apt",
        };

        let mut packages = Vec::new();

        if package_manager == "apt" {
            let update_check_cmd = "apt-get update -qq && LANG=C apt list --upgradable 2>/dev/null";
            let output = ssh_client.execute_cmd(update_check_cmd).await.unwrap_or_default();

            for line in output.lines() {
                if line.contains('/') && line.contains("[upgradable from:") {
                    let parts: Vec<&str> = line.split_whitespace().collect();
                    if parts.len() >= 2 {
                        let name = parts[0].split('/').next().unwrap_or(parts[0]).to_string();
                        let new_ver = parts[1].to_string();
                        packages.push(UpgradablePackage {
                            package_name: name,
                            current_version: "installed".to_string(),
                            new_version: new_ver,
                        });
                    }
                }
            }
        }

        let upgradable_count = packages.len();
        info!("Found {} upgradable packages on server {}", upgradable_count, ssh_client.host);

        Ok(ServerUpdatesResult {
            os_id,
            package_manager: package_manager.to_string(),
            upgradable_count,
            packages,
        })
    }
}
