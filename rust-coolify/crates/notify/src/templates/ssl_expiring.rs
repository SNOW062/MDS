// completed be_1152
// Coolify mənbəsi: app/Notifications/SSL/SSLExpiring.php

pub struct SSLExpiringNotification;

impl SSLExpiringNotification {
    pub fn format_message(domain: &str, days_left: u32) -> String {
        format!(
            "<b>Warning: SSL Certificate Expiring Soon!</b>\n\nThe SSL certificate for domain <b>{}</b> will expire in {} days.",
            domain, days_left
        )
    }
}
