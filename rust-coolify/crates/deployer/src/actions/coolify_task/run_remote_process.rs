// completed file_0355
// Coolify mənbəsi: app/Actions/CoolifyTask/RunRemoteProcess.php
use anyhow::{Result, anyhow};
use rc_core::ssh::client::SshClient;
use sqlx::PgPool;
use uuid::Uuid;

pub struct RunRemoteProcess {
    pub server_ip: String,
    pub server_port: u16,
    pub user: String,
    pub private_key_path: Option<String>,
    pub hide_output: bool,
    pub ignore_errors: bool,
}

impl RunRemoteProcess {
    pub fn new(
        server_ip: String,
        server_port: u16,
        user: String,
        private_key_path: Option<String>,
    ) -> Self {
        Self {
            server_ip,
            server_port,
            user,
            private_key_path,
            hide_output: false,
            ignore_errors: false,
        }
    }

    /// Remote SSH komandasını işlədir və nəticəni bazadakı aktivliyə (activity logs) yazır
    pub async fn execute(&self, db: &PgPool, task_uuid: Uuid, command: &str) -> Result<String> {
        let ssh_client = SshClient::new(
            self.server_ip.clone(),
            self.server_port,
            self.user.clone(),
            self.private_key_path.clone(),
        );

        tracing::info!("Executing remote process on {}: {}", self.server_ip, command);

        match ssh_client.execute_cmd(command).await {
            Ok(output) => {
                if !self.hide_output {
                    // Log outputu DB-də qeydə alırıq
                    sqlx::query!(
                        r#"
                        INSERT INTO deployment_logs (deployment_uuid, content, created_at)
                        VALUES ($1, $2, NOW())
                        "#,
                        task_uuid,
                        output
                    )
                    .execute(db)
                    .await
                    .ok();
                }
                Ok(output)
            }
            Err(err) => {
                if self.ignore_errors {
                    tracing::warn!("Remote process failed but errors are ignored: {:?}", err);
                    Ok(String::new())
                } else {
                    tracing::error!("Remote process execution failed: {:?}", err);
                    Err(anyhow!("Remote command execution failed: {}", err))
                }
            }
        }
    }
}
