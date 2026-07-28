// completed ui_infra_100
import type { Project } from '../types/Project';

export const mockProjects: Project[] = [
  {
    id: 1,
    uuid: 'project-default-uuid',
    name: 'Default Project',
    description: 'The default MasterDeploy project for hosting main services.',
    team_id: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    environments: [
      {
        id: 1,
        uuid: 'env-prod-uuid',
        project_id: 1,
        name: 'production',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        applications: [
          {
            id: 1,
            uuid: 'app-node-uuid',
            name: 'NodeJS Web App',
            status: 'running',
            fqdn: 'https://node.localhost.me'
          }
        ],
        postgresqls: [
          {
            id: 1,
            uuid: 'db-postgres-uuid',
            name: 'Production PostgreSQL',
            status: 'running',
            image: 'postgres:15-alpine'
          }
        ],
        redis: [],
        mongodbs: [],
        mysqls: [],
        mariadbs: [],
        services: []
      }
    ]
  }
];
