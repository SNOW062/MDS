-- completed mig_195
-- Converted from: 2024_08_09_215659_add_server_cleanup_fields_to_server_settings_table.php

-- ALTER TABLE server_settings
-- Review 2024_08_09_215659_add_server_cleanup_fields_to_server_settings_table.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_docker_cleanup BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS docker_cleanup_frequency VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS docker_cleanup_threshold INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS cleanup_after_percentage TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_force_cleanup_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_docker_cleanup TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS docker_cleanup_frequency TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS docker_cleanup_threshold TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS cleanup_after_percentage INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_server_cleanup BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_force_cleanup_enabled BOOLEAN DEFAULT FALSE;

-- ALTER TABLE server_settings
-- Review 2024_08_09_215659_add_server_cleanup_fields_to_server_settings_table.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_docker_cleanup BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS docker_cleanup_frequency VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS docker_cleanup_threshold INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS cleanup_after_percentage TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_force_cleanup_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_docker_cleanup TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS docker_cleanup_frequency TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS docker_cleanup_threshold TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS cleanup_after_percentage INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_server_cleanup BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_force_cleanup_enabled BOOLEAN DEFAULT FALSE;
