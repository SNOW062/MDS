// completed ui_infra_078
import OpenApi from './OpenApi';

export interface Database {
  id?: number;
  uuid: string;
  name: string;
  description: string | null;
  status: string;
  image: string;
  is_public: boolean;
  public_port: number | null;
  public_port_timeout: number | null;
  limits_memory: string;
  limits_memory_swap: string;
  limits_memory_swappiness: number;
  limits_memory_reservation: string;
  limits_cpus: string;
  limits_cpuset: string | null;
  limits_cpu_shares: number;
  created_at: string;
  updated_at: string;
  // postgres specific
  postgres_user?: string;
  postgres_db?: string;
  postgres_conf?: string;
  // clickhouse specific
  clickhouse_admin_user?: string;
  // redis specific
  redis_conf?: string;
  // keydb specific
  keydb_conf?: string;
  // mariadb specific
  mariadb_conf?: string;
  mariadb_user?: string;
  mariadb_database?: string;
  // mongodb specific
  mongo_conf?: string;
  mongo_initdb_database?: string;
  // mysql specific
  mysql_user?: string;
  mysql_database?: string;
  mysql_conf?: string;
}

export interface CreateDatabaseDto {
  name: string;
  description?: string;
  server_uuid: string;
  destination_uuid: string;
  environment_name: string;
  project_uuid: string;
  // database config fields depending on type
  postgres_user?: string;
  postgres_password?: string;
  postgres_db?: string;
  redis_password?: string;
  mongo_initdb_root_username?: string;
  mongo_initdb_root_password?: string;
  mongo_initdb_database?: string;
  mysql_root_password?: string;
  mysql_password?: string;
  mysql_user?: string;
  mysql_database?: string;
  mariadb_root_password?: string;
  mariadb_password?: string;
  mariadb_user?: string;
  mariadb_database?: string;
}

export interface UpdateDatabaseDto {
  name?: string;
  description?: string;
  image?: string;
  is_public?: boolean;
  public_port?: number;
  public_port_timeout?: number;
  limits_memory?: string;
  limits_memory_swap?: string;
  limits_memory_swappiness?: number;
  limits_memory_reservation?: string;
  limits_cpus?: string;
  limits_cpuset?: string;
  limits_cpu_shares?: number;
  // Postgres specific
  postgres_user?: string;
  postgres_password?: string;
  postgres_db?: string;
  postgres_conf?: string;
  postgres_initdb_args?: string;
  postgres_host_auth_method?: string;
  // Clickhouse specific
  clickhouse_admin_user?: string;
  clickhouse_admin_password?: string;
  // Dragonfly specific
  dragonfly_password?: string;
  // Redis specific
  redis_password?: string;
  redis_conf?: string;
  // KeyDB specific
  keydb_password?: string;
  keydb_conf?: string;
  // MariaDB specific
  mariadb_conf?: string;
  mariadb_root_password?: string;
  mariadb_user?: string;
  mariadb_password?: string;
  mariadb_database?: string;
  // MongoDB specific
  mongo_conf?: string;
  mongo_initdb_root_username?: string;
  mongo_initdb_root_password?: string;
  mongo_initdb_database?: string;
  // MySQL specific
  mysql_root_password?: string;
  mysql_password?: string;
  mysql_user?: string;
  mysql_database?: string;
  mysql_conf?: string;
}

export interface BackupConfig {
  id?: number;
  uuid: string;
  frequency: string;
  enabled: boolean;
  save_s3: boolean;
  s3_storage_uuid?: string;
  databases_to_backup?: string;
  dump_all: boolean;
  database_backup_retention_amount_locally?: number;
  database_backup_retention_days_locally?: number;
  database_backup_retention_amount_s3?: number;
  database_backup_retention_days_s3?: number;
}

export interface BackupExecution {
  uuid: string;
  status: string;
  size?: number;
  filename?: string;
  created_at: string;
}

export interface DatabaseEnvVar {
  uuid: string;
  key: string;
  value: string;
  is_build_time: boolean;
}

// Database Core APIs
export async function listDatabases(): Promise<Database[]> {
  const response = await OpenApi.get<Database[]>('/databases');
  return response.data;
}

export async function getDatabase(uuid: string): Promise<Database> {
  const response = await OpenApi.get<Database>(`/databases/${uuid}`);
  return response.data;
}

export async function createPostgresql(data: CreateDatabaseDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/databases/postgresql', data);
  return response.data;
}

export async function createMysql(data: CreateDatabaseDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/databases/mysql', data);
  return response.data;
}

export async function createMariadb(data: CreateDatabaseDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/databases/mariadb', data);
  return response.data;
}

export async function createMongodb(data: CreateDatabaseDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/databases/mongodb', data);
  return response.data;
}

export async function createRedis(data: CreateDatabaseDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/databases/redis', data);
  return response.data;
}

export async function createClickhouse(data: CreateDatabaseDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/databases/clickhouse', data);
  return response.data;
}

export async function createDragonfly(data: CreateDatabaseDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/databases/dragonfly', data);
  return response.data;
}

export async function createKeydb(data: CreateDatabaseDto): Promise<{ uuid: string }> {
  const response = await OpenApi.post<{ uuid: string }>('/databases/keydb', data);
  return response.data;
}

export async function updateDatabase(uuid: string, data: UpdateDatabaseDto): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>(`/databases/${uuid}`, data);
  return response.data;
}

export async function deleteDatabase(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/databases/${uuid}`);
  return response.data;
}

export async function getDatabaseLogs(uuid: string): Promise<{ logs: string }> {
  const response = await OpenApi.get<{ logs: string }>(`/databases/${uuid}/logs`);
  return response.data;
}

// Control Operations
export async function startDatabase(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/databases/${uuid}/start`);
  return response.data;
}

export async function restartDatabase(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/databases/${uuid}/restart`);
  return response.data;
}

export async function stopDatabase(uuid: string): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>(`/databases/${uuid}/stop`);
  return response.data;
}

// Backup APIs
export async function listDatabaseBackups(uuid: string): Promise<BackupConfig[]> {
  const response = await OpenApi.get<BackupConfig[]>(`/databases/${uuid}/backups`);
  return response.data;
}

export async function createDatabaseBackup(uuid: string, data: Partial<BackupConfig> & { frequency: string }): Promise<{ uuid: string; message: string }> {
  const response = await OpenApi.post<{ uuid: string; message: string }>(`/databases/${uuid}/backups`, data);
  return response.data;
}

export async function updateDatabaseBackup(uuid: string, backupUuid: string, data: Partial<BackupConfig>): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>(`/databases/${uuid}/backups/${backupUuid}`, data);
  return response.data;
}

export async function deleteDatabaseBackup(uuid: string, backupUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/databases/${uuid}/backups/${backupUuid}`);
  return response.data;
}

export async function listBackupExecutions(uuid: string, backupUuid: string): Promise<BackupExecution[]> {
  const response = await OpenApi.get<BackupExecution[]>(`/databases/${uuid}/backups/${backupUuid}/executions`);
  return response.data;
}

export async function deleteBackupExecution(uuid: string, backupUuid: string, executionUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/databases/${uuid}/backups/${backupUuid}/executions/${executionUuid}`);
  return response.data;
}

// Database Environment Variable APIs
export async function getDatabaseEnvs(uuid: string): Promise<DatabaseEnvVar[]> {
  const response = await OpenApi.get<DatabaseEnvVar[]>(`/databases/${uuid}/envs`);
  return response.data;
}

export async function createDatabaseEnv(uuid: string, data: { key: string; value: string; is_build_time: boolean }): Promise<DatabaseEnvVar> {
  const response = await OpenApi.post<DatabaseEnvVar>(`/databases/${uuid}/envs`, data);
  return response.data;
}

export async function createBulkDatabaseEnvs(uuid: string, data: { key: string; value: string; is_build_time: boolean }[]): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>(`/databases/${uuid}/envs/bulk`, { envs: data });
  return response.data;
}

export async function updateDatabaseEnv(uuid: string, data: { uuid: string; value: string }): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>(`/databases/${uuid}/envs`, data);
  return response.data;
}

export async function deleteDatabaseEnv(uuid: string, envUuid: string): Promise<{ message: string }> {
  const response = await OpenApi.delete<{ message: string }>(`/databases/${uuid}/envs/${envUuid}`);
  return response.data;
}
