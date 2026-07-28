-- completed mig_238
-- Converted from: 2024_12_11_161418_add_authentik_base_url_to_oauth_settings_table.php

-- ALTER TABLE oauth_settings
-- Review 2024_12_11_161418_add_authentik_base_url_to_oauth_settings_table.php for specific alterations
ALTER TABLE oauth_settings ADD COLUMN IF NOT EXISTS base_url VARCHAR(255);
ALTER TABLE oauth_settings ADD COLUMN IF NOT EXISTS base_url TEXT;

-- ALTER TABLE oauth_settings
-- Review 2024_12_11_161418_add_authentik_base_url_to_oauth_settings_table.php for specific alterations
ALTER TABLE oauth_settings ADD COLUMN IF NOT EXISTS base_url VARCHAR(255);
ALTER TABLE oauth_settings ADD COLUMN IF NOT EXISTS base_url TEXT;
