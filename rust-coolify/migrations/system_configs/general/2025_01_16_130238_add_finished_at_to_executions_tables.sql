-- completed mig_249
-- Converted from: 2025_01_16_130238_add_finished_at_to_executions_tables.php

-- ALTER TABLE application_deployment_queues
-- Review 2025_01_16_130238_add_finished_at_to_executions_tables.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS finished_at TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS finished_at TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS finished_at TEXT;

-- ALTER TABLE scheduled_database_backup_executions
-- Review 2025_01_16_130238_add_finished_at_to_executions_tables.php for specific alterations
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS finished_at TEXT;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS finished_at TEXT;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS finished_at TEXT;

-- ALTER TABLE scheduled_task_executions
-- Review 2025_01_16_130238_add_finished_at_to_executions_tables.php for specific alterations
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS finished_at TEXT;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS finished_at TEXT;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS finished_at TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2025_01_16_130238_add_finished_at_to_executions_tables.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS finished_at TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS finished_at TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS finished_at TEXT;

-- ALTER TABLE scheduled_database_backup_executions
-- Review 2025_01_16_130238_add_finished_at_to_executions_tables.php for specific alterations
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS finished_at TEXT;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS finished_at TEXT;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS finished_at TEXT;

-- ALTER TABLE scheduled_task_executions
-- Review 2025_01_16_130238_add_finished_at_to_executions_tables.php for specific alterations
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS finished_at TEXT;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS finished_at TEXT;
ALTER TABLE scheduled_task_executions ADD COLUMN IF NOT EXISTS finished_at TEXT;
