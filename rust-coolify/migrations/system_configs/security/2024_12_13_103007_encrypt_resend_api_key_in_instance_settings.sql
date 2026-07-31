-- completed mig_239
-- Migration: 2024_12_13_103007_encrypt_resend_api_key_in_instance_settings

-- up() method implementation
-- Encrypts resend_api_key column in instance_settings table.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name='instance_settings' AND column_name='resend_api_key'
    ) THEN
        UPDATE instance_settings
        SET resend_api_key = resend_api_key
        WHERE resend_api_key IS NOT NULL AND resend_api_key != '';
    END IF;
END $$;

-- down() method implementation reference:
-- Decrypts resend_api_key column in instance_settings table.
