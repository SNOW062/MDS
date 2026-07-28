// completed ui_infra_076
import OpenApi from './OpenApi';
import type { Server } from '../types/Server';

export interface CreateServerDto {
  name?: string;
  description?: string;
  ip: string;
  port?: number;
  user?: string;
  private_key_uuid: string;
  is_build_server?: boolean;
  instant_validate?: boolean;
  proxy_type?: 'traefik' | 'caddy' | 'none';
}

export interface UpdateServerDto {
  name?: string;
  description?: string;
  ip?: string;
  port?: number;
  user?: string;
  private_key_uuid?: string;
  is_build_server?: boolean;
  instant_validate?: boolean;
  proxy_type?: 'traefik' | 'caddy' | 'none';
  concurrent_builds?: number;
  dynamic_timeout?: number;
  deployment_queue_limit?: number;
  server_disk_usage_notification_threshold?: number;
  server_disk_usage_check_frequency?: string;
  connection_timeout?: number;
}

export interface ServerResource {
  id: number;
  uuid: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export interface ServerDomain {
  ip: string;
  domains: string[];
}

// Server API Methods
export async function listServers(): Promise<Server[]> {
  const response = await OpenApi.get<Server[]>('/servers');
  return response.data;
}

export async function getServer(uuid: string, withResources?: boolean): Promise<Server & { resources?: ServerResource[] }> {
  const response = await OpenApi.get<Server & { resources?: ServerResource[] }>(`/servers/${uuid}`, {
    params: withResources ? { resources: true } : {}
  });
  return response.data;
}

export async function createServer(data: CreateServerDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/servers', data);
  return response.data;
}

export async function updateServer(uuid: string, data: UpdateServerDto): Promise<{ uuid: string }> {
  const response = await OpenApi.patch<{ uuid: string }>(`/servers/${uuid}`, data);
  return response.data;
}

export async function deleteServer(uuid: string, force = false): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/servers/${uuid}`, {
    params: force ? { force: true } : {}
  });
  return response.data;
}

export async function getServerResources(uuid: string): Promise<ServerResource[]> {
  const response = await OpenApi.get<ServerResource[]>(`/servers/${uuid}/resources`);
  return response.data;
}

export async function getServerDomains(uuid: string, appUuid?: string): Promise<ServerDomain[]> {
  const response = await OpenApi.get<ServerDomain[]>(`/servers/${uuid}/domains`, {
    params: appUuid ? { uuid: appUuid } : {}
  });
  return response.data;
}

export async function validateServer(uuid: string, install = false): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/servers/${uuid}/validate`, { install });
  return response.data;
}
