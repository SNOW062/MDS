-- completed mig_132
-- Converted from: 2024_01_24_095449_add_concurrent_number_of_builds_per_server.php

-- ALTER TABLE server_settings
-- Review 2024_01_24_095449_add_concurrent_number_of_builds_per_server.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS concurrent_builds INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS concurrent_builds TEXT;

-- ALTER TABLE server_settings
-- Review 2024_01_24_095449_add_concurrent_number_of_builds_per_server.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS concurrent_builds INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS concurrent_builds TEXT;
