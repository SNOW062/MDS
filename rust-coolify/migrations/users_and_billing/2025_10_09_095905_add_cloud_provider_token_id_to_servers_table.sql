-- completed mig_290
-- Converted from: 2025_10_09_095905_add_cloud_provider_token_id_to_servers_table.php

-- ALTER TABLE servers
-- Review 2025_10_09_095905_add_cloud_provider_token_id_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS cloud_provider_token_id BIGINT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS cloud_provider_token_id TEXT;

-- ALTER TABLE servers
-- Review 2025_10_09_095905_add_cloud_provider_token_id_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS cloud_provider_token_id BIGINT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS cloud_provider_token_id TEXT;
