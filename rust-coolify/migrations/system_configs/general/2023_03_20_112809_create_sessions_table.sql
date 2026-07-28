-- completed mig_009
-- Converted from: 2023_03_20_112809_create_sessions_table.php

CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(255),
    user_id BIGINT,
    ip_address VARCHAR(255),
    user_agent TEXT,
    payload TEXT,
    last_activity INTEGER
);

DROP TABLE IF EXISTS sessions;
