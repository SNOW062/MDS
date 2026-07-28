-- completed mig_180
-- Converted from: 2024_06_18_105948_move_server_metrics.php

-- ALTER TABLE servers
-- Review 2024_06_18_105948_move_server_metrics.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_metrics_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_metrics_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_history_days INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_token VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_metrics_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_metrics_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_history_days TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_token TEXT;

-- ALTER TABLE server_settings
-- Review 2024_06_18_105948_move_server_metrics.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_metrics_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_metrics_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_history_days INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_token VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_metrics_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_metrics_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_history_days TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_token TEXT;

-- ALTER TABLE servers
-- Review 2024_06_18_105948_move_server_metrics.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_metrics_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_metrics_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_history_days INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_token VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_metrics_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_metrics_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_history_days TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS metrics_token TEXT;

-- ALTER TABLE server_settings
-- Review 2024_06_18_105948_move_server_metrics.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_metrics_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_metrics_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_history_days INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_token VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_metrics_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_metrics_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_refresh_rate_seconds TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_history_days TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS metrics_token TEXT;
