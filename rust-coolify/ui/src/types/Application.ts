// completed ui_infra_089

export interface ApplicationEnvVar {
  id?: number;
  uuid: string;
  key: string;
  value: string;
  is_build_time: boolean;
  application_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ApplicationStorage {
  id?: number;
  uuid: string;
  name: string;
  mount_path: string;
  host_path: string | null;
  application_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Application {
  id: number;
  uuid: string;
  name: string;
  description: string | null;
  fqdn: string | null;
  git_repository: string;
  git_branch: string;
  git_commit_sha: string | null;
  git_full_url: string | null;
  docker_registry_image_name: string | null;
  docker_registry_image_tag: string | null;
  build_pack: string;
  static_image: string | null;
  install_command: string | null;
  build_command: string | null;
  start_command: string | null;
  ports_exposes: string | null;
  ports_mappings: string | null;
  base_directory: string;
  publish_directory: string | null;
  health_check_enabled: boolean;
  health_check_path: string | null;
  health_check_port: string | null;
  health_check_host: string | null;
  health_check_method: string | null;
  health_check_return_code: number | null;
  health_check_scheme: string | null;
  health_check_response_text: string | null;
  health_check_interval: number;
  health_check_timeout: number;
  health_check_retries: number;
  health_check_start_period: number;
  health_check_type: string | null;
  health_check_command: string | null;
  limits_memory: string | null;
  limits_memory_swap: string | null;
  limits_memory_swappiness: number | null;
  limits_memory_reservation: string | null;
  limits_cpus: string | null;
  limits_cpuset: string | null;
  limits_cpu_shares: number | null;
  status: string;
  preview_url_template: string | null;
  dockerfile: string | null;
  dockerfile_location: string | null;
  dockerfile_target_build: string | null;
  custom_labels: string | null;
  custom_docker_run_options: string | null;
  post_deployment_command: string | null;
  post_deployment_command_container: string | null;
  pre_deployment_command: string | null;
  pre_deployment_command_container: string | null;
  manual_webhook_secret_github: string | null;
  manual_webhook_secret_gitlab: string | null;
  manual_webhook_secret_bitbucket: string | null;
  manual_webhook_secret_gitea: string | null;
  docker_compose_location: string | null;
  docker_compose: string | null;
  docker_compose_raw: string | null;
  docker_compose_domains: string | null;
  docker_compose_custom_start_command: string | null;
  docker_compose_custom_build_command: string | null;
  swarm_replicas: number | null;
  swarm_placement_constraints: string | null;
  watch_paths: string | null;
  redirect: string | null;
  compose_parsing_version: string | null;
  custom_nginx_configuration: string | null;
  custom_network_aliases: string | null;
  custom_healthcheck_found: boolean;
  nixpkgsarchive: string | null;
  is_http_basic_auth_enabled: boolean;
  http_basic_auth_username: string | null;
  http_basic_auth_password?: string | null;
  connect_to_docker_network: boolean;
  force_domain_override: boolean;
  is_container_label_escape_enabled: boolean;
  use_build_server: boolean;
  config_hash: string | null;
  last_online_at: string | null;
  restart_count: number;
  max_restart_count: number;
  last_restart_at: string | null;
  last_restart_type: string | null;
  environment_id: number;
  destination_id: number;
  destination_type: string;
  source_id: number;
  source_type: string;
  repository_project_id: number | null;
  private_key_id: number | null;
  created_at: string;
  updated_at: string;
  
  // Relations
  environment_variables?: ApplicationEnvVar[];
  storages?: ApplicationStorage[];
  tags?: any[];
  
  // Appended attribute
  server_status?: string;
}
