# CRATE SPEC: `core`

## Məqsəd
SSH bağlantıları, Docker API əməliyyatları, lokal process icra.
Serverlə bütün əlaqə bu crate üzərindən keçir.

## Coolify Referansları
```
e:\MD\coolify-source\app\Helpers\SshMultiplexingHelper.php   ← SSH
e:\MD\coolify-source\app\Helpers\SshRetryHandler.php         ← SSH retry
e:\MD\coolify-source\app\Helpers\SslHelper.php               ← SSL
e:\MD\coolify-source\app\Actions\Server\InstallDocker.php    ← Docker install
e:\MD\coolify-source\app\Actions\Server\ValidateServer.php   ← Server validation
e:\MD\coolify-source\app\Actions\Server\RunCommand.php       ← Remote command
e:\MD\coolify-source\app\Actions\Docker\GetContainersStatus.php ← Container status
```

## Fayl Strukturu və Nə Yazılmalıdır

### `src/ssh/client.rs`
```rust
// Coolify-də: SshMultiplexingHelper.php
// russh library istifadə edilir
pub struct SshClient {
    pub host: String,
    pub port: u16,
    pub user: String,
    pub private_key: Option<String>,  // PEM format
}

impl SshClient {
    pub async fn connect(&self) -> anyhow::Result<SshSession>
    pub async fn execute(&self, cmd: &str) -> anyhow::Result<String>
    pub async fn execute_stream(&self, cmd: &str, tx: Sender<String>) -> anyhow::Result<()>
    // execute_stream: output-u canlı tokio channel-a göndərir
    // Bu WebSocket log streaming üçün lazımdır
}
```

### `src/ssh/multiplexer.rs`
```rust
// Coolify-də: SshMultiplexingHelper.php (12KB)
// Eyni serverə çoxlu paralel SSH sessionu idarə edir
// Connection pool kimi işləyir
pub struct SshMultiplexer {
    sessions: HashMap<String, Arc<SshSession>>,
}
impl SshMultiplexer {
    pub async fn get_or_create(&mut self, server_id: &str, client: &SshClient) -> Arc<SshSession>
    pub async fn cleanup_stale(&mut self)  // Vaxtı keçmiş session-ları bağla
}
```

### `src/ssh/key.rs`
```rust
// SSH key generate + parse
pub async fn generate_ed25519() -> anyhow::Result<(String, String)>  // (private, public)
pub async fn generate_rsa(bits: u32) -> anyhow::Result<(String, String)>
pub fn parse_public_key(private_pem: &str) -> anyhow::Result<String>
```

### `src/docker/client.rs`
```rust
// Bollard Docker client wrapper
pub struct DockerClient {
    inner: bollard::Docker,
}
impl DockerClient {
    pub fn new() -> anyhow::Result<Self>  // Unix socket və ya TCP
    pub fn from_env() -> anyhow::Result<Self>  // DOCKER_HOST env var
}
```

### `src/docker/container.rs`
```rust
// Coolify-də: Actions/Docker/GetContainersStatus.php
pub async fn start(docker: &DockerClient, name: &str) -> anyhow::Result<()>
pub async fn stop(docker: &DockerClient, name: &str) -> anyhow::Result<()>
pub async fn restart(docker: &DockerClient, name: &str) -> anyhow::Result<()>
pub async fn remove(docker: &DockerClient, name: &str, force: bool) -> anyhow::Result<()>
pub async fn inspect(docker: &DockerClient, name: &str) -> anyhow::Result<ContainerInfo>
pub async fn list(docker: &DockerClient) -> anyhow::Result<Vec<ContainerInfo>>
```

### `src/docker/logs.rs`
```rust
// Docker container log streaming
pub async fn stream_logs(
    docker: &DockerClient,
    container_name: &str,
    tx: Sender<String>  // tokio channel → WebSocket
) -> anyhow::Result<()>
```

### `src/system/install.rs`
```rust
// Coolify-də: Actions/Server/InstallDocker.php
pub fn docker_install_script() -> &'static str  // bash script
pub fn docker_compose_install_script() -> &'static str
pub fn nixpacks_install_script() -> &'static str
// Bu script-lər SSH vasitəsilə uzaq serverə göndərilir
```

### `src/system/specs.rs`
```rust
// Coolify-də: Jobs/PushServerUpdateJob.php - system specs section
pub struct SystemSpecs {
    pub os_kernel: String,
    pub cpu_cores: u32,
    pub total_ram_mb: u64,
    pub free_ram_mb: u64,
    pub disk_total_gb: u64,
    pub disk_free_gb: u64,
    pub docker_installed: bool,
    pub docker_version: Option<String>,
}

// Uzaq serverə bash script göndər, output-u parse et
pub async fn collect(ssh: &SshClient) -> anyhow::Result<SystemSpecs>

// Bu script SSH ilə göndərilir:
// echo "KERNEL=$(uname -r)"
// echo "CPU_CORES=$(nproc)"
// echo "RAM_TOTAL=$(free -m | awk '/^Mem:/{print $2}')"
// echo "DISK_GB=$(df -BG / | awk 'NR==2{print $2}' | tr -d G)"
// echo "DOCKER_VER=$(docker --version 2>/dev/null || echo NONE)"
```

## Tamamlandı Sayılır Əgər
- [ ] `cargo build -p rc-core` uğurla keçir
- [ ] `SshClient::execute()` real SSH əmri icra edir
- [ ] `SshClient::execute_stream()` output-u channel-a göndərir
- [ ] Docker container start/stop/list işləyir
- [ ] Docker log streaming işləyir
- [ ] `generate_ed25519()` və `generate_rsa()` işləyir
- [ ] `collect_specs()` uzaq serverdən real məlumat gətirir
- [ ] Unit testlər var (mock SSH ilə)

## Növbəti Crate
`core` bitdikdən sonra → `api` crate-ini başla
Bax: `CRATE_SPECS/api.md`
