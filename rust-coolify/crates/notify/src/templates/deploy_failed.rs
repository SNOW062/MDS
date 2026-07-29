// completed be_1148
// Coolify mənbəsi: Notifications/Templates/DeployFailed.php

pub fn render_deploy_failed_email(app_name: &str, error_logs: &str) -> String {
    format!(
        r#"<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Deploy Failed</title></head>
<body style="font-family: sans-serif; background-color: #f4f5f7; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px;">
    <h2 style="color: #ef4444;">❌ Deployment Failed</h2>
    <p>Application: <strong>{}</strong></p>
    <div style="background: #1e1e1e; color: #f8f8f2; padding: 15px; border-radius: 5px; font-family: monospace; white-space: pre-wrap;">{}</div>
  </div>
</body>
</html>"#,
        app_name, error_logs
    )
}
