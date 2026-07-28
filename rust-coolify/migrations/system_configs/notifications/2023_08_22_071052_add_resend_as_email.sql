-- completed mig_060
-- Converted from: 2023_08_22_071052_add_resend_as_email.php

-- ALTER TABLE instance_settings
-- Review 2023_08_22_071052_add_resend_as_email.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resend_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resend_api_key TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resend_enabled TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resend_api_key TEXT;

-- ALTER TABLE instance_settings
-- Review 2023_08_22_071052_add_resend_as_email.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resend_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resend_api_key TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resend_enabled TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resend_api_key TEXT;
