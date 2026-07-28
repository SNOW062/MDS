-- completed mig_046
-- Converted from: 2023_08_06_142954_add_readonly_localpersistentvolumes.php

-- ALTER TABLE local_persistent_volumes
-- Review 2023_08_06_142954_add_readonly_localpersistentvolumes.php for specific alterations
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_readonly BOOLEAN DEFAULT FALSE;
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_readonly TEXT;

-- ALTER TABLE local_persistent_volumes
-- Review 2023_08_06_142954_add_readonly_localpersistentvolumes.php for specific alterations
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_readonly BOOLEAN DEFAULT FALSE;
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_readonly TEXT;
