-- completed mig_264
-- Converted from: 2025_04_30_134146_add_is_migrated_to_services.php

-- ALTER TABLE service_applications
-- Review 2025_04_30_134146_add_is_migrated_to_services.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_migrated BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_migrated BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS custom_type VARCHAR(255);
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_migrated TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_migrated TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS custom_type TEXT;

-- ALTER TABLE service_databases
-- Review 2025_04_30_134146_add_is_migrated_to_services.php for specific alterations
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_migrated BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_migrated BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS custom_type VARCHAR(255);
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_migrated TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_migrated TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS custom_type TEXT;

-- ALTER TABLE service_applications
-- Review 2025_04_30_134146_add_is_migrated_to_services.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_migrated BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_migrated BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS custom_type VARCHAR(255);
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_migrated TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_migrated TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS custom_type TEXT;

-- ALTER TABLE service_databases
-- Review 2025_04_30_134146_add_is_migrated_to_services.php for specific alterations
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_migrated BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_migrated BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS custom_type VARCHAR(255);
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_migrated TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_migrated TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS custom_type TEXT;
