-- completed mig_203
-- Converted from: 2024_09_06_062534_change_server_cleanup_to_forced.php

-- ALTER TABLE server_settings
-- Review 2024_09_06_062534_change_server_cleanup_to_forced.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_docker_cleanup BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_docker_cleanup BOOLEAN DEFAULT FALSE;

-- ALTER TABLE server_settings
-- Review 2024_09_06_062534_change_server_cleanup_to_forced.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_docker_cleanup BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_docker_cleanup BOOLEAN DEFAULT FALSE;
