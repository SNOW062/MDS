-- completed mig_334
-- Converted from: 2026_05_13_000000_add_expiration_warning_sent_at_to_personal_access_tokens_table.php

-- ALTER TABLE personal_access_tokens
-- Review 2026_05_13_000000_add_expiration_warning_sent_at_to_personal_access_tokens_table.php for specific alterations
ALTER TABLE personal_access_tokens ADD COLUMN IF NOT EXISTS api_token_expiration_warning_sent_at TIMESTAMP;
ALTER TABLE personal_access_tokens ADD COLUMN IF NOT EXISTS personal_access_tokens_expiration_warning_index TEXT;
ALTER TABLE personal_access_tokens ADD COLUMN IF NOT EXISTS api_token_expiration_warning_sent_at TEXT;

-- ALTER TABLE personal_access_tokens
-- Review 2026_05_13_000000_add_expiration_warning_sent_at_to_personal_access_tokens_table.php for specific alterations
ALTER TABLE personal_access_tokens ADD COLUMN IF NOT EXISTS api_token_expiration_warning_sent_at TIMESTAMP;
ALTER TABLE personal_access_tokens ADD COLUMN IF NOT EXISTS personal_access_tokens_expiration_warning_index TEXT;
ALTER TABLE personal_access_tokens ADD COLUMN IF NOT EXISTS api_token_expiration_warning_sent_at TEXT;
