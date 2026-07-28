-- completed mig_297
-- Converted from: 2025_11_10_112500_add_restart_tracking_to_applications_table.php

-- ALTER TABLE applications
-- Review 2025_11_10_112500_add_restart_tracking_to_applications_table.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS restart_count INTEGER;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS last_restart_at TIMESTAMP;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS last_restart_type VARCHAR(255);

-- ALTER TABLE applications
-- Review 2025_11_10_112500_add_restart_tracking_to_applications_table.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS restart_count INTEGER;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS last_restart_at TIMESTAMP;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS last_restart_type VARCHAR(255);

-- ALTER TABLE applications
-- Review 2025_11_10_112500_add_restart_tracking_to_applications_table.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS restart_count INTEGER;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS last_restart_at TIMESTAMP;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS last_restart_type VARCHAR(255);

-- ALTER TABLE applications
-- Review 2025_11_10_112500_add_restart_tracking_to_applications_table.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS restart_count INTEGER;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS last_restart_at TIMESTAMP;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS last_restart_type VARCHAR(255);
