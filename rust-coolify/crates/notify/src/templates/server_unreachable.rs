// completed file_0845
// Coolify mənbəsi: app/Notifications/Server/Unreachable.php

pub struct ServerUnreachableNotification;

impl ServerUnreachableNotification {
    pub fn format_message(server_name: &str, ip: &str) -> String {
        format!(
            "<b>CRITICAL: Server Unreachable!</b>\n\nServer <b>{}</b> ({}) is not responding to SSH / health check commands.",
            server_name, ip
        )
    }
}
