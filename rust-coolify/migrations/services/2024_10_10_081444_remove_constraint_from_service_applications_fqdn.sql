-- completed mig_211
-- Converted from: 2024_10_10_081444_remove_constraint_from_service_applications_fqdn.php

-- ALTER TABLE service_applications
-- Review 2024_10_10_081444_remove_constraint_from_service_applications_fqdn.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn TEXT;

-- ALTER TABLE applications
-- Review 2024_10_10_081444_remove_constraint_from_service_applications_fqdn.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn TEXT;

-- ALTER TABLE service_applications
-- Review 2024_10_10_081444_remove_constraint_from_service_applications_fqdn.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn TEXT;

-- ALTER TABLE applications
-- Review 2024_10_10_081444_remove_constraint_from_service_applications_fqdn.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
