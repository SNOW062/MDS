-- completed mig_314
-- Migration: 2025_12_15_143052_trim_s3_storage_credentials

-- up() method implementation
UPDATE s3_storages
SET endpoint = TRIM(endpoint),
    bucket = TRIM(bucket),
    region = TRIM(region)
WHERE endpoint IS NOT NULL OR bucket IS NOT NULL OR region IS NOT NULL;

-- down() method implementation reference:
-- Trimming whitespace operation cannot be reversed
