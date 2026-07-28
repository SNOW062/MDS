-- completed mig_086
-- Converted from: 2023_10_10_100320_update_s3_storages_table.php

-- ALTER TABLE s3_storages
-- Review 2023_10_10_100320_update_s3_storages_table.php for specific alterations
ALTER TABLE s3_storages ADD COLUMN IF NOT EXISTS is_usable BOOLEAN DEFAULT FALSE;
ALTER TABLE s3_storages ADD COLUMN IF NOT EXISTS unusable_email_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE s3_storages ADD COLUMN IF NOT EXISTS is_usable TEXT;
ALTER TABLE s3_storages ADD COLUMN IF NOT EXISTS unusable_email_sent TEXT;

-- ALTER TABLE s3_storages
-- Review 2023_10_10_100320_update_s3_storages_table.php for specific alterations
ALTER TABLE s3_storages ADD COLUMN IF NOT EXISTS is_usable BOOLEAN DEFAULT FALSE;
ALTER TABLE s3_storages ADD COLUMN IF NOT EXISTS unusable_email_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE s3_storages ADD COLUMN IF NOT EXISTS is_usable TEXT;
ALTER TABLE s3_storages ADD COLUMN IF NOT EXISTS unusable_email_sent TEXT;
