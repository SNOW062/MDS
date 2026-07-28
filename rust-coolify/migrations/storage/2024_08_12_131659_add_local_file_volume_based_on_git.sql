-- completed mig_196
-- Converted from: 2024_08_12_131659_add_local_file_volume_based_on_git.php

-- ALTER TABLE local_file_volumes
-- Review 2024_08_12_131659_add_local_file_volume_based_on_git.php for specific alterations
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_based_on_git BOOLEAN DEFAULT FALSE;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_based_on_git TEXT;

-- ALTER TABLE local_file_volumes
-- Review 2024_08_12_131659_add_local_file_volume_based_on_git.php for specific alterations
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_based_on_git BOOLEAN DEFAULT FALSE;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_based_on_git TEXT;
