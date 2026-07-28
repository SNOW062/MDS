-- completed mig_207
-- Converted from: 2024_09_17_111226_add_ssh_key_fingerprint_to_private_keys_table.php

-- ALTER TABLE private_keys
-- Review 2024_09_17_111226_add_ssh_key_fingerprint_to_private_keys_table.php for specific alterations
ALTER TABLE private_keys ADD COLUMN IF NOT EXISTS fingerprint VARCHAR(255);
ALTER TABLE private_keys ADD COLUMN IF NOT EXISTS fingerprint TEXT;

-- ALTER TABLE private_keys
-- Review 2024_09_17_111226_add_ssh_key_fingerprint_to_private_keys_table.php for specific alterations
ALTER TABLE private_keys ADD COLUMN IF NOT EXISTS fingerprint VARCHAR(255);
ALTER TABLE private_keys ADD COLUMN IF NOT EXISTS fingerprint TEXT;
