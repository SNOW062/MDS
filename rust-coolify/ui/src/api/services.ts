// completed ui_infra_080
import OpenApi from './OpenApi';

export interface Service {
  id?: number;
  uuid: string;
  name: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  applications?: ServiceApplication[];
  databases?: ServiceDatabase[];
}

export interface ServiceApplication {
  uuid: string;
  name: string;
  status: string;
  fqdn: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceDatabase {
  uuid: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateServiceDto {
  name: string;
  description?: string;
  project_uuid: string;
  environment_name: string;
  server_uuid: string;
  destination_uuid: string;
  service_type: string; // e.g. 'wordpress', 'nextcloud'
}

export interface UpdateServiceDto {
  name?: string;
  description?: string;
}

export interface ServiceEnvVar {
  uuid: string;
  key: string;
  value: string;
  is_build_time: boolean;
}

export interface ServiceStorage {
  uuid: string;
  name: string;
  mount_path: string;
  host_path: string | null;
}

// Service Core CRUD APIs
export async function listServices(): Promise<Service[]> {
  const response = await OpenApi.get<Service[]>('/services');
  return response.data;
}

export async function getService(uuid: string): Promise<Service> {
  const response = await OpenApi.get<Service>(`/services/${uuid}`);
  return response.data;
}

export async function createService(data: CreateServiceDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/services', data);
  return response.data;
}

export async function updateService(uuid: string, data: UpdateServiceDto): Promise<{ uuid: string }> {
  const response = await OpenApi.patch<{ uuid: string }>(`/services/${uuid}`, data);
  return response.data;
}

export async function deleteService(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/services/${uuid}`);
  return response.data;
}

export async function getServiceLogs(uuid: string): Promise<{ logs: string }> {
  const response = await OpenApi.get<{ logs: string }>(`/services/${uuid}/logs`);
  return response.data;
}

// Service Control Operations
export async function startService(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/services/${uuid}/start`);
  return response.data;
}

export async function restartService(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/services/${uuid}/restart`);
  return response.data;
}

export async function stopService(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/services/${uuid}/stop`);
  return response.data;
}

// Service Environment Variable APIs
export async function getServiceEnvs(uuid: string): Promise<ServiceEnvVar[]> {
  const response = await OpenApi.get<ServiceEnvVar[]>(`/services/${uuid}/envs`);
  return response.data;
}

export async function createServiceEnv(uuid: string, data: { key: string; value: string; is_build_time: boolean }): Promise<ServiceEnvVar> {
  const response = await OpenApi.post<ServiceEnvVar>(`/services/${uuid}/envs`, data);
  return response.data;
}

export async function createBulkServiceEnvs(uuid: string, data: { key: string; value: string; is_build_time: boolean }[]): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>(`/services/${uuid}/envs/bulk`, { envs: data });
  return response.data;
}

export async function updateServiceEnv(uuid: string, data: { uuid: string; value: string }): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>(`/services/${uuid}/envs`, data);
  return response.data;
}

export async function deleteServiceEnv(uuid: string, envUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/services/${uuid}/envs/${envUuid}`);
  return response.data;
}

// Service Storage APIs
export async function getServiceStorages(uuid: string): Promise<ServiceStorage[]> {
  const response = await OpenApi.get<ServiceStorage[]>(`/services/${uuid}/storages`);
  return response.data;
}

export async function createServiceStorage(uuid: string, data: { name: string; mount_path: string; host_path?: string }): Promise<ServiceStorage> {
  const response = await OpenApi.post<ServiceStorage>(`/services/${uuid}/storages`, data);
  return response.data;
}

export async function updateServiceStorage(uuid: string, data: { uuid: string; name?: string; mount_path?: string; host_path?: string }): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>(`/services/${uuid}/storages`, data);
  return response.data;
}

export async function deleteServiceStorage(uuid: string, storageUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/services/${uuid}/storages/${storageUuid}`);
  return response.data;
}

// Nested Service Application APIs
export async function getServiceApplications(uuid: string): Promise<ServiceApplication[]> {
  const response = await OpenApi.get<ServiceApplication[]>(`/services/${uuid}/applications`);
  return response.data;
}

export async function getServiceApplication(uuid: string, appUuid: string): Promise<ServiceApplication> {
  const response = await OpenApi.get<ServiceApplication>(`/services/${uuid}/applications/${appUuid}`);
  return response.data;
}

export async function updateServiceApplication(uuid: string, appUuid: string, data: Partial<ServiceApplication>): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>(`/services/${uuid}/applications/${appUuid}`, data);
  return response.data;
}

export async function getServiceApplicationLogs(uuid: string, appUuid: string): Promise<{ logs: string }> {
  const response = await OpenApi.post<{ logs: string }>(`/services/${uuid}/applications/${appUuid}/logs`);
  return response.data;
}

export async function startServiceApplication(uuid: string, appUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/services/${uuid}/applications/${appUuid}/start`);
  return response.data;
}

export async function restartServiceApplication(uuid: string, appUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/services/${uuid}/applications/${appUuid}/restart`);
  return response.data;
}

export async function stopServiceApplication(uuid: string, appUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/services/${uuid}/applications/${appUuid}/stop`);
  return response.data;
}

// Nested Service Database APIs
export async function getServiceDatabases(uuid: string): Promise<ServiceDatabase[]> {
  const response = await OpenApi.get<ServiceDatabase[]>(`/services/${uuid}/databases`);
  return response.data;
}

export async function getServiceDatabase(uuid: string, dbUuid: string): Promise<ServiceDatabase> {
  const response = await OpenApi.get<ServiceDatabase>(`/services/${uuid}/databases/${dbUuid}`);
  return response.data;
}

export async function updateServiceDatabase(uuid: string, dbUuid: string, data: Partial<ServiceDatabase>): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>(`/services/${uuid}/databases/${dbUuid}`, data);
  return response.data;
}

export async function getServiceDatabaseLogs(uuid: string, dbUuid: string): Promise<{ logs: string }> {
  const response = await OpenApi.get<{ logs: string }>(`/services/${uuid}/databases/${dbUuid}/logs`);
  return response.data;
}

export async function startServiceDatabase(uuid: string, dbUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/services/${uuid}/databases/${dbUuid}/start`);
  return response.data;
}

export async function restartServiceDatabase(uuid: string, dbUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/services/${uuid}/databases/${dbUuid}/restart`);
  return response.data;
}

export async function stopServiceDatabase(uuid: string, dbUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/services/${uuid}/databases/${dbUuid}/stop`);
  return response.data;
}
