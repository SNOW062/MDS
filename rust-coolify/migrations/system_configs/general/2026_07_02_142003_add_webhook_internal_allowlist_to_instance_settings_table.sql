-- completed mig_342
-- Converted from: 2026_07_02_142003_add_webhook_internal_allowlist_to_instance_settings_table.php

-- ALTER TABLE instance_settings
-- Review 2026_07_02_142003_add_webhook_internal_allowlist_to_instance_settings_table.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS webhook_allowed_internal_hosts JSONB;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS webhook_allow_localhost BOOLEAN DEFAULT FALSE;

-- ALTER TABLE instance_settings
-- Review 2026_07_02_142003_add_webhook_internal_allowlist_to_instance_settings_table.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS webhook_allowed_internal_hosts JSONB;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS webhook_allow_localhost BOOLEAN DEFAULT FALSE;
