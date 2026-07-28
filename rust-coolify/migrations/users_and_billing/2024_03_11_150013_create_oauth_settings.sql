-- completed mig_151
-- Converted from: 2024_03_11_150013_create_oauth_settings.php

CREATE TABLE IF NOT EXISTS oauth_settings (
    provider VARCHAR(255),
    enabled BOOLEAN DEFAULT FALSE,
    client_id VARCHAR(255),
    client_secret TEXT,
    redirect_uri VARCHAR(255),
    tenant VARCHAR(255)
);

DROP TABLE IF EXISTS oauth_settings;
