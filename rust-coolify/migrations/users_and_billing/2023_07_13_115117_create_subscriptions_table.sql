-- completed mig_040
-- Converted from: 2023_07_13_115117_create_subscriptions_table.php

CREATE TABLE IF NOT EXISTS subscriptions (
    lemon_subscription_id VARCHAR(255),
    lemon_order_id VARCHAR(255),
    lemon_product_id VARCHAR(255),
    lemon_variant_id VARCHAR(255),
    lemon_variant_name VARCHAR(255),
    lemon_customer_id VARCHAR(255),
    lemon_status VARCHAR(255),
    lemon_trial_ends_at VARCHAR(255),
    lemon_renews_at VARCHAR(255),
    lemon_ends_at VARCHAR(255),
    lemon_update_payment_menthod_url VARCHAR(255),
    team_id BIGINT
);

DROP TABLE IF EXISTS subscriptions;
