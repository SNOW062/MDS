-- completed mig_198
-- Converted from: 2024_08_14_183120_add_order_to_environment_variables_table.php

-- ALTER TABLE environment_variables
-- Review 2024_08_14_183120_add_order_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS order INTEGER;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS order TEXT;

-- ALTER TABLE environment_variables
-- Review 2024_08_14_183120_add_order_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS order INTEGER;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS order TEXT;
