-- completed mig_305
-- Converted from: 2025_11_17_145255_add_comment_to_environment_variables_table.php

-- ALTER TABLE environment_variables
-- Review 2025_11_17_145255_add_comment_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS comment VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS comment VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS comment TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS comment TEXT;

-- ALTER TABLE shared_environment_variables
-- Review 2025_11_17_145255_add_comment_to_environment_variables_table.php for specific alterations
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS comment VARCHAR(255);
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS comment VARCHAR(255);
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS comment TEXT;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS comment TEXT;

-- ALTER TABLE environment_variables
-- Review 2025_11_17_145255_add_comment_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS comment VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS comment VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS comment TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS comment TEXT;

-- ALTER TABLE shared_environment_variables
-- Review 2025_11_17_145255_add_comment_to_environment_variables_table.php for specific alterations
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS comment VARCHAR(255);
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS comment VARCHAR(255);
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS comment TEXT;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS comment TEXT;
