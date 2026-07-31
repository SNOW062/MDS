-- completed mig_221
-- Migration: 2024_10_30_074601_rename_token_permissions

-- up() method implementation
-- Updates personal_access_tokens abilities JSONB array: '*' -> 'root', 'read-only' -> 'read', 'view:sensitive' -> 'read', 'read:sensitive'
UPDATE personal_access_tokens
SET abilities = (
    SELECT jsonb_agg(DISTINCT new_val)
    from (
        SELECT CASE 
            WHEN val #>> '{}' = '*' THEN 'root'
            WHEN val #>> '{}' = 'read-only' THEN 'read'
            WHEN val #>> '{}' = 'view:sensitive' THEN 'read:sensitive'
            ELSE val #>> '{}'
        END AS new_val
        FROM jsonb_array_elements(abilities) AS val
    ) s
)
WHERE abilities IS NOT NULL AND jsonb_array_length(abilities) > 0;

-- down() method implementation reference:
-- Restores abilities JSONB array: 'root' -> '*', 'read-only' -> 'read', etc.
-- UPDATE personal_access_tokens ...
