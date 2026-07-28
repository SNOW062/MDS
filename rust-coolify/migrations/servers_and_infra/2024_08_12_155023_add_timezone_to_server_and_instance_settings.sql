-- completed mig_197
-- Converted from: 2024_08_12_155023_add_timezone_to_server_and_instance_settings.php

-- ALTER TABLE server_settings
-- Review 2024_08_12_155023_add_timezone_to_server_and_instance_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS server_timezone VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS instance_timezone VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS server_timezone TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS instance_timezone TEXT;

-- ALTER TABLE instance_settings
-- Review 2024_08_12_155023_add_timezone_to_server_and_instance_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS server_timezone VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS instance_timezone VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS server_timezone TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS instance_timezone TEXT;

-- ALTER TABLE server_settings
-- Review 2024_08_12_155023_add_timezone_to_server_and_instance_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS server_timezone VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS instance_timezone VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS server_timezone TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS instance_timezone TEXT;

-- ALTER TABLE instance_settings
-- Review 2024_08_12_155023_add_timezone_to_server_and_instance_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS server_timezone VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS instance_timezone VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS server_timezone TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS instance_timezone TEXT;
