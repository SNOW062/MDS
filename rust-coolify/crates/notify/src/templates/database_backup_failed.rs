// completed file_0841
// Coolify mənbəsi: app/Notifications/Database/BackupFailed.php

pub struct BackupFailedNotification;

impl BackupFailedNotification {
    pub fn format_message(db_name: &str, error_message: &str) -> String {
        format!(
            "<b>Database Backup Failed!</b>\n\nDatabase <b>{}</b> backup failed.\nReason: <code>{}</code>",
            db_name, error_message
        )
    }
}
