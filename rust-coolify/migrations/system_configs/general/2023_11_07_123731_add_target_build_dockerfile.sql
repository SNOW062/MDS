-- completed mig_099
-- Converted from: 2023_11_07_123731_add_target_build_dockerfile.php

-- ALTER TABLE applications
-- Review 2023_11_07_123731_add_target_build_dockerfile.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS dockerfile_target_build VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS dockerfile_target_build TEXT;

-- ALTER TABLE applications
-- Review 2023_11_07_123731_add_target_build_dockerfile.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS dockerfile_target_build VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS dockerfile_target_build TEXT;
