-- completed mig_147
-- Converted from: 2024_02_25_222150_add_server_force_disabled_field.php

-- ALTER TABLE server_settings
-- Review 2024_02_25_222150_add_server_force_disabled_field.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_disabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_disabled TEXT;

-- ALTER TABLE server_settings
-- Review 2024_02_25_222150_add_server_force_disabled_field.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_disabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS force_disabled TEXT;
