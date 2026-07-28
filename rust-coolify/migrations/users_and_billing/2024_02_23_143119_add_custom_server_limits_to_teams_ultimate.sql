-- completed mig_146
-- Converted from: 2024_02_23_143119_add_custom_server_limits_to_teams_ultimate.php

-- ALTER TABLE teams
-- Review 2024_02_23_143119_add_custom_server_limits_to_teams_ultimate.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS custom_server_limit INTEGER;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS custom_server_limit TEXT;

-- ALTER TABLE teams
-- Review 2024_02_23_143119_add_custom_server_limits_to_teams_ultimate.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS custom_server_limit INTEGER;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS custom_server_limit TEXT;
