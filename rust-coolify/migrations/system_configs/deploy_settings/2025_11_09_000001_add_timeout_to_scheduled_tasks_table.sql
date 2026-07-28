-- completed mig_295
-- Converted from: 2025_11_09_000001_add_timeout_to_scheduled_tasks_table.php

-- ALTER TABLE scheduled_tasks
-- Review 2025_11_09_000001_add_timeout_to_scheduled_tasks_table.php for specific alterations
ALTER TABLE scheduled_tasks ADD COLUMN IF NOT EXISTS timeout INTEGER;
ALTER TABLE scheduled_tasks ADD COLUMN IF NOT EXISTS timeout TEXT;

-- ALTER TABLE scheduled_tasks
-- Review 2025_11_09_000001_add_timeout_to_scheduled_tasks_table.php for specific alterations
ALTER TABLE scheduled_tasks ADD COLUMN IF NOT EXISTS timeout INTEGER;
ALTER TABLE scheduled_tasks ADD COLUMN IF NOT EXISTS timeout TEXT;
