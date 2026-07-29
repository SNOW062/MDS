// completed be_1071
// Coolify mənbəsi: app/Helpers/SshMultiplexingHelper.php
use anyhow::{Result, anyhow};
use std::path::PathBuf;
use std::process::Command;
use tracing::info;

pub struct SshMultiplexer;

impl SshMultiplexer {
    /// Server üçün SSH ControlPath (socket faylı) yolunu generasiya edir
    pub fn socket_path(server_ip: &str, user: &str, port: u16) -> PathBuf {
        let filename = format!("mux-{}-{}-{}", user, server_ip, port);
        std::env::temp_dir().join(filename)
    }

    /// ControlMaster=auto və ControlPersist=10m vasitəsilə təkrar istifadə oluna bilən SSH socket yaratmaq
    pub fn generate_ssh_mux_args(
        server_ip: &str,
        user: &str,
        port: u16,
        private_key_path: Option<&str>,
    ) -> Vec<String> {
        let sock = Self::socket_path(server_ip, user, port);
        let mut args = vec![
            "-o".to_string(), "ControlMaster=auto".to_string(),
            "-o".to_string(), format!("ControlPath={}", sock.to_string_lossy()),
            "-o".to_string(), "ControlPersist=10m".to_string(),
            "-o".to_string(), "StrictHostKeyChecking=no".to_string(),
            "-o".to_string(), "UserKnownHostsFile=/dev/null".to_string(),
            "-p".to_string(), port.to_string(),
        ];

        if let Some(key) = private_key_path {
            args.push("-i".to_string());
            args.push(key.to_string());
        }

        args
    }

    /// Aktiv SSH ControlMaster socket-inin canlı olub-olmadığını yoxlayır
    pub fn check_connection(server_ip: &str, user: &str, port: u16) -> bool {
        let sock = Self::socket_path(server_ip, user, port);
        let check_cmd = format!("ssh -O check -o ControlPath={} {}@{}", sock.to_string_lossy(), user, server_ip);

        let output = Command::new("sh").arg("-c").arg(&check_cmd).output();
        match output {
            Ok(out) => out.status.success(),
            Err(_) => false,
        }
    }

    /// Aktiv SSH master bağlantısını bağlayır (ControlMaster exit)
    pub fn close_connection(server_ip: &str, user: &str, port: u16) -> Result<()> {
        let sock = Self::socket_path(server_ip, user, port);
        let exit_cmd = format!("ssh -O exit -o ControlPath={} {}@{} 2>/dev/null || true", sock.to_string_lossy(), user, server_ip);

        info!("Closing SSH multiplexed connection for {}@{}", user, server_ip);
        Command::new("sh").arg("-c").arg(&exit_cmd).output()?;
        Ok(())
    }
}
