-- completed mig_191
-- Converted from: 2024_07_19_132617_disable_healtcheck_by_default.php

-- ALTER TABLE applications
-- Review 2024_07_19_132617_disable_healtcheck_by_default.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS health_check_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS health_check_enabled BOOLEAN DEFAULT FALSE;

-- ALTER TABLE applications
-- Review 2024_07_19_132617_disable_healtcheck_by_default.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS health_check_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS health_check_enabled BOOLEAN DEFAULT FALSE;
