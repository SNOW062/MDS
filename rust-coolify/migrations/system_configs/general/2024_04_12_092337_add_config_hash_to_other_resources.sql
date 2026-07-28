-- completed mig_162
-- Converted from: 2024_04_12_092337_add_config_hash_to_other_resources.php

-- ALTER TABLE standalone_postgresqls
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_redis
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_mysqls
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_mariadbs
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_mongodbs
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_keydbs
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_dragonflies
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_clickhouses
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE services
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_postgresqls
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_redis
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_mysqls
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_mariadbs
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_mongodbs
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_keydbs
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_keydbs ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_dragonflies
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_dragonflies ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE standalone_clickhouses
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS config_hash TEXT;

-- ALTER TABLE services
-- Review 2024_04_12_092337_add_config_hash_to_other_resources.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS config_hash TEXT;
