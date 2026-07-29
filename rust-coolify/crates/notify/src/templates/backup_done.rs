// completed be_1147
// Coolify mənbəsi: Notifications/Templates/BackupDone.php

pub fn render_backup_done_email(db_name: &str, size_formatted: &str) -> String {
    format!(
        r#"<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Backup Successful</title></head>
<body style="font-family: sans-serif; background-color: #f4f5f7; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px;">
    <h2 style="color: #3b82f6;">💾 Database Backup Completed</h2>
    <p>Database <strong>{}</strong> backup created successfully.</p>
    <p>Backup Size: <strong>{}</strong></p>
  </div>
</body>
</html>"#,
        db_name, size_formatted
    )
}
