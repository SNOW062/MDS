-- completed mig_308
-- Converted from: 2025_11_28_000001_migrate_clickhouse_to_official_image.php

-- ALTER TABLE standalone_clickhouses
-- Review 2025_11_28_000001_migrate_clickhouse_to_official_image.php for specific alterations
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS clickhouse_db VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS image VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS image VARCHAR(255);

-- ALTER TABLE standalone_clickhouses
-- Review 2025_11_28_000001_migrate_clickhouse_to_official_image.php for specific alterations
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS clickhouse_db VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS image VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS image VARCHAR(255);

-- ALTER TABLE standalone_clickhouses
-- Review 2025_11_28_000001_migrate_clickhouse_to_official_image.php for specific alterations
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS clickhouse_db VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS image VARCHAR(255);
ALTER TABLE standalone_clickhouses ADD COLUMN IF NOT EXISTS image VARCHAR(255);
