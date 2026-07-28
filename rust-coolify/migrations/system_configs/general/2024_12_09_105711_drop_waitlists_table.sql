-- completed mig_234
-- Converted from: 2024_12_09_105711_drop_waitlists_table.php

CREATE TABLE IF NOT EXISTS waitlists (
    uuid VARCHAR(255),
    type VARCHAR(255),
    email VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS waitlists;
