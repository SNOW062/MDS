-- completed mig_080
-- Converted from: 2023_09_23_111815_add_healthcheck_disable_to_apps_table.php

-- ALTER TABLE applications
-- Review 2023_09_23_111815_add_healthcheck_disable_to_apps_table.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS health_check_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS health_check_enabled TEXT;

-- ALTER TABLE applications
-- Review 2023_09_23_111815_add_healthcheck_disable_to_apps_table.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS health_check_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS health_check_enabled TEXT;
