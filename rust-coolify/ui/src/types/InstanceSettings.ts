// completed ui_infra_093
export interface InstanceSettings {
  id: number;
  public_ipv4: string | null;
  public_ipv6: string | null;
  fqdn: string | null;
  public_port_min: number;
  public_port_max: number;
  do_not_track: boolean;
  is_auto_update_enabled: boolean;
  is_registration_enabled: boolean;
  next_channel: string;
  smtp_enabled: boolean;
  smtp_from_address: string | null;
  smtp_from_name: string | null;
  smtp_recipients: string | null;
  smtp_host: string | null;
  smtp_port: number | null;
  smtp_encryption: string | null;
  smtp_username: string | null;
  smtp_password?: string | null; // Şifrə gizli saxlanıla bilər
  smtp_timeout: number;
  resend_enabled: boolean;
  resend_api_key?: string | null;
  is_dns_validation_enabled: boolean;
  custom_dns_servers: string | null;
  instance_name: string;
  is_api_enabled: boolean;
  allowed_ips: string | null;
  auto_update_frequency: string;
  update_check_frequency: string;
  new_version_available: boolean;
  instance_timezone: string;
  helper_version: string;
  disable_two_step_confirmation: boolean;
  is_sponsorship_popup_enabled: boolean;
  dev_helper_version: string | null;
  is_wire_navigate_enabled: boolean;
  is_mcp_server_enabled: boolean;
  webhook_allowed_internal_hosts: string[] | null;
  webhook_allow_localhost: boolean;
  sentinel_token?: string | null;
  created_at: string;
  updated_at: string;
}
