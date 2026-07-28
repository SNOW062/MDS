-- completed mig_213
-- Converted from: 2024_10_14_090416_update_metrics_token_in_server_settings.php

-- ALTER TABLE server_settings
-- Review 2024_10_14_090416_update_metrics_token_in_server_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_token TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_history_days TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_server_api_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_sentinel_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_token TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_metrics_refresh_rate_seconds INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_metrics_history_days INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_push_interval_seconds INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_custom_url VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_updated_at TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_token VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_history_days INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_server_api_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_sentinel_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_token TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_metrics_refresh_rate_seconds TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_metrics_history_days TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_push_interval_seconds TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_custom_url TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_updated_at TEXT;

-- ALTER TABLE servers
-- Review 2024_10_14_090416_update_metrics_token_in_server_settings.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_token TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_history_days TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_server_api_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_sentinel_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_token TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_metrics_refresh_rate_seconds INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_metrics_history_days INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_push_interval_seconds INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_custom_url VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_updated_at TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_token VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_history_days INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_server_api_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_sentinel_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_token TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_metrics_refresh_rate_seconds TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_metrics_history_days TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_push_interval_seconds TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_custom_url TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_updated_at TEXT;

-- ALTER TABLE server_settings
-- Review 2024_10_14_090416_update_metrics_token_in_server_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_token TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_history_days TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_server_api_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_sentinel_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_token TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_metrics_refresh_rate_seconds INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_metrics_history_days INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_push_interval_seconds INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_custom_url VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_updated_at TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_token VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_history_days INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_server_api_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_sentinel_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_token TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_metrics_refresh_rate_seconds TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_metrics_history_days TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_push_interval_seconds TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_custom_url TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS sentinel_updated_at TEXT;

-- ALTER TABLE servers
-- Review 2024_10_14_090416_update_metrics_token_in_server_settings.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_token TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_history_days TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_server_api_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_sentinel_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_token TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_metrics_refresh_rate_seconds INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_metrics_history_days INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_push_interval_seconds INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_custom_url VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_updated_at TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_token VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_history_days INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_server_api_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_sentinel_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_token TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_metrics_refresh_rate_seconds TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_metrics_history_days TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_push_interval_seconds TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_custom_url TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS sentinel_updated_at TEXT;
