-- completed mig_048
-- Converted from: 2023_08_07_142950_create_standalone_postgresqls_table.php

CREATE TABLE IF NOT EXISTS standalone_postgresqls (
    uuid VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255),
    postgres_user VARCHAR(255),
    postgres_password TEXT,
    postgres_db VARCHAR(255),
    postgres_initdb_args VARCHAR(255),
    postgres_host_auth_method VARCHAR(255),
    init_scripts JSONB,
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
    environment_id BIGINT
);

DROP TABLE IF EXISTS standalone_postgresqls;
