-- completed mig_317
-- Converted from: 2025_12_24_095507_add_server_to_shared_environment_variables_table.php

-- ALTER TABLE shared_environment_variables
-- Review 2025_12_24_095507_add_server_to_shared_environment_variables_table.php for specific alterations
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS server_id BIGINT;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS server_id TEXT;

-- ALTER TABLE shared_environment_variables
-- Review 2025_12_24_095507_add_server_to_shared_environment_variables_table.php for specific alterations
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS server_id BIGINT;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS server_id TEXT;
