-- completed mig_302
-- Converted from: 2025_11_16_000001_create_webhook_notification_settings_table.php

CREATE TABLE IF NOT EXISTS webhook_notification_settings (
    team_id BIGINT,
    webhook_enabled BOOLEAN DEFAULT FALSE,
    webhook_url TEXT,
    deployment_success_webhook_notifications BOOLEAN DEFAULT FALSE,
    deployment_failure_webhook_notifications BOOLEAN DEFAULT FALSE,
    status_change_webhook_notifications BOOLEAN DEFAULT FALSE,
    backup_success_webhook_notifications BOOLEAN DEFAULT FALSE,
    backup_failure_webhook_notifications BOOLEAN DEFAULT FALSE,
    scheduled_task_success_webhook_notifications BOOLEAN DEFAULT FALSE,
    scheduled_task_failure_webhook_notifications BOOLEAN DEFAULT FALSE,
    docker_cleanup_success_webhook_notifications BOOLEAN DEFAULT FALSE,
    docker_cleanup_failure_webhook_notifications BOOLEAN DEFAULT FALSE,
    server_disk_usage_webhook_notifications BOOLEAN DEFAULT FALSE,
    server_reachable_webhook_notifications BOOLEAN DEFAULT FALSE,
    server_unreachable_webhook_notifications BOOLEAN DEFAULT FALSE,
    server_patch_webhook_notifications BOOLEAN DEFAULT FALSE,
    traefik_outdated_webhook_notifications BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS webhook_notification_settings;
