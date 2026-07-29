// completed file_0839
// Coolify mənbəsi: app/Notifications/Application/DeploymentFailed.php

pub struct DeploymentFailedNotification;

impl DeploymentFailedNotification {
    pub fn format_message(app_name: &str, error_log: &str, deployment_uuid: &str) -> String {
        format!(
            "<b>Deployment Failed!</b>\n\nApplication <b>{}</b> deployment encountered an error.\nError: <code>{}</code>\nDeployment ID: <code>{}</code>",
            app_name, error_log, deployment_uuid
        )
    }
}
