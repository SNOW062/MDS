-- completed mig_027
-- Converted from: 2023_03_28_083723_create_github_apps_table.php

CREATE TABLE IF NOT EXISTS github_apps (
    uuid VARCHAR(255),
    name VARCHAR(255),
    organization VARCHAR(255),
    api_url VARCHAR(255),
    html_url VARCHAR(255),
    custom_user VARCHAR(255),
    custom_port INTEGER,
    app_id INTEGER,
    installation_id INTEGER,
    client_id VARCHAR(255),
    client_secret TEXT,
    webhook_secret TEXT,
    is_system_wide BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT FALSE,
    private_key_id BIGINT,
    team_id BIGINT
);

DROP TABLE IF EXISTS github_apps;
