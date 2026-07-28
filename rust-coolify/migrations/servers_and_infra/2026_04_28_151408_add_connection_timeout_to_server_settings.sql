-- completed mig_332
-- Converted from: 2026_04_28_151408_add_connection_timeout_to_server_settings.php

-- ALTER TABLE server_settings
-- Review 2026_04_28_151408_add_connection_timeout_to_server_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS connection_timeout INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS connection_timeout TEXT;

-- ALTER TABLE server_settings
-- Review 2026_04_28_151408_add_connection_timeout_to_server_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS connection_timeout INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS connection_timeout TEXT;
