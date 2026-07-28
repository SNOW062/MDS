-- completed mig_053
-- Converted from: 2023_08_15_095902_create_waitlists_table.php

CREATE TABLE IF NOT EXISTS waitlists (
    uuid VARCHAR(255),
    type VARCHAR(255),
    email VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS waitlists;
