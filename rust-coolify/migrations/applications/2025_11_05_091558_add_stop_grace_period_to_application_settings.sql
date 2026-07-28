-- completed mig_294
-- Converted from: 2025_11_05_091558_add_stop_grace_period_to_application_settings.php

-- ALTER TABLE application_settings
-- Review 2025_11_05_091558_add_stop_grace_period_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS stop_grace_period INTEGER;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS stop_grace_period TEXT;

-- ALTER TABLE application_settings
-- Review 2025_11_05_091558_add_stop_grace_period_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS stop_grace_period INTEGER;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS stop_grace_period TEXT;
