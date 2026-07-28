-- completed mig_002
-- Converted from: 2014_10_12_100000_create_password_reset_tokens_table.php

CREATE TABLE IF NOT EXISTS password_reset_tokens (
    email VARCHAR(255),
    token VARCHAR(255),
    created_at TIMESTAMP
);

DROP TABLE IF EXISTS password_reset_tokens;
