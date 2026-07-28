-- completed mig_173
-- Converted from: 2024_05_17_082012_add_env_sorting_toggle.php

-- ALTER TABLE application_settings
-- Review 2024_05_17_082012_add_env_sorting_toggle.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_env_sorting_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_env_sorting_enabled TEXT;

-- ALTER TABLE application_settings
-- Review 2024_05_17_082012_add_env_sorting_toggle.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_env_sorting_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_env_sorting_enabled TEXT;
