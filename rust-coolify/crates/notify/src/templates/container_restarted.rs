// completed file_0838
// Coolify mənbəsi: app/Notifications/Container/ContainerRestarted.php

pub struct ContainerRestartedNotification;

impl ContainerRestartedNotification {
    pub fn format_message(container_name: &str, server_name: &str) -> String {
        format!(
            "<b>Warning: Container Restarted!</b>\n\nContainer <b>{}</b> on server <b>{}</b> was unexpectedly restarted by auto-recovery.",
            container_name, server_name
        )
    }
}
