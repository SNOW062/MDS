-- completed mig_233
-- Converted from: 2024_12_06_142014_create_slack_notification_settings_table.php

CREATE TABLE IF NOT EXISTS slack_notification_settings (
    team_id BIGINT,
    slack_enabled BOOLEAN DEFAULT FALSE,
    slack_webhook_url TEXT,
    deployment_success_slack_notifications BOOLEAN DEFAULT FALSE,
    deployment_failure_slack_notifications BOOLEAN DEFAULT FALSE,
    status_change_slack_notifications BOOLEAN DEFAULT FALSE,
    backup_success_slack_notifications BOOLEAN DEFAULT FALSE,
    backup_failure_slack_notifications BOOLEAN DEFAULT FALSE,
    scheduled_task_success_slack_notifications BOOLEAN DEFAULT FALSE,
    scheduled_task_failure_slack_notifications BOOLEAN DEFAULT FALSE,
    docker_cleanup_success_slack_notifications BOOLEAN DEFAULT FALSE,
    docker_cleanup_failure_slack_notifications BOOLEAN DEFAULT FALSE,
    server_disk_usage_slack_notifications BOOLEAN DEFAULT FALSE,
    server_reachable_slack_notifications BOOLEAN DEFAULT FALSE,
    server_unreachable_slack_notifications BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS slack_notification_settings;
