-- completed mig_130
-- Converted from: 2024_01_23_095832_add_manual_webhook_secret_bitbucket.php

-- ALTER TABLE applications
-- Review 2024_01_23_095832_add_manual_webhook_secret_bitbucket.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_bitbucket VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_bitbucket TEXT;

-- ALTER TABLE applications
-- Review 2024_01_23_095832_add_manual_webhook_secret_bitbucket.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_bitbucket VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_bitbucket TEXT;
