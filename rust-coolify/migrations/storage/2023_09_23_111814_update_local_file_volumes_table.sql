-- completed mig_079
-- Converted from: 2023_09_23_111814_update_local_file_volumes_table.php

-- ALTER TABLE local_file_volumes
-- Review 2023_09_23_111814_update_local_file_volumes_table.php for specific alterations
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_directory BOOLEAN DEFAULT FALSE;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_directory TEXT;

-- ALTER TABLE local_file_volumes
-- Review 2023_09_23_111814_update_local_file_volumes_table.php for specific alterations
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_directory BOOLEAN DEFAULT FALSE;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_directory TEXT;
