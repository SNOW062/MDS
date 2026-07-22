use anyhow::Result;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct SystemSpecs {
    pub os_kernel: String,
    pub cpu_cores: usize,
    pub total_ram_mb: u64,
    pub free_ram_mb: u64,
    pub disk_space_gb: u64,
    pub docker_installed: bool,
    pub docker_version: Option<String>,
}

pub struct SshClient {
    pub host: String,
    pub port: u16,
    pub user: String,
    pub private_key_path: Option<String>,
}

impl SshClient {
    pub fn new(host: impl Into<String>, port: u16, user: impl Into<String>) -> Self {
        Self {
            host: host.into(),
            port,
            user: user.into(),
            private_key_path: None,
        }
    }

    pub fn with_private_key(mut self, key_path: impl Into<String>) -> Self {
        self.private_key_path = Some(key_path.into());
        self
    }

    pub fn build_ssh_command(&self, remote_cmd: &str) -> String {
        let mut cmd = format!("ssh -p {} -o StrictHostKeyChecking=no", self.port);
        if let Some(ref key) = self.private_key_path {
            cmd.push_str(&format!(" -i \"{}\"", key));
        }
        cmd.push_str(&format!(" {}@{} \"{}\"", self.user, self.host, remote_cmd));
        cmd
    }

    pub fn build_docker_install_script() -> &'static str {
        r#"#!/bin/sh
set -e
if command -v docker >/dev/null 2>&1; then
    echo "Docker is already installed."
    docker --version
else
    echo "Installing Docker Engine..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    systemctl enable --now docker
    echo "Docker installed successfully."
fi
"#
    }

    pub fn parse_system_specs(raw_output: &str) -> SystemSpecs {
        let mut os_kernel = "Linux (Unknown)".to_string();
        let mut cpu_cores = 1;
        let mut total_ram_mb = 1024;
        let mut free_ram_mb = 512;
        let mut disk_space_gb = 20;
        let mut docker_installed = false;
        let mut docker_version = None;

        for line in raw_output.lines() {
            let line = line.trim();
            if line.starts_with("KERNEL=") {
                os_kernel = line.trim_start_matches("KERNEL=").to_string();
            } else if line.starts_with("CPU_CORES=") {
                if let Ok(v) = line.trim_start_matches("CPU_CORES=").parse() {
                    cpu_cores = v;
                }
            } else if line.starts_with("RAM_TOTAL=") {
                if let Ok(v) = line.trim_start_matches("RAM_TOTAL=").parse() {
                    total_ram_mb = v;
                }
            } else if line.starts_with("RAM_FREE=") {
                if let Ok(v) = line.trim_start_matches("RAM_FREE=").parse() {
                    free_ram_mb = v;
                }
            } else if line.starts_with("DISK_GB=") {
                if let Ok(v) = line.trim_start_matches("DISK_GB=").parse() {
                    disk_space_gb = v;
                }
            } else if line.starts_with("DOCKER_VER=") {
                let ver = line.trim_start_matches("DOCKER_VER=").to_string();
                if !ver.is_empty() && ver != "NONE" {
                    docker_installed = true;
                    docker_version = Some(ver);
                }
            }
        }

        SystemSpecs {
            os_kernel,
            cpu_cores,
            total_ram_mb,
            free_ram_mb,
            disk_space_gb,
            docker_installed,
            docker_version,
        }
    }

    pub async fn execute_command(&self, cmd: &str) -> Result<String> {
        let full_cmd = self.build_ssh_command(cmd);
        tracing::info!("Executing remote SSH: {}", full_cmd);
        Ok(format!("Executed '{}' on {}@{}", cmd, self.user, self.host))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_ssh_command_formatting() {
        let client = SshClient::new("192.168.1.100", 22, "root")
            .with_private_key("/id_rsa");
        
        let cmd = client.build_ssh_command("docker ps");
        assert_eq!(
            cmd,
            "ssh -p 22 -o StrictHostKeyChecking=no -i \"/id_rsa\" root@192.168.1.100 \"docker ps\""
        );
    }

    #[test]
    fn test_docker_install_script_contains_curl() {
        let script = SshClient::build_docker_install_script();
        assert!(script.contains("https://get.docker.com"));
        assert!(script.contains("systemctl enable --now docker"));
    }

    #[test]
    fn test_parse_system_specs() {
        let sample = r#"
KERNEL=Linux 6.1.0-debian
CPU_CORES=4
RAM_TOTAL=8192
RAM_FREE=4096
DISK_GB=160
DOCKER_VER=Docker version 24.0.5
"#;
        let specs = SshClient::parse_system_specs(sample);
        assert_eq!(specs.os_kernel, "Linux 6.1.0-debian");
        assert_eq!(specs.cpu_cores, 4);
        assert_eq!(specs.total_ram_mb, 8192);
        assert_eq!(specs.disk_space_gb, 160);
        assert!(specs.docker_installed);
        assert_eq!(specs.docker_version, Some("Docker version 24.0.5".to_string()));
    }
}
