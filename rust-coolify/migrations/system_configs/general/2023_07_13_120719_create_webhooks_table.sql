-- completed mig_041
-- Converted from: 2023_07_13_120719_create_webhooks_table.php

CREATE TABLE IF NOT EXISTS webhooks (
    status TEXT,
    type TEXT,
    payload TEXT,
    failure_reason TEXT
);

DROP TABLE IF EXISTS webhooks;
