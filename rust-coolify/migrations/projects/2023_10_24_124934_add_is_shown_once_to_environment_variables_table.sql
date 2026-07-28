-- completed mig_097
-- Converted from: 2023_10_24_124934_add_is_shown_once_to_environment_variables_table.php

-- ALTER TABLE environment_variables
-- Review 2023_10_24_124934_add_is_shown_once_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_shown_once BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_shown_once TEXT;

-- ALTER TABLE environment_variables
-- Review 2023_10_24_124934_add_is_shown_once_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_shown_once BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_shown_once TEXT;
