-- Handcrafted migration to add is_api_enabled and allowed_ips to instance_settings
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_api_enabled BOOLEAN DEFAULT TRUE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS allowed_ips TEXT;
