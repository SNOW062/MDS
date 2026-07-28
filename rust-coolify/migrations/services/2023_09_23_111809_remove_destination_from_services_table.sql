-- completed mig_075
-- Converted from: 2023_09_23_111809_remove_destination_from_services_table.php

-- ALTER TABLE services
-- Review 2023_09_23_111809_remove_destination_from_services_table.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS destination_type TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS destination_id TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS destination TEXT;

-- ALTER TABLE services
-- Review 2023_09_23_111809_remove_destination_from_services_table.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS destination_type TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS destination_id TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS destination TEXT;
