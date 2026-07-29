// completed file_0843
// Coolify mənbəsi: app/Notifications/Server/HighDiskUsage.php

pub struct HighDiskUsageNotification;

impl HighDiskUsageNotification {
    pub fn format_message(server_name: &str, disk_usage_pct: u8, threshold_pct: u8) -> String {
        format!(
            "<b>WARNING: High Disk Usage Detected!</b>\n\nServer <b>{}</b> disk usage has reached <b>{}%</b> (Threshold: {}%).\nPlease clean up unused Docker images or expand disk volume.",
            server_name, disk_usage_pct, threshold_pct
        )
    }
}
