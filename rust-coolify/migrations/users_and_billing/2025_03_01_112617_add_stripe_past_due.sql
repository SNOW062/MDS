-- completed mig_256
-- Converted from: 2025_03_01_112617_add_stripe_past_due.php

-- ALTER TABLE subscriptions
-- Review 2025_03_01_112617_add_stripe_past_due.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_past_due BOOLEAN DEFAULT FALSE;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_past_due TEXT;

-- ALTER TABLE subscriptions
-- Review 2025_03_01_112617_add_stripe_past_due.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_past_due BOOLEAN DEFAULT FALSE;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_past_due TEXT;
