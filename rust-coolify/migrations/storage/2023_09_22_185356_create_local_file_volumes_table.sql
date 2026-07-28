-- completed mig_073
-- Converted from: 2023_09_22_185356_create_local_file_volumes_table.php

CREATE TABLE IF NOT EXISTS local_file_volumes (
    uuid VARCHAR(255),
    fs_path TEXT,
    mount_path VARCHAR(255),
    content TEXT,
    resource TEXT
);

DROP TABLE IF EXISTS local_file_volumes;
