// completed file_0840
// Coolify mənbəsi: app/Notifications/Application/DeploymentSuccess.php

pub struct DeploymentSuccessNotification;

impl DeploymentSuccessNotification {
    pub fn format_message(app_name: &str, fqdn: &str, deployment_uuid: &str) -> String {
        format!(
            "<b>Deployment Successful!</b>\n\nApplication <b>{}</b> has been deployed successfully.\nDomain: {}\nDeployment ID: <code>{}</code>",
            app_name, fqdn, deployment_uuid
        )
    }
}
