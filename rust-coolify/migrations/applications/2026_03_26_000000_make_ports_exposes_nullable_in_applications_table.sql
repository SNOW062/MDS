-- completed mig_326
-- Converted from: 2026_03_26_000000_make_ports_exposes_nullable_in_applications_table.php

-- ALTER TABLE applications
-- Review 2026_03_26_000000_make_ports_exposes_nullable_in_applications_table.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS ports_exposes VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS ports_exposes VARCHAR(255);

-- ALTER TABLE applications
-- Review 2026_03_26_000000_make_ports_exposes_nullable_in_applications_table.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS ports_exposes VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS ports_exposes VARCHAR(255);
