-- completed mig_259
-- Converted from: 2025_03_26_104103_disable_mongodb_ssl_by_default.php

-- ALTER TABLE standalone_mongodbs
-- Review 2025_03_26_104103_disable_mongodb_ssl_by_default.php for specific alterations
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;

-- ALTER TABLE standalone_mongodbs
-- Review 2025_03_26_104103_disable_mongodb_ssl_by_default.php for specific alterations
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
