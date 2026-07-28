-- completed mig_034
-- Converted from: 2023_06_23_084605_remove_wildcard_domain_from_instancesettings.php

-- ALTER TABLE instance_settings
-- Review 2023_06_23_084605_remove_wildcard_domain_from_instancesettings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS wildcard_domain TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS wildcard_domain VARCHAR(255);

-- ALTER TABLE instance_settings
-- Review 2023_06_23_084605_remove_wildcard_domain_from_instancesettings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS wildcard_domain TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS wildcard_domain VARCHAR(255);
