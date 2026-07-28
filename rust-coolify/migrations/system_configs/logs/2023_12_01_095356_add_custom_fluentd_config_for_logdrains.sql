-- completed mig_115
-- Converted from: 2023_12_01_095356_add_custom_fluentd_config_for_logdrains.php

-- ALTER TABLE server_settings
-- Review 2023_12_01_095356_add_custom_fluentd_config_for_logdrains.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_custom_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_custom_config TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_custom_config_parser TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_custom_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_custom_config TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_custom_config_parser TEXT;

-- ALTER TABLE server_settings
-- Review 2023_12_01_095356_add_custom_fluentd_config_for_logdrains.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_custom_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_custom_config TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_custom_config_parser TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_custom_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_custom_config TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_custom_config_parser TEXT;
