-- completed mig_128
-- Converted from: 2024_01_16_115005_add_build_server_enable.php

-- ALTER TABLE application_settings
-- Review 2024_01_16_115005_add_build_server_enable.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_build_server_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_build_server_enabled TEXT;

-- ALTER TABLE application_settings
-- Review 2024_01_16_115005_add_build_server_enable.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_build_server_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_build_server_enabled TEXT;
