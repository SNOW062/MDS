-- completed mig_185
-- Converted from: 2024_07_01_115528_add_is_api_allowed_and_iplist.php

-- ALTER TABLE instance_settings
-- Review 2024_07_01_115528_add_is_api_allowed_and_iplist.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_api_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS allowed_ips TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_api_enabled TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS allowed_ips TEXT;

-- ALTER TABLE instance_settings
-- Review 2024_07_01_115528_add_is_api_allowed_and_iplist.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_api_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS allowed_ips TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_api_enabled TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS allowed_ips TEXT;
