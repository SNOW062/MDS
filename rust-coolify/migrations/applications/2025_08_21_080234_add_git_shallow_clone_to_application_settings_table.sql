-- completed mig_277
-- Converted from: 2025_08_21_080234_add_git_shallow_clone_to_application_settings_table.php

-- ALTER TABLE application_settings
-- Review 2025_08_21_080234_add_git_shallow_clone_to_application_settings_table.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_git_shallow_clone_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_git_shallow_clone_enabled TEXT;

-- ALTER TABLE application_settings
-- Review 2025_08_21_080234_add_git_shallow_clone_to_application_settings_table.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_git_shallow_clone_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_git_shallow_clone_enabled TEXT;
