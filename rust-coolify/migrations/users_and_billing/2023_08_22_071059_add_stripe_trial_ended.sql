-- completed mig_067
-- Converted from: 2023_08_22_071059_add_stripe_trial_ended.php

-- ALTER TABLE subscriptions
-- Review 2023_08_22_071059_add_stripe_trial_ended.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_trial_already_ended BOOLEAN DEFAULT FALSE;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_trial_already_ended TEXT;

-- ALTER TABLE subscriptions
-- Review 2023_08_22_071059_add_stripe_trial_ended.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_trial_already_ended BOOLEAN DEFAULT FALSE;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_trial_already_ended TEXT;
