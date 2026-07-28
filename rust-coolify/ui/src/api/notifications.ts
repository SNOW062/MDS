// completed ui_infra_082
import OpenApi from './OpenApi';

export interface DiscordSettings {
  enabled: boolean;
  webhook_url: string | null;
  deployment_success: boolean;
  deployment_failure: boolean;
  status_change: boolean;
  backup_success: boolean;
  backup_failure: boolean;
  scheduled_task_success: boolean;
  scheduled_task_failure: boolean;
  docker_cleanup_success: boolean;
  docker_cleanup_failure: boolean;
  server_disk_usage: boolean;
  server_reachable: boolean;
  server_unreachable: boolean;
}

export interface TelegramSettings {
  enabled: boolean;
  token: string | null;
  chat_id: string | null;
  deployment_success: boolean;
  deployment_failure: boolean;
  status_change: boolean;
  backup_success: boolean;
  backup_failure: boolean;
  scheduled_task_success: boolean;
  scheduled_task_failure: boolean;
  docker_cleanup_success: boolean;
  docker_cleanup_failure: boolean;
  server_disk_usage: boolean;
  server_reachable: boolean;
  server_unreachable: boolean;
}

export interface EmailSettings {
  enabled: boolean;
  to_address: string | null;
  smtp_host: string | null;
  smtp_port: number | null;
  smtp_username: string | null;
  smtp_encryption: 'ssl' | 'tls' | 'none' | null;
  deployment_success: boolean;
  deployment_failure: boolean;
  status_change: boolean;
  backup_success: boolean;
  backup_failure: boolean;
  scheduled_task_success: boolean;
  scheduled_task_failure: boolean;
  docker_cleanup_success: boolean;
  docker_cleanup_failure: boolean;
  server_disk_usage: boolean;
  server_reachable: boolean;
  server_unreachable: boolean;
}

export interface NotificationSettings {
  discord: DiscordSettings;
  telegram: TelegramSettings;
  email: EmailSettings;
}

// Notification Settings APIs
export async function getNotificationSettings(): Promise<NotificationSettings> {
  const response = await OpenApi.get<NotificationSettings>('/notifications');
  return response.data;
}

export async function updateDiscordSettings(data: Partial<DiscordSettings>): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>('/notifications/discord', data);
  return response.data;
}

export async function updateTelegramSettings(data: Partial<TelegramSettings>): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>('/notifications/telegram', data);
  return response.data;
}

export async function updateEmailSettings(data: Partial<EmailSettings>): Promise<{ message: string }> {
  const response = await OpenApi.patch<{ message: string }>('/notifications/email', data);
  return response.data;
}

// Testing Notifications
export async function testDiscordNotification(): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>('/notifications/discord/test');
  return response.data;
}

export async function testTelegramNotification(): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>('/notifications/telegram/test');
  return response.data;
}

export async function testEmailNotification(): Promise<{ message: string }> {
  const response = await OpenApi.post<{ message: string }>('/notifications/email/test');
  return response.data;
}
