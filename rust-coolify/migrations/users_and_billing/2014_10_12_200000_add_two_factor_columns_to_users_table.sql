-- completed mig_003
-- Converted from: 2014_10_12_200000_add_two_factor_columns_to_users_table.php

-- ALTER TABLE users
-- Review 2014_10_12_200000_add_two_factor_columns_to_users_table.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_secret TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_recovery_codes TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_confirmed_at TIMESTAMP;

-- ALTER TABLE users
-- Review 2014_10_12_200000_add_two_factor_columns_to_users_table.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_secret TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_recovery_codes TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_confirmed_at TIMESTAMP;
