-- completed mig_059
-- Converted from: 2023_08_22_071051_add_stripe_plan_to_subscriptions.php

-- ALTER TABLE subscriptions
-- Review 2023_08_22_071051_add_stripe_plan_to_subscriptions.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_plan_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_plan_id TEXT;

-- ALTER TABLE subscriptions
-- Review 2023_08_22_071051_add_stripe_plan_to_subscriptions.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_plan_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_plan_id TEXT;
