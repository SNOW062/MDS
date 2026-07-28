// completed ui_infra_083
import OpenApi from './OpenApi';

export interface S3Storage {
  id?: number;
  uuid: string;
  name: string;
  description: string | null;
  bucket: string;
  region: string;
  key: string | null;
  secret: string | null;
  endpoint: string;
  use_path_style_endpoint: boolean;
  team_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateS3StorageDto {
  name: string;
  description?: string;
  bucket: string;
  region: string;
  key: string;
  secret: string;
  endpoint: string;
  use_path_style_endpoint?: boolean;
}

export interface UpdateS3StorageDto {
  name?: string;
  description?: string;
  bucket?: string;
  region?: string;
  key?: string;
  secret?: string;
  endpoint?: string;
  use_path_style_endpoint?: boolean;
}

export interface VolumeBackupConfig {
  id?: number;
  uuid: string;
  frequency: string;
  enabled: boolean;
  save_s3: boolean;
  s3_storage_id: number | null;
  retention_amount_locally: number;
  retention_days_locally: number;
  retention_max_storage_locally: number;
  retention_amount_s3: number;
  retention_days_s3: number;
  retention_max_storage_s3: number;
  delete_backup_s3: boolean;
}

// S3 Storage Management
export async function listS3Storages(): Promise<S3Storage[]> {
  const response = await OpenApi.get<S3Storage[]>('/s3-storages');
  return response.data;
}

export async function getS3Storage(uuid: string): Promise<S3Storage> {
  const response = await OpenApi.get<S3Storage>(`/s3-storages/${uuid}`);
  return response.data;
}

export async function createS3Storage(data: CreateS3StorageDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/s3-storages', data);
  return response.data;
}

export async function updateS3Storage(uuid: string, data: UpdateS3StorageDto): Promise<{ uuid: string }> {
  const response = await OpenApi.patch<{ uuid: string }>(`/s3-storages/${uuid}`, data);
  return response.data;
}

export async function deleteS3Storage(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/s3-storages/${uuid}`);
  return response.data;
}

export async function testS3StorageConnection(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/s3-storages/${uuid}/test`);
  return response.data;
}

// Volume Backup APIs (Application / Database / Service specific)
export async function upsertVolumeBackup(
  resourceType: 'application' | 'database' | 'service',
  resourceUuid: string,
  storageUuid: string,
  data: Partial<VolumeBackupConfig>
): Promise<{ message: string }> {
  const path = `/${resourceType}s/${resourceUuid}/storages/${storageUuid}/backups`;
  const response = await OpenApi.put<{ message: string }>(path, data);
  return response.data;
}

export async function deleteVolumeBackup(
  resourceType: 'application' | 'database' | 'service',
  resourceUuid: string,
  storageUuid: string
): Promise<{ message: string }> {
  const path = `/${resourceType}s/${resourceUuid}/storages/${storageUuid}/backups`;
  const response = await OpenApi.delete<{ message: string }>(path);
  return response.data;
}
