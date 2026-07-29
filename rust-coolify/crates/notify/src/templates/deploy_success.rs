// completed be_1149
// Coolify mənbəsi: Notifications/Templates/DeploySuccess.php

pub fn render_deploy_success_email(app_name: &str, url: &str) -> String {
    format!(
        r#"<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Deploy Success</title></head>
<body style="font-family: sans-serif; background-color: #f4f5f7; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px;">
    <h2 style="color: #10b981;">🚀 Application Deployed Successfully!</h2>
    <p>Your application <strong>{}</strong> has been deployed.</p>
    <p><a href="{}" style="display: inline-block; background: #10b981; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Application</a></p>
  </div>
</body>
</html>"#,
        app_name, url
    )
}
