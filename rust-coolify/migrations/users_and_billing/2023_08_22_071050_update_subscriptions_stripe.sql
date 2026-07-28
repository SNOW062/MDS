-- completed mig_058
-- Converted from: 2023_08_22_071050_update_subscriptions_stripe.php

-- ALTER TABLE subscriptions
-- Review 2023_08_22_071050_update_subscriptions_stripe.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_invoice_paid BOOLEAN DEFAULT FALSE;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_cancel_at_period_end BOOLEAN DEFAULT FALSE;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_subscription_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_order_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_product_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_variant_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_variant_name VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_customer_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_status VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_renews_at VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_update_payment_menthod_url VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_invoice_paid TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_cancel_at_period_end TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_subscription_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_order_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_product_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_variant_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_variant_name VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_customer_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_status VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_renews_at VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_update_payment_menthod_url VARCHAR(255);

-- ALTER TABLE subscriptions
-- Review 2023_08_22_071050_update_subscriptions_stripe.php for specific alterations
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_invoice_paid BOOLEAN DEFAULT FALSE;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_cancel_at_period_end BOOLEAN DEFAULT FALSE;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_subscription_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_order_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_product_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_variant_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_variant_name VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_customer_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_status VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_renews_at VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_update_payment_menthod_url VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_invoice_paid TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_cancel_at_period_end TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_subscription_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_order_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_product_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_variant_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_variant_name VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_customer_id VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_status VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_renews_at VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS lemon_update_payment_menthod_url VARCHAR(255);
