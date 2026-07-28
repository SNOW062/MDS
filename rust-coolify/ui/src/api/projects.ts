// completed ui_infra_079
import OpenApi from './OpenApi';
import type { Project } from '../types/Project';

export interface CreateProjectDto {
  name: string;
  description?: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
}

export interface Environment {
  id: number;
  uuid: string;
  name: string;
  project_id: number;
  created_at: string;
  updated_at: string;
  applications?: any[];
  postgresqls?: any[];
  redis?: any[];
  mongodbs?: any[];
  mysqls?: any[];
  mariadbs?: any[];
  services?: any[];
}

export interface CreateEnvironmentDto {
  name: string;
}

// Project API Methods
export async function listProjects(): Promise<Project[]> {
  const response = await OpenApi.get<Project[]>('/projects');
  return response.data;
}

export async function getProject(uuid: string): Promise<Project> {
  const response = await OpenApi.get<Project>(`/projects/${uuid}`);
  return response.data;
}

export async function createProject(data: CreateProjectDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/projects', data);
  return response.data;
}

export async function updateProject(uuid: string, data: UpdateProjectDto): Promise<{ uuid: string; name: string; description: string | null }> {
  const response = await OpenApi.patch<{ uuid: string; name: string; description: string | null }>(`/projects/${uuid}`, data);
  return response.data;
}

export async function deleteProject(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/projects/${uuid}`);
  return response.data;
}

// Environment API Methods
export async function getEnvironmentDetails(projectUuid: string, environmentNameOrUuid: string): Promise<Environment> {
  const response = await OpenApi.get<Environment>(`/projects/${projectUuid}/${environmentNameOrUuid}`);
  return response.data;
}

export async function listEnvironments(projectUuid: string): Promise<Environment[]> {
  const response = await OpenApi.get<Environment[]>(`/projects/${projectUuid}/environments`);
  return response.data;
}

export async function createEnvironment(projectUuid: string, data: CreateEnvironmentDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>(`/projects/${projectUuid}/environments`, data);
  return response.data;
}

export async function deleteEnvironment(projectUuid: string, environmentNameOrUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/projects/${projectUuid}/environments/${environmentNameOrUuid}`);
  return response.data;
}
