-- completed mig_170
-- Converted from: 2024_05_10_085215_make_stripe_comment_longer.php

-- ALTER TABLE subscriptions
-- Review 2024_05_10_085215_make_stripe_comment_longer.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_comment TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_comment VARCHAR(255);

-- ALTER TABLE subscriptions
-- Review 2024_05_10_085215_make_stripe_comment_longer.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_comment TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_comment VARCHAR(255);
