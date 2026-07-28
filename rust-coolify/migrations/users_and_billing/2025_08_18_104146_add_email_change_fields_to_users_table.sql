-- completed mig_275
-- Converted from: 2025_08_18_104146_add_email_change_fields_to_users_table.php

-- ALTER TABLE users
-- Review 2025_08_18_104146_add_email_change_fields_to_users_table.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS pending_email VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_change_code VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_change_code_expires_at TIMESTAMP;

-- ALTER TABLE users
-- Review 2025_08_18_104146_add_email_change_fields_to_users_table.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS pending_email VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_change_code VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_change_code_expires_at TIMESTAMP;
