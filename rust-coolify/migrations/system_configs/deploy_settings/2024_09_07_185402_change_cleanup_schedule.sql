-- completed mig_204
-- Converted from: 2024_09_07_185402_change_cleanup_schedule.php

-- ALTER TABLE server_settings
-- Review 2024_09_07_185402_change_cleanup_schedule.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS docker_cleanup_frequency VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS docker_cleanup_frequency VARCHAR(255);

-- ALTER TABLE server_settings
-- Review 2024_09_07_185402_change_cleanup_schedule.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS docker_cleanup_frequency VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS docker_cleanup_frequency VARCHAR(255);
