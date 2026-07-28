-- completed mig_127
-- Converted from: 2024_01_15_084609_add_custom_dns_server.php

-- ALTER TABLE instance_settings
-- Review 2024_01_15_084609_add_custom_dns_server.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_dns_validation_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS custom_dns_servers VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_dns_validation_enabled TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS custom_dns_servers TEXT;

-- ALTER TABLE instance_settings
-- Review 2024_01_15_084609_add_custom_dns_server.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_dns_validation_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS custom_dns_servers VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_dns_validation_enabled TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS custom_dns_servers TEXT;
