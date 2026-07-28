-- completed mig_194
-- Converted from: 2024_08_07_155324_add_proxy_label_chooser.php

-- ALTER TABLE server_settings
-- Review 2024_08_07_155324_add_proxy_label_chooser.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS generate_exact_labels BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS generate_exact_labels TEXT;

-- ALTER TABLE server_settings
-- Review 2024_08_07_155324_add_proxy_label_chooser.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS generate_exact_labels BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS generate_exact_labels TEXT;
