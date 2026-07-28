-- completed mig_039
-- Converted from: 2023_06_23_114134_add_disk_usage_percentage_to_servers.php

-- ALTER TABLE server_settings
-- Review 2023_06_23_114134_add_disk_usage_percentage_to_servers.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS cleanup_after_percentage INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS cleanup_after_percentage TEXT;

-- ALTER TABLE server_settings
-- Review 2023_06_23_114134_add_disk_usage_percentage_to_servers.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS cleanup_after_percentage INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS cleanup_after_percentage TEXT;
