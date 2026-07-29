// completed file_0847_task_success
// Coolify mənbəsi: app/Notifications/ScheduledTask/TaskSuccess.php

pub struct TaskSuccessNotification;

impl TaskSuccessNotification {
    pub fn format_message(task_name: &str, output: &str) -> String {
        format!(
            "<b>Scheduled Task Executed Successfully!</b>\n\nTask <b>{}</b> finished.\nOutput: <code>{}</code>",
            task_name, output
        )
    }
}
