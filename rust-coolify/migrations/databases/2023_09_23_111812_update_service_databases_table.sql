-- completed mig_077
-- Converted from: 2023_09_23_111812_update_service_databases_table.php

-- ALTER TABLE service_databases
-- Review 2023_09_23_111812_update_service_databases_table.php for specific alterations
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS exclude_from_status BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS image VARCHAR(255);
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS exclude_from_status TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS image TEXT;

-- ALTER TABLE service_databases
-- Review 2023_09_23_111812_update_service_databases_table.php for specific alterations
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS exclude_from_status BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS image VARCHAR(255);
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS exclude_from_status TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS image TEXT;
