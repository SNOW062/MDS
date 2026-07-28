-- completed mig_253
-- Converted from: 2025_01_27_153741_create_ssl_certificates_table.php

CREATE TABLE IF NOT EXISTS ssl_certificates (
    ssl_certificate TEXT,
    ssl_private_key TEXT,
    configuration_dir TEXT,
    mount_path TEXT,
    resource_type VARCHAR(255),
    resource_id BIGINT,
    server_id BIGINT,
    common_name TEXT,
    subject_alternative_names JSONB,
    valid_until TIMESTAMP,
    is_ca_certificate BOOLEAN DEFAULT FALSE,
    server_id TEXT
);

DROP TABLE IF EXISTS ssl_certificates;
