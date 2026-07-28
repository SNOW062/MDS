-- completed mig_001
-- Converted from: 2014_10_12_000000_create_users_table.php

CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(255),
    email VARCHAR(255),
    email_verified_at TIMESTAMP,
    password VARCHAR(255)
);

DROP TABLE IF EXISTS users;
