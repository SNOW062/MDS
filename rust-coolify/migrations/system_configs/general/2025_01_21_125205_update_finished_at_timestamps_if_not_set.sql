-- completed mig_250
-- Migration: 2025_01_21_125205_update_finished_at_timestamps_if_not_set

-- up() method implementation
UPDATE application_deployment_queues
SET finished_at = updated_at
WHERE finished_at IS NULL;

UPDATE scheduled_database_backup_executions
SET finished_at = updated_at
WHERE finished_at IS NULL;

UPDATE scheduled_task_executions
SET finished_at = updated_at
WHERE finished_at IS NULL;
