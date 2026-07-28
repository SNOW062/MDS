-- completed mig_055
-- Converted from: 2023_08_15_111126_update_servers_add_unreachable_count_table.php

-- ALTER TABLE servers
-- Review 2023_08_15_111126_update_servers_add_unreachable_count_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_count INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_count TEXT;

-- ALTER TABLE servers
-- Review 2023_08_15_111126_update_servers_add_unreachable_count_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_count INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_count TEXT;
