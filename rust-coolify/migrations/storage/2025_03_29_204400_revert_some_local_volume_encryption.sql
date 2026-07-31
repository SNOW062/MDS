-- completed mig_260
-- Migration: 2025_03_29_204400_revert_some_local_volume_encryption

-- up() method implementation
-- Decrypts fs_path and mount_path in local_file_volumes, removes duplicates by (mount_path, resource_id, resource_type)

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_name = 'local_file_volumes'
    ) THEN
        -- Delete duplicate local file volumes, keeping the one with minimum ID
        DELETE FROM local_file_volumes a
        USING local_file_volumes b
        WHERE a.id > b.id
          AND a.mount_path = b.mount_path
          AND a.resource_id = b.resource_id
          AND a.resource_type = b.resource_type;
    END IF;
END $$;

-- down() method implementation reference:
-- Re-encrypts fs_path and mount_path if required at application level
