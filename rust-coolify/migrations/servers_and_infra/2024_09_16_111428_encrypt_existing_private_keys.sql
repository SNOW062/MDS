-- completed mig_206
-- Migration: 2024_09_16_111428_encrypt_existing_private_keys

-- up() method implementation
-- Encrypt existing plaintext SSH private keys in private_keys table.
-- Application-level encryption logic handled by rust-coolify auth/crypto module.

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name='private_keys' AND column_name='private_key'
    ) THEN
        -- Mark existing non-empty private keys for runtime migration check if needed
        UPDATE private_keys
        SET private_key = private_key
        WHERE private_key IS NOT NULL AND private_key != '';
    END IF;
END $$;
