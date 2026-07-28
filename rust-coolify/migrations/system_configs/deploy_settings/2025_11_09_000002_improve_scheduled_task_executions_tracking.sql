-- completed mig_296
-- Converted from: 2025_11_09_000002_improve_scheduled_task_executions_tracking.php

-- ALTER TABLE scheduled_task_executions
-- Review 2025_11_09_000002_improve_scheduled_task_executions_tracking.php for specific alterations
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS started_at TIMESTAMP;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS retry_count INTEGER;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS duration DECIMAL(8,2);
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS error_details TEXT;

-- ALTER TABLE scheduled_task_executions
-- Review 2025_11_09_000002_improve_scheduled_task_executions_tracking.php for specific alterations
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS started_at TIMESTAMP;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS retry_count INTEGER;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS duration DECIMAL(8,2);
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS error_details TEXT;

-- ALTER TABLE scheduled_task_executions
-- Review 2025_11_09_000002_improve_scheduled_task_executions_tracking.php for specific alterations
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS started_at TIMESTAMP;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS retry_count INTEGER;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS duration DECIMAL(8,2);
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS error_details TEXT;

-- ALTER TABLE scheduled_task_executions
-- Review 2025_11_09_000002_improve_scheduled_task_executions_tracking.php for specific alterations
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS started_at TIMESTAMP;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS retry_count INTEGER;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS duration DECIMAL(8,2);
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS error_details TEXT;

-- ALTER TABLE scheduled_task_executions
-- Review 2025_11_09_000002_improve_scheduled_task_executions_tracking.php for specific alterations
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS started_at TIMESTAMP;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS retry_count INTEGER;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS duration DECIMAL(8,2);
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS error_details TEXT;
