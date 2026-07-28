-- completed mig_167
-- Converted from: 2024_04_29_111956_add_custom_hc_indicator_apps.php

-- ALTER TABLE applications
-- Review 2024_04_29_111956_add_custom_hc_indicator_apps.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS custom_healthcheck_found BOOLEAN DEFAULT FALSE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS custom_healthcheck_found TEXT;

-- ALTER TABLE applications
-- Review 2024_04_29_111956_add_custom_hc_indicator_apps.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS custom_healthcheck_found BOOLEAN DEFAULT FALSE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS custom_healthcheck_found TEXT;
