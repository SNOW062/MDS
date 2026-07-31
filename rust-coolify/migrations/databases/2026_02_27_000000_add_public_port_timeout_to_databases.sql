-- completed mig_321
-- Migration: 2026_02_27_000000_add_public_port_timeout_to_databases

-- up() method implementation
-- Adds public_port_timeout column (default 3600) to all database engine tables

DO $$
DECLARE
    t text;
    tables text[] := ARRAY[
        'standalone_postgresqls',
        'standalone_mysqls',
        'standalone_mariadbs',
        'standalone_redis',
        'standalone_mongodbs',
        'standalone_clickhouses',
        'standalone_keydbs',
        'standalone_dragonflies',
        'service_databases'
    ];
BEGIN
    FOREACH t IN ARRAY tables LOOP
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = t) THEN
            EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS public_port_timeout INT NULL DEFAULT 3600;', t);
        END IF;
    END LOOP;
END $$;

-- down() method implementation reference:
-- Drops public_port_timeout column from database engine tables
