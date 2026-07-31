-- completed mig_270
-- Migration: 2025_06_26_131350_optimize_activity_log_indexes

-- up() method implementation
CREATE INDEX IF NOT EXISTS idx_activity_type_uuid_created_at ON activity_log ((properties->>'type_uuid'), created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_properties_status ON activity_log ((properties->>'status'));

-- down() method implementation reference:
-- DROP INDEX IF EXISTS idx_activity_type_uuid_created_at;
-- DROP INDEX IF EXISTS idx_activity_properties_status;
