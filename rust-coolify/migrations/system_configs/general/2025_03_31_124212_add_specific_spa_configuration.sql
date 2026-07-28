-- completed mig_261
-- Converted from: 2025_03_31_124212_add_specific_spa_configuration.php

-- ALTER TABLE application_settings
-- Review 2025_03_31_124212_add_specific_spa_configuration.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_spa BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_spa TEXT;

-- ALTER TABLE application_settings
-- Review 2025_03_31_124212_add_specific_spa_configuration.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_spa BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_spa TEXT;
