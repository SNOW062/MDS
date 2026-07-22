export type ApplicationStatus = 'running' | 'stopped' | 'building' | 'degraded' | 'error';

export interface Application {
  id: string;
  name: string;
  gitRepository: string;
  gitBranch: string;
  buildPack: 'nixpacks' | 'dockerfile' | 'docker-compose' | 'static';
  fqdn: string;
  ports: string;
  status: ApplicationStatus;
  serverId: string;
  environmentId: string;
  createdAt: string;
}

export interface Database {
  id: string;
  name: string;
  engine: 'postgres' | 'redis' | 'mysql' | 'mongodb';
  status: 'running' | 'stopped' | 'error';
  ports: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  environments: {
    id: string;
    name: string;
    applications: Application[];
    databases?: Database[];
  }[];
}

export interface Server {
  id: string;
  name: string;
  ip: string;
  port: number;
  user: string;
  isReachable: boolean;
  isBuildServer: boolean;
  cpuUsage: number;
  ramUsage: number;
  diskUsage: number;
}

export interface EnvVariable {
  id: string;
  key: string;
  value: string;
  isBuildTime: boolean;
  isSecret: boolean;
}

export interface DeploymentLog {
  id: string;
  applicationId: string;
  status: 'queued' | 'in_progress' | 'success' | 'failed';
  commitHash: string;
  timestamp: string;
  logs: string[];
}
