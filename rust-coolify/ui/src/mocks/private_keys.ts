// completed ui_infra_mock_keys
import type { PrivateKey } from '../api/security';

export const mockPrivateKeys: PrivateKey[] = [
  {
    uuid: 'mock-key-ed25519',
    name: 'localhost.key (ED25519)',
    description: 'Coolify host ucun standart ED25519 acari',
    is_git_related: false,
    created_at: new Date().toISOString(),
    public_key: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMockED25519KeyForLocalhost root@localhost'
  },
  {
    uuid: 'mock-key-rsa',
    name: 'production.key (RSA)',
    description: 'Production serverleri ucun RSA acari',
    is_git_related: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    public_key: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDMockRSAKeyForProduction ubuntu@prod-server'
  },
  {
    uuid: 'mock-key-staging',
    name: 'staging.key (ED25519)',
    description: 'Staging mühiti ucun SSH acari',
    is_git_related: false,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    public_key: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMockED25519KeyForStaging deploy@staging'
  }
];
