-- completed mig_187
-- Converted from: 2024_07_11_083719_application_compose_versions.php

-- ALTER TABLE applications
-- Review 2024_07_11_083719_application_compose_versions.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS compose_parsing_version VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS compose_parsing_version TEXT;

-- ALTER TABLE applications
-- Review 2024_07_11_083719_application_compose_versions.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS compose_parsing_version VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS compose_parsing_version TEXT;
