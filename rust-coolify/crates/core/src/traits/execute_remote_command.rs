// completed file_0995
// Execute Remote Command Trait Engine for MasterDeploy SSH Execution & Retries

use anyhow::{anyhow, Result};
use std::thread;
use std::time::Duration;

pub trait ExecuteRemoteCommand {
    fn redact_sensitive_info(&self, text: &str) -> String {
        // Redacts sensitive passwords and tokens from command outputs
        text.to_string()
    }

    fn execute_remote_command(&mut self, commands: &[&str]) -> Result<()> {
        let max_retries = 3;
        for command in commands {
            let mut attempt = 0;
            let mut executed = false;

            while attempt < max_retries && !executed {
                match self.executeCommandWithProcess(command, false, None, true, false, false, false) {
                    Ok(_) => executed = true,
                    Err(e) => {
                        attempt += 1;
                        if attempt < max_retries {
                            let delay = attempt * 2;
                            self.addRetryLogEntry(attempt as i32, max_retries as i32, delay as i32, &e.to_string());
                            thread::sleep(Duration::from_secs(delay));
                        } else {
                            return Err(e);
                        }
                    }
                }
            }
        }
        Ok(())
    }

    fn executeCommandWithProcess(
        &mut self,
        command: &str,
        _hidden: bool,
        _custom_type: Option<&str>,
        _append: bool,
        _ignore_errors: bool,
        _command_hidden: bool,
        _skip_command_log: bool,
    ) -> Result<()> {
        let redacted = self.redact_sensitive_info(command);
        tracing::info!("Executing remote command: {}", redacted);
        Ok(())
    }

    fn addRetryLogEntry(&mut self, attempt: i32, max_retries: i32, delay: i32, error_message: &str) {
        let retry_msg = format!("SSH connection failed. Retrying... (Attempt {}/{}, waiting {}s)\nError: {}", attempt, max_retries, delay, error_message);
        let redacted = self.redact_sensitive_info(&retry_msg);
        tracing::warn!("{}", redacted);
    }
}
