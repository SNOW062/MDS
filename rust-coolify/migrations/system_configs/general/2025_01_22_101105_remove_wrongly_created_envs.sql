-- completed mig_251
-- Migration: 2025_01_22_101105_remove_wrongly_created_envs

-- up() method implementation
DELETE FROM environment_variables
WHERE resourceable_id IS NULL;
