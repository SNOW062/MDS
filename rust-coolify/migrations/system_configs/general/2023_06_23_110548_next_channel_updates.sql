-- completed mig_035
-- Converted from: 2023_06_23_110548_next_channel_updates.php

-- ALTER TABLE instance_settings
-- Review 2023_06_23_110548_next_channel_updates.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS next_channel BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS next_channel TEXT;

-- ALTER TABLE instance_settings
-- Review 2023_06_23_110548_next_channel_updates.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS next_channel BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS next_channel TEXT;
