-- completed mig_318
-- Migration: 2025_12_24_133707_add_predefined_server_variables_to_existing_servers

-- up() method implementation
-- Adds predefined server environment variables (COOLIFY_SERVER_UUID and COOLIFY_SERVER_NAME) for existing servers

INSERT INTO shared_environment_variables (key, value, type, server_id, team_id, is_literal, created_at, updated_at)
SELECT 
    'COOLIFY_SERVER_UUID' as key,
    s.uuid as value,
    'server' as type,
    s.id as server_id,
    s.team_id as team_id,
    TRUE as is_literal,
    NOW() as created_at,
    NOW() as updated_at
FROM servers s
WHERE s.team_id IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM shared_environment_variables sev 
      WHERE sev.server_id = s.id AND sev.key = 'COOLIFY_SERVER_UUID' AND sev.type = 'server'
  );

INSERT INTO shared_environment_variables (key, value, type, server_id, team_id, is_literal, created_at, updated_at)
SELECT 
    'COOLIFY_SERVER_NAME' as key,
    s.name as value,
    'server' as type,
    s.id as server_id,
    s.team_id as team_id,
    TRUE as is_literal,
    NOW() as created_at,
    NOW() as updated_at
FROM servers s
WHERE s.team_id IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM shared_environment_variables sev 
      WHERE sev.server_id = s.id AND sev.key = 'COOLIFY_SERVER_NAME' AND sev.type = 'server'
  );

-- down() method implementation reference:
-- DELETE FROM shared_environment_variables WHERE type = 'server' AND key IN ('COOLIFY_SERVER_UUID', 'COOLIFY_SERVER_NAME');
