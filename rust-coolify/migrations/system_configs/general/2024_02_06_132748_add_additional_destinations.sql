-- completed mig_139
-- Converted from: 2024_02_06_132748_add_additional_destinations.php

CREATE TABLE IF NOT EXISTS additional_destinations (
    application_id BIGINT,
    server_id BIGINT,
    status VARCHAR(255),
    standalone_docker_id BIGINT,
    additional_destinations TEXT,
    additional_destinations VARCHAR(255)
);

-- ALTER TABLE applications
-- Review 2024_02_06_132748_add_additional_destinations.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS application_id BIGINT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS server_id BIGINT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS status VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS standalone_docker_id BIGINT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS additional_destinations TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS additional_destinations VARCHAR(255);

-- ALTER TABLE applications
-- Review 2024_02_06_132748_add_additional_destinations.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS application_id BIGINT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS server_id BIGINT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS status VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS standalone_docker_id BIGINT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS additional_destinations TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS additional_destinations VARCHAR(255);

DROP TABLE IF EXISTS additional_destinations;
