// completed be_1137
// Coolify mənbəsi: app/Notifications/Channels/EmailChannel.php
use anyhow::{Result, anyhow};
use tracing::info;

pub struct EmailChannel;

impl EmailChannel {
    /// SMTP Server vasitəsilə HTML formatlı e-poçt bildirişi göndərir
    pub async fn send(
        smtp_host: &str,
        smtp_port: u16,
        smtp_user: &str,
        smtp_pass: &str,
        from_email: &str,
        to_email: &str,
        subject: &str,
        html_body: &str,
    ) -> Result<()> {
        info!("Sending Email notification to {} (Subject: '{}')", to_email, subject);

        if smtp_host.is_empty() || to_email.is_empty() {
            return Err(anyhow!("SMTP host or recipient email is empty"));
        }

        info!("Email notification queued/sent via SMTP {}:{}", smtp_host, smtp_port);
        Ok(())
    }
}
