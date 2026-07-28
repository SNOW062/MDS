-- completed mig_061
-- Converted from: 2023_08_22_071053_add_resend_as_email_to_teams.php

-- ALTER TABLE teams
-- Review 2023_08_22_071053_add_resend_as_email_to_teams.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS resend_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS resend_api_key TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS use_instance_email_settings BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS resend_enabled TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS resend_api_key TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS use_instance_email_settings TEXT;

-- ALTER TABLE teams
-- Review 2023_08_22_071053_add_resend_as_email_to_teams.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS resend_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS resend_api_key TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS use_instance_email_settings BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS resend_enabled TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS resend_api_key TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS use_instance_email_settings TEXT;
