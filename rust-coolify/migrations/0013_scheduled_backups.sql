-- Coolify: ScheduledDatabaseBackup + ScheduledVolumeBackup
CREATE TABLE IF NOT EXISTS scheduled_backups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    database_id UUID,
    s3_storage_id UUID REFERENCES s3_storages(id),
    frequency VARCHAR(100) DEFAULT '0 0 * * *',
    enabled BOOLEAN DEFAULT TRUE,
    retention_days INTEGER DEFAULT 7,
    created_at TIMESTAMP DEFAULT NOW()
);
