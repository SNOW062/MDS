-- completed mig_292
-- Converted from: 2025_10_09_125036_add_is_validating_to_servers_table.php

-- ALTER TABLE servers
-- Review 2025_10_09_125036_add_is_validating_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_validating BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_validating TEXT;

-- ALTER TABLE servers
-- Review 2025_10_09_125036_add_is_validating_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_validating BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_validating TEXT;
