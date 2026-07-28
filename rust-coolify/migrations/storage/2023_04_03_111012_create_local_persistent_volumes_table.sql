-- completed mig_029
-- Converted from: 2023_04_03_111012_create_local_persistent_volumes_table.php

CREATE TABLE IF NOT EXISTS local_persistent_volumes (
    name VARCHAR(255),
    mount_path VARCHAR(255),
    host_path VARCHAR(255),
    container_id VARCHAR(255),
    resource TEXT
);

DROP TABLE IF EXISTS local_persistent_volumes;
