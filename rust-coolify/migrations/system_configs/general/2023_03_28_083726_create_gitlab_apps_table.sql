-- completed mig_028
-- Converted from: 2023_03_28_083726_create_gitlab_apps_table.php

CREATE TABLE IF NOT EXISTS gitlab_apps (
    uuid VARCHAR(255),
    name VARCHAR(255),
    organization VARCHAR(255),
    api_url VARCHAR(255),
    html_url VARCHAR(255),
    custom_port INTEGER,
    custom_user VARCHAR(255),
    is_system_wide BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT FALSE,
    app_id INTEGER,
    app_secret VARCHAR(255),
    oauth_id INTEGER,
    group_name VARCHAR(255),
    public_key TEXT,
    webhook_token TEXT,
    deploy_key_id INTEGER,
    private_key_id BIGINT,
    team_id BIGINT
);

DROP TABLE IF EXISTS gitlab_apps;
