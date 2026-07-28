-- completed mig_229
-- Converted from: 2024_12_05_212440_create_telegram_notification_settings_table.php

CREATE TABLE IF NOT EXISTS telegram_notification_settings (
    team_id BIGINT,
    telegram_enabled BOOLEAN DEFAULT FALSE,
    telegram_token TEXT,
    telegram_chat_id TEXT,
    deployment_success_telegram_notifications BOOLEAN DEFAULT FALSE,
    deployment_failure_telegram_notifications BOOLEAN DEFAULT FALSE,
    status_change_telegram_notifications BOOLEAN DEFAULT FALSE,
    backup_success_telegram_notifications BOOLEAN DEFAULT FALSE,
    backup_failure_telegram_notifications BOOLEAN DEFAULT FALSE,
    scheduled_task_success_telegram_notifications BOOLEAN DEFAULT FALSE,
    scheduled_task_failure_telegram_notifications BOOLEAN DEFAULT FALSE,
    docker_cleanup_success_telegram_notifications BOOLEAN DEFAULT FALSE,
    docker_cleanup_failure_telegram_notifications BOOLEAN DEFAULT FALSE,
    server_disk_usage_telegram_notifications BOOLEAN DEFAULT FALSE,
    server_reachable_telegram_notifications BOOLEAN DEFAULT FALSE,
    server_unreachable_telegram_notifications BOOLEAN DEFAULT FALSE,
    telegram_notifications_deployment_success_thread_id TEXT,
    telegram_notifications_deployment_failure_thread_id TEXT,
    telegram_notifications_status_change_thread_id TEXT,
    telegram_notifications_backup_success_thread_id TEXT,
    telegram_notifications_backup_failure_thread_id TEXT,
    telegram_notifications_scheduled_task_success_thread_id TEXT,
    telegram_notifications_scheduled_task_failure_thread_id TEXT,
    telegram_notifications_docker_cleanup_success_thread_id TEXT,
    telegram_notifications_docker_cleanup_failure_thread_id TEXT,
    telegram_notifications_server_disk_usage_thread_id TEXT,
    telegram_notifications_server_reachable_thread_id TEXT,
    telegram_notifications_server_unreachable_thread_id TEXT
);

DROP TABLE IF EXISTS telegram_notification_settings;
