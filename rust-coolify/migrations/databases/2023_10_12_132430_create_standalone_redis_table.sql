-- completed mig_088
-- Converted from: 2023_10_12_132430_create_standalone_redis_table.php

CREATE TABLE IF NOT EXISTS standalone_redis (
    uuid VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255),
    redis_password TEXT,
    redis_conf TEXT,
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

DROP TABLE IF EXISTS standalone_redis;
