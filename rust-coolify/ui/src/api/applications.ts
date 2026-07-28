// completed ui_infra_077
import OpenApi from './OpenApi';

export interface Application {
  id?: number;
  uuid: string;
  name: string;
  description: string | null;
  status: string;
  fqdn: string | null;
  config_hash: string | null;
  git_repository: string;
  git_branch: string;
  git_commit_sha: string | null;
  build_pack: string;
  ports_mappings: string | null;
  ports_exposes: string | null;
  install_command: string | null;
  build_command: string | null;
  start_command: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateApplicationDto {
  name: string;
  description?: string;
  project_uuid: string;
  environment_name: string;
  server_uuid: string;
  destination_uuid: string;
  git_repository?: string;
  git_branch?: string;
  build_pack?: string;
  ports_exposes?: string;
  ports_mappings?: string;
  // source specific fields
  github_app_uuid?: string;
  dockerfile?: string;
  docker_image?: string;
}

export interface UpdateApplicationDto {
  name?: string;
  description?: string;
  fqdn?: string;
  git_repository?: string;
  git_branch?: string;
  ports_mappings?: string;
  ports_exposes?: string;
  install_command?: string;
  build_command?: string;
  start_command?: string;
  build_pack?: string;
  base_directory?: string;
  publish_directory?: string;
}

export interface ApplicationEnvVar {
  uuid: string;
  key: string;
  value: string;
  is_build_time: boolean;
}

export interface ApplicationStorage {
  uuid: string;
  name: string;
  mount_path: string;
  host_path: string | null;
}

// Application CRUD APIs
export async function listApplications(): Promise<Application[]> {
  const response = await OpenApi.get<Application[]>('/applications');
  return response.data;
}

export async function getApplication(uuid: string): Promise<Application> {
  const response = await OpenApi.get<Application>(`/applications/${uuid}`);
  return response.data;
}

export async function createPublicApplication(data: CreateApplicationDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/applications/public', data);
  return response.data;
}

export async function createPrivateGithubAppApplication(data: CreateApplicationDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/applications/private-github-app', data);
  return response.data;
}

export async function createPrivateDeployKeyApplication(data: CreateApplicationDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/applications/private-deploy-key', data);
  return response.data;
}

export async function createDockerfileApplication(data: CreateApplicationDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/applications/dockerfile', data);
  return response.data;
}

export async function createDockerimageApplication(data: CreateApplicationDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/applications/dockerimage', data);
  return response.data;
}

export async function updateApplication(uuid: string, data: UpdateApplicationDto): Promise<{ uuid: string }> {
  const response = await OpenApi.patch<{ uuid: string }>(`/applications/${uuid}`, data);
  return response.data;
}

export async function deleteApplication(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/applications/${uuid}`);
  return response.data;
}

export async function getApplicationLogs(uuid: string): Promise<{ logs: string }> {
  const response = await OpenApi.get<{ logs: string }>(`/applications/${uuid}/logs`);
  return response.data;
}

// Control Operations
export async function startApplication(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/applications/${uuid}/start`);
  return response.data;
}

export async function restartApplication(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/applications/${uuid}/restart`);
  return response.data;
}

export async function stopApplication(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/applications/${uuid}/stop`);
  return response.data;
}

// Env Variable APIs
export async function getApplicationEnvs(uuid: string): Promise<ApplicationEnvVar[]> {
  const response = await OpenApi.get<ApplicationEnvVar[]>(`/applications/${uuid}/envs`);
  return response.data;
}

export async function createApplicationEnv(uuid: string, data: { key: string; value: string; is_build_time: boolean }): Promise<ApplicationEnvVar> {
  const response = await OpenApi.post<ApplicationEnvVar>(`/applications/${uuid}/envs`, data);
  return response.data;
}

export async function createBulkApplicationEnvs(uuid: string, data: { key: string; value: string; is_build_time: boolean }[]): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>(`/applications/${uuid}/envs/bulk`, { envs: data });
  return response.data;
}

export async function updateApplicationEnv(uuid: string, data: { uuid: string; value: string }): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>(`/applications/${uuid}/envs`, data);
  return response.data;
}

export async function deleteApplicationEnv(uuid: string, envUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/applications/${uuid}/envs/${envUuid}`);
  return response.data;
}

// Storage APIs
export async function getApplicationStorages(uuid: string): Promise<ApplicationStorage[]> {
  const response = await OpenApi.get<ApplicationStorage[]>(`/applications/${uuid}/storages`);
  return response.data;
}

export async function createApplicationStorage(uuid: string, data: { name: string; mount_path: string; host_path?: string }): Promise<ApplicationStorage> {
  const response = await OpenApi.post<ApplicationStorage>(`/applications/${uuid}/storages`, data);
  return response.data;
}

export async function updateApplicationStorage(uuid: string, data: { uuid: string; name?: string; mount_path?: string; host_path?: string }): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>(`/applications/${uuid}/storages`, data);
  return response.data;
}

export async function deleteApplicationStorage(uuid: string, storageUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/applications/${uuid}/storages/${storageUuid}`);
  return response.data;
}

// Preview Deployments
export async function deleteApplicationPreview(uuid: string, pullRequestId: number): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/applications/${uuid}/previews/${pullRequestId}`);
  return response.data;
}
