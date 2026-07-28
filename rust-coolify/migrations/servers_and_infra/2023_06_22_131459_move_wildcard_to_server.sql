-- completed mig_033
-- Converted from: 2023_06_22_131459_move_wildcard_to_server.php

-- ALTER TABLE project_settings
-- Review 2023_06_22_131459_move_wildcard_to_server.php for specific alterations
ALTER TABLE project_settings ADD COLUMN IF NOT EXISTS wildcard_domain TEXT;
ALTER TABLE project_settings ADD COLUMN IF NOT EXISTS wildcard_domain VARCHAR(255);
ALTER TABLE project_settings ADD COLUMN IF NOT EXISTS wildcard_domain VARCHAR(255);
ALTER TABLE project_settings ADD COLUMN IF NOT EXISTS wildcard_domain TEXT;

-- ALTER TABLE server_settings
-- Review 2023_06_22_131459_move_wildcard_to_server.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS wildcard_domain TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS wildcard_domain VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS wildcard_domain VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS wildcard_domain TEXT;

-- ALTER TABLE project_settings
-- Review 2023_06_22_131459_move_wildcard_to_server.php for specific alterations
ALTER TABLE project_settings ADD COLUMN IF NOT EXISTS wildcard_domain TEXT;
ALTER TABLE project_settings ADD COLUMN IF NOT EXISTS wildcard_domain VARCHAR(255);
ALTER TABLE project_settings ADD COLUMN IF NOT EXISTS wildcard_domain VARCHAR(255);
ALTER TABLE project_settings ADD COLUMN IF NOT EXISTS wildcard_domain TEXT;

-- ALTER TABLE server_settings
-- Review 2023_06_22_131459_move_wildcard_to_server.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS wildcard_domain TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS wildcard_domain VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS wildcard_domain VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS wildcard_domain TEXT;
