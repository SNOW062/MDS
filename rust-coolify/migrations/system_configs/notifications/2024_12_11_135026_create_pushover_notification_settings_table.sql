-- completed mig_237
-- Converted from: 2024_12_11_135026_create_pushover_notification_settings_table.php

CREATE TABLE IF NOT EXISTS pushover_notification_settings (
    team_id BIGINT,
    pushover_enabled BOOLEAN DEFAULT FALSE,
    pushover_user_key TEXT,
    pushover_api_token TEXT,
    deployment_success_pushover_notifications BOOLEAN DEFAULT FALSE,
    deployment_failure_pushover_notifications BOOLEAN DEFAULT FALSE,
    status_change_pushover_notifications BOOLEAN DEFAULT FALSE,
    backup_success_pushover_notifications BOOLEAN DEFAULT FALSE,
    backup_failure_pushover_notifications BOOLEAN DEFAULT FALSE,
    scheduled_task_success_pushover_notifications BOOLEAN DEFAULT FALSE,
    scheduled_task_failure_pushover_notifications BOOLEAN DEFAULT FALSE,
    docker_cleanup_success_pushover_notifications BOOLEAN DEFAULT FALSE,
    docker_cleanup_failure_pushover_notifications BOOLEAN DEFAULT FALSE,
    server_disk_usage_pushover_notifications BOOLEAN DEFAULT FALSE,
    server_reachable_pushover_notifications BOOLEAN DEFAULT FALSE,
    server_unreachable_pushover_notifications BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS pushover_notification_settings;
