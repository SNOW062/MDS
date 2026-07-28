-- completed mig_083
-- Converted from: 2023_09_23_111818_set_notifications_on_by_default.php

-- ALTER TABLE teams
-- Review 2023_09_23_111818_set_notifications_on_by_default.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_deployments BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_status_changes BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_deployments BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_status_changes BOOLEAN DEFAULT FALSE;

-- ALTER TABLE teams
-- Review 2023_09_23_111818_set_notifications_on_by_default.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_deployments BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_status_changes BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_deployments BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_status_changes BOOLEAN DEFAULT FALSE;
