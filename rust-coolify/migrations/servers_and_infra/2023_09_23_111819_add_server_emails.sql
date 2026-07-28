-- completed mig_084
-- Converted from: 2023_09_23_111819_add_server_emails.php

-- ALTER TABLE servers
-- Review 2023_09_23_111819_add_server_emails.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_email_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_count TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_email_sent TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_count INTEGER;

-- ALTER TABLE servers
-- Review 2023_09_23_111819_add_server_emails.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_email_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_count TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_email_sent TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_count INTEGER;
