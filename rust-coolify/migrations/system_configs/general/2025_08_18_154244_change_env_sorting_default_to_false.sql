-- completed mig_276
-- Converted from: 2025_08_18_154244_change_env_sorting_default_to_false.php

-- ALTER TABLE application_settings
-- Review 2025_08_18_154244_change_env_sorting_default_to_false.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_env_sorting_enabled BOOLEAN DEFAULT FALSE;
