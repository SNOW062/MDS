// completed ui_infra_088

export interface ServerSetting {
  id: number;
  server_id: number;
  concurrent_builds: number;
  deployment_queue_limit: number;
  dynamic_timeout: number;
  connection_timeout: number;
  is_build_server: boolean;
  is_reachable: boolean;
  is_usable: boolean;
  is_swarm_manager: boolean;
  is_swarm_worker: boolean;
  is_cloudflare_tunnel: boolean;
  wildcard_domain: string | null;
  docker_cleanup_frequency: string;
  docker_cleanup_threshold: number;
  server_disk_usage_notification_threshold: number;
  server_disk_usage_check_frequency: string;
  created_at: string;
  updated_at: string;
}

export interface Server {
  id: number;
  uuid: string;
  name: string;
  ip: string;
  ip_previous: string | null;
  port: number;
  user: string;
  description: string | null;
  private_key_id: number | null;
  cloud_provider_token_id: number | null;
  team_id: number;
  hetzner_server_id: number | null;
  hetzner_server_status: string | null;
  vultr_instance_id: number | null;
  vultr_instance_status: string | null;
  digitalocean_droplet_id: number | null;
  digitalocean_droplet_status: string | null;
  is_validating: boolean;
  validation_logs: string | null;
  detected_traefik_version: string | null;
  traefik_outdated_info: any[] | null;
  server_metadata: Record<string, any> | null;
  delete_unused_volumes: boolean;
  delete_unused_networks: boolean;
  unreachable_notification_sent: boolean;
  is_build_server: boolean;
  force_disabled: boolean;
  created_at: string;
  updated_at: string;
  
  // Relations
  settings: ServerSetting;
  
  // Appended attributes & missing properties
  is_reachable?: boolean;
  is_usable?: boolean;
  ca_certificate?: string | null;
  ca_certificate_valid_until?: string | null;
  is_log_drain_newrelic_enabled?: boolean;
  log_drain_newrelic_license_key?: string | null;
  log_drain_newrelic_base_uri?: string | null;
  is_log_drain_axiom_enabled?: boolean;
  log_drain_axiom_api_key?: string | null;
  log_drain_axiom_dataset_name?: string | null;
  is_log_drain_custom_enabled?: boolean;
  log_drain_custom_config?: string | null;
  log_drain_custom_config_parser?: string | null;
  proxy_type?: string | null;
  generate_exact_labels?: boolean;
  redirect_enabled?: boolean;
  redirect_url?: string | null;
  proxy_settings?: any;
  is_terminal_enabled?: boolean;
  connectionTimeout?: number | string;
  wildcardDomain?: string | null;
  serverTimezone?: string;
  isBuildServer?: boolean;
  isSwarmManager?: boolean;
  isSwarmWorker?: boolean;
  hetznerServerStatus?: string | null;
  vultrInstanceStatus?: string | null;
  digitalOceanDropletStatus?: string | null;
}
