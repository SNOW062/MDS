-- completed mig_141
-- Converted from: 2024_02_08_112304_add_dynamic_timeout_for_deployments.php

-- ALTER TABLE server_settings
-- Review 2024_02_08_112304_add_dynamic_timeout_for_deployments.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS dynamic_timeout INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS dynamic_timeout TEXT;

-- ALTER TABLE server_settings
-- Review 2024_02_08_112304_add_dynamic_timeout_for_deployments.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS dynamic_timeout INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS dynamic_timeout TEXT;
