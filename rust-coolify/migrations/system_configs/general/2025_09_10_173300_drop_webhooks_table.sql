-- completed mig_280
-- Converted from: 2025_09_10_173300_drop_webhooks_table.php

CREATE TABLE IF NOT EXISTS webhooks (
    status TEXT,
    type VARCHAR(255),
    payload TEXT,
    failure_reason TEXT
);

DROP TABLE IF EXISTS webhooks;
