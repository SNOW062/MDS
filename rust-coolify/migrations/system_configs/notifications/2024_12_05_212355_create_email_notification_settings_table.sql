-- completed mig_227
-- Converted from: 2024_12_05_212355_create_email_notification_settings_table.php

CREATE TABLE IF NOT EXISTS email_notification_settings (
    team_id BIGINT,
    smtp_enabled BOOLEAN DEFAULT FALSE,
    smtp_from_address TEXT,
    smtp_from_name TEXT,
    smtp_recipients TEXT,
    smtp_host TEXT,
    smtp_port INTEGER,
    smtp_encryption VARCHAR(255),
    smtp_username TEXT,
    smtp_password TEXT,
    smtp_timeout INTEGER,
    resend_enabled BOOLEAN DEFAULT FALSE,
    resend_api_key TEXT,
    use_instance_email_settings BOOLEAN DEFAULT FALSE,
    deployment_success_email_notifications BOOLEAN DEFAULT FALSE,
    deployment_failure_email_notifications BOOLEAN DEFAULT FALSE,
    status_change_email_notifications BOOLEAN DEFAULT FALSE,
    backup_success_email_notifications BOOLEAN DEFAULT FALSE,
    backup_failure_email_notifications BOOLEAN DEFAULT FALSE,
    scheduled_task_success_email_notifications BOOLEAN DEFAULT FALSE,
    scheduled_task_failure_email_notifications BOOLEAN DEFAULT FALSE,
    docker_cleanup_success_email_notifications BOOLEAN DEFAULT FALSE,
    docker_cleanup_failure_email_notifications BOOLEAN DEFAULT FALSE,
    server_disk_usage_email_notifications BOOLEAN DEFAULT FALSE,
    server_reachable_email_notifications BOOLEAN DEFAULT FALSE,
    server_unreachable_email_notifications BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS email_notification_settings;
