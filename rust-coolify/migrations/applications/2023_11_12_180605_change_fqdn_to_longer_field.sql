-- completed mig_102
-- Converted from: 2023_11_12_180605_change_fqdn_to_longer_field.php

-- ALTER TABLE applications
-- Review 2023_11_12_180605_change_fqdn_to_longer_field.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);

-- ALTER TABLE application_previews
-- Review 2023_11_12_180605_change_fqdn_to_longer_field.php for specific alterations
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);

-- ALTER TABLE service_applications
-- Review 2023_11_12_180605_change_fqdn_to_longer_field.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);

-- ALTER TABLE applications
-- Review 2023_11_12_180605_change_fqdn_to_longer_field.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);

-- ALTER TABLE application_previews
-- Review 2023_11_12_180605_change_fqdn_to_longer_field.php for specific alterations
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);

-- ALTER TABLE service_applications
-- Review 2023_11_12_180605_change_fqdn_to_longer_field.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS fqdn VARCHAR(255);
