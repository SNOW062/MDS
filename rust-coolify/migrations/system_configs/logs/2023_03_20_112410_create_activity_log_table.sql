-- completed mig_006
-- Migration: 2023_03_20_112410_create_activity_log_table
-- Connection: activitylog.database_connection

-- up() method implementation
CREATE TABLE IF NOT EXISTS activity_log (
    id BIGSERIAL PRIMARY KEY,
    log_name VARCHAR(255) NULL,
    description TEXT NOT NULL,
    subject_type VARCHAR(255) NULL,
    subject_id BIGINT NULL,
    causer_type VARCHAR(255) NULL,
    causer_id BIGINT NULL,
    properties JSONB NULL,
    created_at TIMESTAMP WITH TIME ZONE NULL,
    updated_at TIMESTAMP WITH TIME ZONE NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_log_log_name ON activity_log(log_name);
CREATE INDEX IF NOT EXISTS idx_activity_log_subject ON activity_log(subject_type, subject_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_causer ON activity_log(causer_type, causer_id);

-- down() method implementation reference:
-- DROP TABLE IF EXISTS activity_log;
