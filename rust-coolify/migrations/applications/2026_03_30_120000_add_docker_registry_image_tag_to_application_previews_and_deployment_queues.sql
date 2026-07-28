-- completed mig_329
-- Converted from: 2026_03_30_120000_add_docker_registry_image_tag_to_application_previews_and_deployment_queues.php

-- ALTER TABLE application_previews
-- Review 2026_03_30_120000_add_docker_registry_image_tag_to_application_previews_and_deployment_queues.php for specific alterations
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS docker_registry_image_tag VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS docker_registry_image_tag VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS docker_registry_image_tag TEXT;
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS docker_registry_image_tag TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2026_03_30_120000_add_docker_registry_image_tag_to_application_previews_and_deployment_queues.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS docker_registry_image_tag VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS docker_registry_image_tag VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS docker_registry_image_tag TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS docker_registry_image_tag TEXT;

-- ALTER TABLE application_previews
-- Review 2026_03_30_120000_add_docker_registry_image_tag_to_application_previews_and_deployment_queues.php for specific alterations
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS docker_registry_image_tag VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS docker_registry_image_tag VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS docker_registry_image_tag TEXT;
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS docker_registry_image_tag TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2026_03_30_120000_add_docker_registry_image_tag_to_application_previews_and_deployment_queues.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS docker_registry_image_tag VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS docker_registry_image_tag VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS docker_registry_image_tag TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS docker_registry_image_tag TEXT;
