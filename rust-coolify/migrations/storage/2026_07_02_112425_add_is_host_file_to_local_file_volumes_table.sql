-- completed mig_341
-- Converted from: 2026_07_02_112425_add_is_host_file_to_local_file_volumes_table.php

-- ALTER TABLE local_file_volumes
-- Review 2026_07_02_112425_add_is_host_file_to_local_file_volumes_table.php for specific alterations
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_host_file BOOLEAN DEFAULT FALSE;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_host_file TEXT;

-- ALTER TABLE local_file_volumes
-- Review 2026_07_02_112425_add_is_host_file_to_local_file_volumes_table.php for specific alterations
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_host_file BOOLEAN DEFAULT FALSE;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_host_file TEXT;
