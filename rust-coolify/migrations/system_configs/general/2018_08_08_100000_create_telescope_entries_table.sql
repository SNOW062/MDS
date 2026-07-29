-- completed mig_004
-- Migration: 2018_08_08_100000_create_telescope_entries_table
-- Connection: telescope.storage.database.connection

-- up() method implementation
CREATE TABLE IF NOT EXISTS telescope_entries (
    sequence BIGSERIAL PRIMARY KEY,
    uuid UUID NOT NULL UNIQUE,
    batch_id UUID NOT NULL,
    family_hash VARCHAR(255) NULL,
    should_display_on_index BOOLEAN NOT NULL DEFAULT TRUE,
    type VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NULL
);

CREATE INDEX IF NOT EXISTS idx_telescope_entries_batch_id ON telescope_entries(batch_id);
CREATE INDEX IF NOT EXISTS idx_telescope_entries_family_hash ON telescope_entries(family_hash);
CREATE INDEX IF NOT EXISTS idx_telescope_entries_created_at ON telescope_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_telescope_entries_type_display ON telescope_entries(type, should_display_on_index);

CREATE TABLE IF NOT EXISTS telescope_entries_tags (
    entry_uuid UUID NOT NULL,
    tag VARCHAR(255) NOT NULL,
    PRIMARY KEY (entry_uuid, tag),
    CONSTRAINT fk_telescope_entries_tags_entry_uuid FOREIGN KEY (entry_uuid) REFERENCES telescope_entries(uuid) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_telescope_entries_tags_tag ON telescope_entries_tags(tag);

CREATE TABLE IF NOT EXISTS telescope_monitoring (
    tag VARCHAR(255) PRIMARY KEY
);

-- down() method implementation reference:
-- DROP TABLE IF EXISTS telescope_entries_tags;
-- DROP TABLE IF EXISTS telescope_entries;
-- DROP TABLE IF EXISTS telescope_monitoring;
