-- completed mig_085
-- Converted from: 2023_10_08_111819_add_server_unreachable_count.php

-- ALTER TABLE servers
-- Review 2023_10_08_111819_add_server_unreachable_count.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_count INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_count TEXT;

-- ALTER TABLE servers
-- Review 2023_10_08_111819_add_server_unreachable_count.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_count INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_count TEXT;
