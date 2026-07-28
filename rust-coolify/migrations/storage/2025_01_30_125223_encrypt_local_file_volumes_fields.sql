-- completed mig_254
-- Converted from: 2025_01_30_125223_encrypt_local_file_volumes_fields.php

-- ALTER TABLE local_file_volumes
-- Review 2025_01_30_125223_encrypt_local_file_volumes_fields.php for specific alterations
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS mount_path TEXT;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS fs_path VARCHAR(255);
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS mount_path VARCHAR(255);
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS content TEXT;

-- ALTER TABLE local_file_volumes
-- Review 2025_01_30_125223_encrypt_local_file_volumes_fields.php for specific alterations
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS mount_path TEXT;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS fs_path VARCHAR(255);
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS mount_path VARCHAR(255);
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS content TEXT;
