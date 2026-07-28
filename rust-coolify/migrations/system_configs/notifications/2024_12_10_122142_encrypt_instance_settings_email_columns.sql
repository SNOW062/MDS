-- completed mig_235
-- Converted from: 2024_12_10_122142_encrypt_instance_settings_email_columns.php

-- ALTER TABLE instance_settings
-- Review 2024_12_10_122142_encrypt_instance_settings_email_columns.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_from_address TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_from_name TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_recipients TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_host TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_username TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_from_address VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_from_name VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_recipients VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_host VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_username VARCHAR(255);

-- ALTER TABLE instance_settings
-- Review 2024_12_10_122142_encrypt_instance_settings_email_columns.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_from_address TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_from_name TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_recipients TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_host TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_username TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_from_address VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_from_name VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_recipients VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_host VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS smtp_username VARCHAR(255);
