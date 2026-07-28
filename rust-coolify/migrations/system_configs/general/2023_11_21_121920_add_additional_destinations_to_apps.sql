-- completed mig_110
-- Converted from: 2023_11_21_121920_add_additional_destinations_to_apps.php

-- ALTER TABLE applications
-- Review 2023_11_21_121920_add_additional_destinations_to_apps.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS additional_destinations VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS additional_destinations TEXT;

-- ALTER TABLE applications
-- Review 2023_11_21_121920_add_additional_destinations_to_apps.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS additional_destinations VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS additional_destinations TEXT;
