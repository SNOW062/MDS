-- completed mig_005
-- Converted from: 2019_12_14_000001_create_personal_access_tokens_table.php

CREATE TABLE IF NOT EXISTS personal_access_tokens (
    tokenable TEXT,
    name VARCHAR(255),
    token VARCHAR(255),
    team_id VARCHAR(255),
    abilities TEXT,
    last_used_at TIMESTAMP,
    expires_at TIMESTAMP
);

DROP TABLE IF EXISTS personal_access_tokens;
