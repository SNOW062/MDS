// completed file_0848_task_failed
// Coolify mənbəsi: app/Notifications/ScheduledTask/TaskFailed.php

pub struct TaskFailedNotification;

impl TaskFailedNotification {
    pub fn format_message(task_name: &str, error: &str) -> String {
        format!(
            "<b>Scheduled Task Failed!</b>\n\nTask <b>{}</b> encountered an error.\nError: <code>{}</code>",
            task_name, error
        )
    }
}
