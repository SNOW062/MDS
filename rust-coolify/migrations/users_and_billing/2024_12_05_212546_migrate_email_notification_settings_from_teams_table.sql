-- completed mig_230
-- Converted from: 2024_12_05_212546_migrate_email_notification_settings_from_teams_table.php

-- ALTER TABLE teams
-- Review 2024_12_05_212546_migrate_email_notification_settings_from_teams_table.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_from_address VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_from_name VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_recipients VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_host VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_port INTEGER;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_encryption VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_username TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_password TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_timeout INTEGER;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS use_instance_email_settings BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS resend_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS resend_api_key TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_test BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_deployments BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_database_backups BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_scheduled_tasks BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_status_changes BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_server_disk_usage BOOLEAN DEFAULT FALSE;

-- ALTER TABLE teams
-- Review 2024_12_05_212546_migrate_email_notification_settings_from_teams_table.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_from_address VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_from_name VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_recipients VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_host VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_port INTEGER;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_encryption VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_username TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_password TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_timeout INTEGER;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS use_instance_email_settings BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS resend_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS resend_api_key TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_test BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_deployments BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_database_backups BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_scheduled_tasks BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_status_changes BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_server_disk_usage BOOLEAN DEFAULT FALSE;
