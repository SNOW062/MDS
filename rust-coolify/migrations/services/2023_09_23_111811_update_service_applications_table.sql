-- completed mig_076
-- Converted from: 2023_09_23_111811_update_service_applications_table.php

-- ALTER TABLE service_applications
-- Review 2023_09_23_111811_update_service_applications_table.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS exclude_from_status BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS required_fqdn BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS image VARCHAR(255);
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS exclude_from_status TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS required_fqdn TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS image TEXT;

-- ALTER TABLE service_applications
-- Review 2023_09_23_111811_update_service_applications_table.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS exclude_from_status BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS required_fqdn BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS image VARCHAR(255);
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS exclude_from_status TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS required_fqdn TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS image TEXT;
