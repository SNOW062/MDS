-- completed mig_176
-- Converted from: 2024_05_23_091713_add_gitea_webhook_to_applications.php

-- ALTER TABLE applications
-- Review 2024_05_23_091713_add_gitea_webhook_to_applications.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_gitea VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_gitea TEXT;

-- ALTER TABLE applications
-- Review 2024_05_23_091713_add_gitea_webhook_to_applications.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_gitea VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS manual_webhook_secret_gitea TEXT;
