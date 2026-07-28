-- completed mig_074
-- Converted from: 2023_09_23_111808_update_servers_with_cloudflared.php

-- ALTER TABLE server_settings
-- Review 2023_09_23_111808_update_servers_with_cloudflared.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_cloudflare_tunnel BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_cloudflare_tunnel TEXT;

-- ALTER TABLE server_settings
-- Review 2023_09_23_111808_update_servers_with_cloudflared.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_cloudflare_tunnel BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_cloudflare_tunnel TEXT;
