-- completed mig_312
-- Migration: 2025_12_08_135600_add_performance_indexes

-- up() method implementation & indexExists check
CREATE INDEX IF NOT EXISTS idx_servers_team_id ON servers (team_id);
CREATE INDEX IF NOT EXISTS idx_private_keys_team_id ON private_keys (team_id);
CREATE INDEX IF NOT EXISTS idx_projects_team_id ON projects (team_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_team_id ON subscriptions (team_id);
CREATE INDEX IF NOT EXISTS idx_cloud_init_scripts_team_id ON cloud_init_scripts (team_id);
CREATE INDEX IF NOT EXISTS idx_cloud_provider_tokens_team_id ON cloud_provider_tokens (team_id);
CREATE INDEX IF NOT EXISTS idx_deployment_queues_status_server ON application_deployment_queues (status, server_id);
CREATE INDEX IF NOT EXISTS idx_deployment_queues_app_status_pr_created ON application_deployment_queues (application_id, status, pull_request_id, created_at);
CREATE INDEX IF NOT EXISTS idx_environments_project_id ON environments (project_id);

-- down() method implementation reference:
-- DROP INDEX IF EXISTS idx_servers_team_id;
-- DROP INDEX IF EXISTS idx_private_keys_team_id;
-- DROP INDEX IF EXISTS idx_projects_team_id;
-- DROP INDEX IF EXISTS idx_subscriptions_team_id;
-- DROP INDEX IF EXISTS idx_cloud_init_scripts_team_id;
-- DROP INDEX IF EXISTS idx_cloud_provider_tokens_team_id;
-- DROP INDEX IF EXISTS idx_deployment_queues_status_server;
-- DROP INDEX IF EXISTS idx_deployment_queues_app_status_pr_created;
-- DROP INDEX IF EXISTS idx_environments_project_id;
