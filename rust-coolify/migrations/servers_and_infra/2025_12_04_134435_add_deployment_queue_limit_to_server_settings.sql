-- completed mig_309
-- Converted from: 2025_12_04_134435_add_deployment_queue_limit_to_server_settings.php

-- ALTER TABLE server_settings
-- Review 2025_12_04_134435_add_deployment_queue_limit_to_server_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS deployment_queue_limit INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS deployment_queue_limit TEXT;

-- ALTER TABLE server_settings
-- Review 2025_12_04_134435_add_deployment_queue_limit_to_server_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS deployment_queue_limit INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS deployment_queue_limit TEXT;
