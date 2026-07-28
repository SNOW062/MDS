-- completed mig_101
-- Converted from: 2023_11_09_133332_add_public_port_to_service_databases.php

-- ALTER TABLE service_databases
-- Review 2023_11_09_133332_add_public_port_to_service_databases.php for specific alterations
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS public_port INTEGER;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS public_port TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_public TEXT;

-- ALTER TABLE service_databases
-- Review 2023_11_09_133332_add_public_port_to_service_databases.php for specific alterations
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS public_port INTEGER;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS public_port TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_public TEXT;
