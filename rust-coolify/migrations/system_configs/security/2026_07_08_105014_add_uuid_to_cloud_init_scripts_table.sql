-- completed mig_346
-- Converted from: 2026_07_08_105014_add_uuid_to_cloud_init_scripts_table.php

-- ALTER TABLE cloud_init_scripts
-- Review 2026_07_08_105014_add_uuid_to_cloud_init_scripts_table.php for specific alterations
ALTER TABLE cloud_init_scripts ADD COLUMN IF NOT EXISTS uuid VARCHAR(255);
ALTER TABLE cloud_init_scripts ADD COLUMN IF NOT EXISTS uuid TEXT;

-- ALTER TABLE cloud_init_scripts
-- Review 2026_07_08_105014_add_uuid_to_cloud_init_scripts_table.php for specific alterations
ALTER TABLE cloud_init_scripts ADD COLUMN IF NOT EXISTS uuid VARCHAR(255);
ALTER TABLE cloud_init_scripts ADD COLUMN IF NOT EXISTS uuid TEXT;
