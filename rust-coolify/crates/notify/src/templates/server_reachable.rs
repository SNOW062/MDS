// completed file_0844
// Coolify mənbəsi: app/Notifications/Server/Reachable.php

pub struct ServerReachableNotification;

impl ServerReachableNotification {
    pub fn format_message(server_name: &str, ip: &str) -> String {
        format!(
            "<b>Server Back Online!</b>\n\nServer <b>{}</b> ({}) is now reachable via SSH and operating normally.",
            server_name, ip
        )
    }
}
