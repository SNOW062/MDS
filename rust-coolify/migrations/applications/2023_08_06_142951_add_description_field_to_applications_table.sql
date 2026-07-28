-- completed mig_044
-- Converted from: 2023_08_06_142951_add_description_field_to_applications_table.php

-- ALTER TABLE applications
-- Review 2023_08_06_142951_add_description_field_to_applications_table.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS description VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS description TEXT;

-- ALTER TABLE applications
-- Review 2023_08_06_142951_add_description_field_to_applications_table.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS description VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS description TEXT;
