-- completed mig_288
-- Converted from: 2025_10_08_181125_create_cloud_provider_tokens_table.php

CREATE TABLE IF NOT EXISTS cloud_provider_tokens (
    team_id BIGINT,
    provider VARCHAR(255),
    token TEXT,
    name VARCHAR(255)
);

DROP TABLE IF EXISTS cloud_provider_tokens;
