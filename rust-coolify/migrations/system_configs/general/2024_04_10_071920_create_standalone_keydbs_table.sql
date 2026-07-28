-- completed mig_158
-- Converted from: 2024_04_10_071920_create_standalone_keydbs_table.php

CREATE TABLE IF NOT EXISTS standalone_keydbs (
    uuid VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255),
    keydb_password TEXT,
    keydb_conf TEXT,
    is_log_drain_enabled BOOLEAN DEFAULT FALSE,
    is_include_timestamps BOOLEAN DEFAULT FALSE,
    status VARCHAR(255),
    image VARCHAR(255),
    is_public BOOLEAN DEFAULT FALSE,
    public_port INTEGER,
    ports_mappings TEXT,
    limits_memory VARCHAR(255),
    limits_memory_swap VARCHAR(255),
    limits_memory_swappiness INTEGER,
    limits_memory_reservation VARCHAR(255),
    limits_cpus VARCHAR(255),
    limits_cpuset VARCHAR(255),
    limits_cpu_shares INTEGER,
    started_at TIMESTAMP,
    destination TEXT,
    environment_id BIGINT,
    standalone_keydb_id BIGINT,
    standalone_keydb_id TEXT
);

-- ALTER TABLE environment_variables
-- Review 2024_04_10_071920_create_standalone_keydbs_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS uuid VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS description VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS keydb_password TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS keydb_conf TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS status VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS image VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS public_port INTEGER;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS ports_mappings TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_memory VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_memory_swap VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_memory_swappiness INTEGER;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_memory_reservation VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_cpus VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_cpuset VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_cpu_shares INTEGER;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS started_at TIMESTAMP;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS destination TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS environment_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_keydb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_keydb_id TEXT;

-- ALTER TABLE environment_variables
-- Review 2024_04_10_071920_create_standalone_keydbs_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS uuid VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS description VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS keydb_password TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS keydb_conf TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS status VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS image VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS public_port INTEGER;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS ports_mappings TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_memory VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_memory_swap VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_memory_swappiness INTEGER;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_memory_reservation VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_cpus VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_cpuset VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS limits_cpu_shares INTEGER;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS started_at TIMESTAMP;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS destination TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS environment_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_keydb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_keydb_id TEXT;

DROP TABLE IF EXISTS standalone_keydbs;
