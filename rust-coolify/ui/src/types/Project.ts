import { Environment } from './Project';

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
  project_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
