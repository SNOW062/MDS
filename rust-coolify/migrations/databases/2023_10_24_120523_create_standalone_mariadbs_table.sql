-- completed mig_095
-- Converted from: 2023_10_24_120523_create_standalone_mariadbs_table.php

CREATE TABLE IF NOT EXISTS standalone_mariadbs (
    uuid VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255),
    mariadb_root_password TEXT,
    mariadb_user VARCHAR(255),
    mariadb_password TEXT,
    mariadb_database VARCHAR(255),
    mariadb_conf TEXT,
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

DROP TABLE IF EXISTS standalone_mariadbs;
