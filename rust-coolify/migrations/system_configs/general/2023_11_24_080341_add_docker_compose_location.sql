-- completed mig_111
-- Converted from: 2023_11_24_080341_add_docker_compose_location.php

-- ALTER TABLE applications
-- Review 2023_11_24_080341_add_docker_compose_location.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_location VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_pr_location VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_pr TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_raw TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_pr_raw TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_domains TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_location TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_pr_location TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_pr TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_raw TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_pr_raw TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_domains TEXT;

-- ALTER TABLE applications
-- Review 2023_11_24_080341_add_docker_compose_location.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_location VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_pr_location VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_pr TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_raw TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_pr_raw TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_domains TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_location TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_pr_location TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_pr TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_raw TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_pr_raw TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_domains TEXT;
