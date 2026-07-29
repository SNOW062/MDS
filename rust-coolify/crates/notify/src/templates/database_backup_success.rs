// completed file_0842
// Coolify mənbəsi: app/Notifications/Database/BackupSuccess.php

pub struct BackupSuccessNotification;

impl BackupSuccessNotification {
    pub fn format_message(db_name: &str, filename: &str, size_bytes: u64) -> String {
        format!(
            "<b>Database Backup Successful!</b>\n\nDatabase <b>{}</b> backup completed.\nFilename: <code>{}</code>\nSize: {} bytes",
            db_name, filename, size_bytes
        )
    }
}
