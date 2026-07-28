-- completed mig_013
-- Converted from: 2023_03_20_112814_create_instance_settings_table.php

CREATE TABLE IF NOT EXISTS instance_settings (
    public_ipv4 VARCHAR(255),
    public_ipv6 VARCHAR(255),
    fqdn VARCHAR(255),
    wildcard_domain VARCHAR(255),
    default_redirect_404 VARCHAR(255),
    public_port_min INTEGER,
    public_port_max INTEGER,
    do_not_track BOOLEAN DEFAULT FALSE,
    is_auto_update_enabled BOOLEAN DEFAULT FALSE,
    is_registration_enabled BOOLEAN DEFAULT FALSE,
    smtp TEXT
);

DROP TABLE IF EXISTS instance_settings;
