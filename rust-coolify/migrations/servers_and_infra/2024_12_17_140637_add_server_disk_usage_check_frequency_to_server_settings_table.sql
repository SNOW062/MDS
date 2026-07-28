-- completed mig_241
-- Converted from: 2024_12_17_140637_add_server_disk_usage_check_frequency_to_server_settings_table.php

-- ALTER TABLE server_settings
-- Review 2024_12_17_140637_add_server_disk_usage_check_frequency_to_server_settings_table.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS server_disk_usage_check_frequency VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS server_disk_usage_check_frequency TEXT;

-- ALTER TABLE server_settings
-- Review 2024_12_17_140637_add_server_disk_usage_check_frequency_to_server_settings_table.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS server_disk_usage_check_frequency VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS server_disk_usage_check_frequency TEXT;
