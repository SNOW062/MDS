// completed ui_infra_081
import OpenApi from './OpenApi';

export interface PrivateKey {
  id?: string;
  uuid: string;
  name: string;
  description: string | null;
  private_key?: string;
  public_key?: string | null;
  is_git_related: boolean;
  created_at: string;
}

export interface CreatePrivateKeyDto {
  name?: string;
  description?: string;
  private_key: string;
}

export interface UpdatePrivateKeyDto {
  name?: string;
  description?: string;
  private_key?: string;
}

export interface ApiToken {
  id: string;
  name: string;
  abilities: string[];
  expires_at: string | null;
  last_used_at: string | null;
  created_at: string;
}

// Private Keys API
export async function listPrivateKeys(): Promise<PrivateKey[]> {
  const response = await OpenApi.get<PrivateKey[]>('/security/keys');
  return response.data;
}

export async function getPrivateKey(uuid: string): Promise<PrivateKey> {
  const response = await OpenApi.get<PrivateKey>(`/security/keys/${uuid}`);
  return response.data;
}

export async function createPrivateKey(data: CreatePrivateKeyDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/security/keys', data);
  return response.data;
}

export async function updatePrivateKey(uuid: string, data: UpdatePrivateKeyDto): Promise<{ uuid: string }> {
  const response = await OpenApi.patch<{ uuid: string }>(`/security/keys/${uuid}`, data);
  return response.data;
}

export async function deletePrivateKey(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/security/keys/${uuid}`);
  return response.data;
}

// API Tokens API
export async function listApiTokens(): Promise<ApiToken[]> {
  const response = await OpenApi.get<ApiToken[]>('/security/tokens');
  return response.data;
}

export async function createApiToken(name: string): Promise<{ token: string; id: string }> {
  const response = await OpenApi.post<{ token: string; id: string }>('/security/tokens', { name });
  return response.data;
}

export async function deleteApiToken(id: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/security/tokens/${id}`);
  return response.data;
}
