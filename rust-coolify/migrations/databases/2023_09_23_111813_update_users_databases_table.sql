-- completed mig_078
-- Converted from: 2023_09_23_111813_update_users_databases_table.php

-- ALTER TABLE users
-- Review 2023_09_23_111813_update_users_databases_table.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS marketing_emails BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS marketing_emails TEXT;

-- ALTER TABLE users
-- Review 2023_09_23_111813_update_users_databases_table.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS marketing_emails BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS marketing_emails TEXT;
