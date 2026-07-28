-- completed mig_323
-- Converted from: 2026_03_16_000000_add_is_preview_suffix_enabled_to_volume_tables.php

-- ALTER TABLE local_file_volumes
-- Review 2026_03_16_000000_add_is_preview_suffix_enabled_to_volume_tables.php for specific alterations
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled TEXT;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled TEXT;

-- ALTER TABLE local_persistent_volumes
-- Review 2026_03_16_000000_add_is_preview_suffix_enabled_to_volume_tables.php for specific alterations
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled TEXT;
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled TEXT;

-- ALTER TABLE local_file_volumes
-- Review 2026_03_16_000000_add_is_preview_suffix_enabled_to_volume_tables.php for specific alterations
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled TEXT;
ALTER TABLE local_file_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled TEXT;

-- ALTER TABLE local_persistent_volumes
-- Review 2026_03_16_000000_add_is_preview_suffix_enabled_to_volume_tables.php for specific alterations
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled TEXT;
ALTER TABLE local_persistent_volumes ADD COLUMN IF NOT EXISTS is_preview_suffix_enabled TEXT;
