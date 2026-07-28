-- completed mig_104
-- Converted from: 2023_11_14_103450_add_manual_webhook_secret.php

-- ALTER TABLE applications
-- Review 2023_11_14_103450_add_manual_webhook_secret.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_github VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_gitlab VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_github TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_gitlab TEXT;

-- ALTER TABLE applications
-- Review 2023_11_14_103450_add_manual_webhook_secret.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_github VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_gitlab VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_github TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_gitlab TEXT;
