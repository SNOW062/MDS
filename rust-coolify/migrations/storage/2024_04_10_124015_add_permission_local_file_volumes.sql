-- completed mig_161
-- Converted from: 2024_04_10_124015_add_permission_local_file_volumes.php

-- ALTER TABLE local_file_volumes
-- Review 2024_04_10_124015_add_permission_local_file_volumes.php for specific alterations
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS chown VARCHAR(255);
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS chmod VARCHAR(255);
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS chown TEXT;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS chmod TEXT;

-- ALTER TABLE local_file_volumes
-- Review 2024_04_10_124015_add_permission_local_file_volumes.php for specific alterations
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS chown VARCHAR(255);
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS chmod VARCHAR(255);
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS chown TEXT;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS chmod TEXT;
