-- completed mig_137
-- Converted from: 2024_02_01_111228_create_tags_table.php

CREATE TABLE IF NOT EXISTS tags (
    uuid VARCHAR(255),
    name VARCHAR(255),
    team_id BIGINT,
    tag_id BIGINT,
    taggable_id BIGINT,
    taggable_type VARCHAR(255),
    tag_id TEXT
);

CREATE TABLE IF NOT EXISTS taggables (
    uuid VARCHAR(255),
    name VARCHAR(255),
    team_id BIGINT,
    tag_id BIGINT,
    taggable_id BIGINT,
    taggable_type VARCHAR(255),
    tag_id TEXT
);

DROP TABLE IF EXISTS taggables;

DROP TABLE IF EXISTS tags;
