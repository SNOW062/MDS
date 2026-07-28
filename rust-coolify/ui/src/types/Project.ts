// completed ui_infra_091

export interface Project {
  id: number;
  uuid: string;
  name: string;
  description: string | null;
  team_id: number;
  environments?: Environment[];
  created_at: string;
  updated_at: string;
}

export interface Environment {
  id: number;
  uuid: string;
  project_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  
  // Relations/Nested resources returned by details API
  applications?: any[];
  postgresqls?: any[];
  redis?: any[];
  mongodbs?: any[];
  mysqls?: any[];
  mariadbs?: any[];
  services?: any[];
}
