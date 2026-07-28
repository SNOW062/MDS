-- completed mig_177
-- Converted from: 2024_06_05_101019_add_docker_compose_pr_domains.php

-- ALTER TABLE application_previews
-- Review 2024_06_05_101019_add_docker_compose_pr_domains.php for specific alterations
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS docker_compose_domains TEXT;
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS docker_compose_domains TEXT;

-- ALTER TABLE application_previews
-- Review 2024_06_05_101019_add_docker_compose_pr_domains.php for specific alterations
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS docker_compose_domains TEXT;
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS docker_compose_domains TEXT;
