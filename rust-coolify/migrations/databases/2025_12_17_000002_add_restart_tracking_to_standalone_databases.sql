-- completed mig_316
-- Migration: 2025_12_17_000002_add_restart_tracking_to_standalone_databases

-- up() method implementation
-- Adds restart_count, last_restart_at, last_restart_type to all standalone database engine tables

DO $$
DECLARE
    t text;
    tables text[] := ARRAY[
        'standalone_postgresqls',
        'standalone_mysqls',
        'standalone_mariadbs',
        'standalone_redis',
        'standalone_mongodbs',
        'standalone_keydbs',
        'standalone_dragonflies',
        'standalone_clickhouses'
    ];
BEGIN
    FOREACH t IN ARRAY tables LOOP
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = t) THEN
            EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS restart_count INT NOT NULL DEFAULT 0;', t);
            EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS last_restart_at TIMESTAMP WITH TIME ZONE NULL;', t);
            EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS last_restart_type VARCHAR(10) NULL;', t);
        END IF;
    END LOOP;
END $$;

-- down() method implementation reference:
-- Drops restart_count, last_restart_at, last_restart_type columns from standalone tables
