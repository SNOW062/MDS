// completed file_0384
// Coolify mənbəsi: app/Actions/Server/InstallDocker.php
use anyhow::{Result, anyhow};
use rc_core::ssh::client::SshClient;
use tracing::info;
use uuid::Uuid;
use sqlx::PgPool;

pub struct InstallDocker;

impl InstallDocker {
    /// Debian / Ubuntu ailəsi üçün Docker quraşdırma skripti
    pub fn get_debian_install_cmd() -> &'static str {
        r#"
        curl -fsSL https://get.docker.com -o get-docker.sh &&
        sh get-docker.sh
        "#.trim()
    }

    /// RHEL / CentOS / Fedora üçün Docker quraşdırma skripti
    pub fn get_rhel_install_cmd() -> &'static str {
        r#"
        dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo &&
        dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
        "#.trim()
    }

    /// Serverdə Docker Daemon konfiqurasiyası (daemon.json - log rotation max 10MB)
    pub fn generate_daemon_json() -> &'static str {
        r#"{"log-driver":"json-file","log-opts":{"max-size":"10m","max-file":"3"}}"#
    }

    /// Uzaq serverə SSH ilə qoşulub Docker Engine quraşdırır
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        ssh_client: &SshClient,
        os_family: &str,
    ) -> Result<()> {
        info!("Starting Docker installation on server {}", server_uuid);

        let install_cmd = match os_family.to_lowercase().as_str() {
            "rhel" | "centos" | "fedora" => Self::get_rhel_install_cmd(),
            _ => Self::get_debian_install_cmd(),
        };

        // 1. Docker Engine quraşdır
        info!("Executing Docker install script...");
        ssh_client.execute_cmd(install_cmd).await?;

        // 2. daemon.json konfiqurasiyası və restart
        let daemon_config = Self::generate_daemon_json();
        let setup_cmd = format!(
            r#"
            mkdir -p /etc/docker &&
            echo '{}' > /etc/docker/daemon.json &&
            systemctl enable docker || true &&
            systemctl restart docker
            "#,
            daemon_config
        );

        info!("Configuring Docker Daemon JSON...");
        ssh_client.execute_cmd(&setup_cmd).await?;

        // 3. Bazada server statusunu yenilə
        sqlx::query!(
            r#"
            UPDATE servers
            SET updated_at = NOW()
            WHERE uuid = $1
            "#,
            server_uuid
        )
        .execute(db)
        .await?;

        info!("Docker successfully installed and configured on server {}", server_uuid);
        Ok(())
    }
}
