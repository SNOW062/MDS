-- completed mig_054
-- Converted from: 2023_08_15_111125_update_users_table.php

-- ALTER TABLE users
-- Review 2023_08_15_111125_update_users_table.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS force_password_reset BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS force_password_reset TEXT;

-- ALTER TABLE users
-- Review 2023_08_15_111125_update_users_table.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS force_password_reset BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS force_password_reset TEXT;
