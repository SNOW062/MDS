-- completed mig_100
-- Converted from: 2023_11_08_112815_add_custom_config_standalone_postgresql.php

-- ALTER TABLE standalone_postgresqls
-- Review 2023_11_08_112815_add_custom_config_standalone_postgresql.php for specific alterations
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS postgres_conf TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS image VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS postgres_conf TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS image VARCHAR(255);

-- ALTER TABLE standalone_postgresqls
-- Review 2023_11_08_112815_add_custom_config_standalone_postgresql.php for specific alterations
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS postgres_conf TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS image VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS postgres_conf TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS image VARCHAR(255);
