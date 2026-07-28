-- completed mig_169
-- Converted from: 2024_05_07_124019_add_server_metrics.php

-- ALTER TABLE servers
-- Review 2024_05_07_124019_add_server_metrics.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_metrics_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_metrics_enabled TEXT;

-- ALTER TABLE servers
-- Review 2024_05_07_124019_add_server_metrics.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_metrics_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_metrics_enabled TEXT;
