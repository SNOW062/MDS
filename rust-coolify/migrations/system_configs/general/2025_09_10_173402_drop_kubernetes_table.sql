-- completed mig_281
-- Converted from: 2025_09_10_173402_drop_kubernetes_table.php

CREATE TABLE IF NOT EXISTS kubernetes (
    uuid VARCHAR(255)
);

DROP TABLE IF EXISTS kubernetes;
