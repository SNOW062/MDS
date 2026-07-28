-- completed mig_267
-- Converted from: 2025_06_06_073345_create_server_previous_ip.php

-- ALTER TABLE servers
-- Review 2025_06_06_073345_create_server_previous_ip.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS ip_previous VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS ip_previous TEXT;

-- ALTER TABLE servers
-- Review 2025_06_06_073345_create_server_previous_ip.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS ip_previous VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS ip_previous TEXT;
