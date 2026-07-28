-- completed mig_279
-- Converted from: 2025_09_10_172952_remove_is_readonly_from_local_persistent_volumes_table.php

-- ALTER TABLE local_persistent_volumes
-- Review 2025_09_10_172952_remove_is_readonly_from_local_persistent_volumes_table.php for specific alterations
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_readonly TEXT;
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_readonly BOOLEAN DEFAULT FALSE;

-- ALTER TABLE local_persistent_volumes
-- Review 2025_09_10_172952_remove_is_readonly_from_local_persistent_volumes_table.php for specific alterations
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_readonly TEXT;
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_readonly BOOLEAN DEFAULT FALSE;
