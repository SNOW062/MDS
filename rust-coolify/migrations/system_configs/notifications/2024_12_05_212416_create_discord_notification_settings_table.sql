-- completed mig_228
-- Converted from: 2024_12_05_212416_create_discord_notification_settings_table.php

CREATE TABLE IF NOT EXISTS discord_notification_settings (
    team_id BIGINT,
    discord_enabled BOOLEAN DEFAULT FALSE,
    discord_webhook_url TEXT,
    deployment_success_discord_notifications BOOLEAN DEFAULT FALSE,
    deployment_failure_discord_notifications BOOLEAN DEFAULT FALSE,
    status_change_discord_notifications BOOLEAN DEFAULT FALSE,
    backup_success_discord_notifications BOOLEAN DEFAULT FALSE,
    backup_failure_discord_notifications BOOLEAN DEFAULT FALSE,
    scheduled_task_success_discord_notifications BOOLEAN DEFAULT FALSE,
    scheduled_task_failure_discord_notifications BOOLEAN DEFAULT FALSE,
    docker_cleanup_success_discord_notifications BOOLEAN DEFAULT FALSE,
    docker_cleanup_failure_discord_notifications BOOLEAN DEFAULT FALSE,
    server_disk_usage_discord_notifications BOOLEAN DEFAULT FALSE,
    server_reachable_discord_notifications BOOLEAN DEFAULT FALSE,
    server_unreachable_discord_notifications BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS discord_notification_settings;
