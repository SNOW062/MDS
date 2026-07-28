-- completed mig_252
-- Converted from: 2025_01_27_102616_add_ssl_fields_to_database_tables.php

-- ALTER TABLE standalone_postgresqls
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_mysqls
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_mariadbs
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_redis
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_keydbs
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_dragonflies
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_mongodbs
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_postgresqls
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_mysqls
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_mariadbs
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_redis
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_keydbs
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_dragonflies
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS ssl_mode TEXT;

-- ALTER TABLE standalone_mongodbs
-- Review 2025_01_27_102616_add_ssl_fields_to_database_tables.php for specific alterations
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS enable_ssl TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS ssl_mode TEXT;
