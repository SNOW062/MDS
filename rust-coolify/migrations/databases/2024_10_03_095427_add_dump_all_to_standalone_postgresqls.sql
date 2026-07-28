-- completed mig_210
-- Converted from: 2024_10_03_095427_add_dump_all_to_standalone_postgresqls.php

-- ALTER TABLE scheduled_database_backups
-- Review 2024_10_03_095427_add_dump_all_to_standalone_postgresqls.php for specific alterations
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS dump_all BOOLEAN DEFAULT FALSE;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS dump_all TEXT;

-- ALTER TABLE scheduled_database_backups
-- Review 2024_10_03_095427_add_dump_all_to_standalone_postgresqls.php for specific alterations
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS dump_all BOOLEAN DEFAULT FALSE;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS dump_all TEXT;
