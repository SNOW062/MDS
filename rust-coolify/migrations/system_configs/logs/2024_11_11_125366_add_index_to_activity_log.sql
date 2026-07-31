-- completed mig_224
-- Migration: 2024_11_11_125366_add_index_to_activity_log

-- up() method implementation
ALTER TABLE activity_log ALTER COLUMN properties TYPE JSONB USING properties::jsonb;
CREATE INDEX IF NOT EXISTS idx_activity_type_uuid ON activity_log USING GIN (properties jsonb_path_ops);

-- down() method implementation reference:
-- DROP INDEX IF EXISTS idx_activity_type_uuid;
-- ALTER TABLE activity_log ALTER COLUMN properties TYPE JSON USING properties::json;
