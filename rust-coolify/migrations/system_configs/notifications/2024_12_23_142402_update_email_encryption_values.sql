-- completed mig_242
-- Migration: 2024_12_23_142402_update_email_encryption_values

-- up() method implementation
UPDATE instance_settings
SET smtp_encryption = CASE
    WHEN smtp_encryption = 'tls' THEN 'starttls'
    WHEN smtp_encryption = 'ssl' THEN 'tls'
    WHEN smtp_encryption IS NULL OR smtp_encryption = '' THEN 'none'
    ELSE smtp_encryption
END
WHERE smtp_encryption IN ('tls', 'ssl', '', NULL);

UPDATE email_notification_settings
SET smtp_encryption = CASE
    WHEN smtp_encryption = 'tls' THEN 'starttls'
    WHEN smtp_encryption = 'ssl' THEN 'tls'
    WHEN smtp_encryption IS NULL OR smtp_encryption = '' THEN 'none'
    ELSE smtp_encryption
END
WHERE smtp_encryption IN ('tls', 'ssl', '', NULL);

-- down() method implementation reference:
-- UPDATE instance_settings SET smtp_encryption = CASE WHEN smtp_encryption = 'starttls' THEN 'tls' WHEN smtp_encryption = 'tls' THEN 'ssl' WHEN smtp_encryption = 'none' THEN '' END;
