-- completed mig_320
-- Converted from: 2026_02_26_163035_add_stripe_refunded_at_to_subscriptions_table.php

-- ALTER TABLE subscriptions
-- Review 2026_02_26_163035_add_stripe_refunded_at_to_subscriptions_table.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_refunded_at TIMESTAMP;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_refunded_at TEXT;

-- ALTER TABLE subscriptions
-- Review 2026_02_26_163035_add_stripe_refunded_at_to_subscriptions_table.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_refunded_at TIMESTAMP;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_refunded_at TEXT;
