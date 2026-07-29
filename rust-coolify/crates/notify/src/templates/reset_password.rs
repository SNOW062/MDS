// completed file_0849_reset_password
// Coolify mənbəsi: app/Notifications/TransactionalEmails/ResetPassword.php

pub struct ResetPasswordTransactionalEmail;

impl ResetPasswordTransactionalEmail {
    pub fn format_message(reset_link: &str) -> String {
        format!(
            "<h2>Reset Your Coolify Password</h2><p>Click the link below to reset your password:</p><p><a href=\"{}\">{}</a></p><p>This link will expire in 60 minutes.</p>",
            reset_link, reset_link
        )
    }
}
