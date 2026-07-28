-- completed mig_188
-- Converted from: 2024_07_17_123828_add_is_container_labels_readonly.php

-- ALTER TABLE application_settings
-- Review 2024_07_17_123828_add_is_container_labels_readonly.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_readonly_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_readonly_enabled TEXT;

-- ALTER TABLE application_settings
-- Review 2024_07_17_123828_add_is_container_labels_readonly.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_readonly_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_readonly_enabled TEXT;
