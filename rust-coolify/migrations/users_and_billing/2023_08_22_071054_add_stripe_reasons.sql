-- completed mig_062
-- Converted from: 2023_08_22_071054_add_stripe_reasons.php

-- ALTER TABLE subscriptions
-- Review 2023_08_22_071054_add_stripe_reasons.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_feedback VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_comment VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_feedback TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_comment TEXT;

-- ALTER TABLE subscriptions
-- Review 2023_08_22_071054_add_stripe_reasons.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_feedback VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_comment VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_feedback TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_comment TEXT;
