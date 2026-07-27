# CRATE SPEC: `deployer`

## Məqsəd
Git clone, build (Nixpacks/Dockerfile/Compose), deploy, log streaming.
Bu layihənin ən böyük və mürəkkəb hissəsidir.

## Coolify Referansları
```
e:\MD\coolify-source\app\Jobs\ApplicationDeploymentJob.php  ← ANA REFERANS (247KB!)
e:\MD\coolify-source\app\Actions\Application\StopApplication.php
e:\MD\coolify-source\app\Actions\Application\CleanupPreviewDeployment.php
e:\MD\coolify-source\app\Jobs\ApplicationPullRequestUpdateJob.php
e:\MD\coolify-source\app\Jobs\ProcessGithubPullRequestWebhook.php
e:\MD\coolify-source\app\Services\DeploymentConfiguration\
```

## ƏSAS: ApplicationDeploymentJob.php-i Necə Oxumaq

Bu fayl 247KB-dır. İçindəki əsas mərhələlər:
1. `prepare()` — git repo yoxla, branch tap
2. `clone_repository()` — git clone et
3. `build_image()` — Nixpacks/Dockerfile/Compose ilə build et
4. `push_image()` — Docker registry-ə push et (opsional)
5. `run_container()` — yeni konteyneri işə sal
6. `stop_old_container()` — köhnəni dayandır
7. `health_check()` — yeni konteynerin sağlamlığını yoxla
8. `cleanup()` — köhnə image-ləri sil

## Fayl Strukturu və Nə Yazılmalıdır

### `src/engine.rs`
```rust
// Ana koordinator — deployment pipeline-ı idarə edir
pub struct DeployEngine {
    pub db: rc_db::DbPool,
    pub ssh: Arc<rc_core::ssh::SshClient>,
    pub docker: Arc<rc_core::docker::DockerClient>,
}

impl DeployEngine {
    // Ana deploy funksiyası — bütün mərhələləri sıra ilə çağırır
    pub async fn deploy(&self, deployment_id: Uuid) -> anyhow::Result<()> {
        // 1. DB-dən deployment məlumatını al
        // 2. git/clone.rs → kodu çək
        // 3. build/detect.rs → buildpack tap
        // 4. build/<buildpack>.rs → build et
        // 5. run/container.rs → işə sal
        // 6. run/healthcheck.rs → yoxla
        // 7. DB-ni yenilə (status = success/failed)
        // Hər addımda log/streamer.rs → WebSocket-ə göndər
    }
}
```

### `src/git/clone.rs`
```rust
// git2 library ilə
pub async fn clone_repo(
    url: &str,
    branch: &str,
    dest_path: &str,
    ssh_key_path: Option<&str>,
) -> anyhow::Result<String>  // returns commit hash
```

### `src/build/detect.rs`
```rust
// Coolify-də: Services/DeploymentConfiguration/
// Repo içindəki faylları oxuyub buildpack tap
pub async fn detect_buildpack(repo_path: &str) -> BuildPack
// docker-compose.yml varsa → DockerCompose
// Dockerfile varsa → Dockerfile
// Yoxdursa → Nixpacks
pub async fn detect_language(repo_path: &str) -> Language
// package.json → NodeJS
// requirements.txt → Python
// Cargo.toml → Rust
// vb.
```

### `src/build/nixpacks.rs`
```rust
// nixpacks CLI istifadə edir (SSH ilə uzaq serverdə)
pub async fn build(
    ssh: &SshClient,
    app_dir: &str,
    image_name: &str,
    env_vars: &HashMap<String, String>,
    tx: Sender<String>,  // log stream
) -> anyhow::Result<()>
// SSH ilə: nixpacks build {app_dir} --name {image_name}
```

### `src/build/dockerfile.rs`
```rust
// Docker build (bollard)
pub async fn build(
    docker: &DockerClient,
    context_path: &str,
    image_name: &str,
    dockerfile_path: Option<&str>,
    build_args: &HashMap<String, String>,
    tx: Sender<String>,
) -> anyhow::Result<()>
```

### `src/run/container.rs`
```rust
pub async fn start_app_container(
    docker: &DockerClient,
    image: &str,
    container_name: &str,
    env_vars: &HashMap<String, String>,
    port_mapping: &str,
    labels: &HashMap<String, String>,  // Traefik routing labels
) -> anyhow::Result<()>

pub async fn stop_and_remove(docker: &DockerClient, name: &str) -> anyhow::Result<()>
```

### `src/run/healthcheck.rs`
```rust
// Deploy sonrası HTTP health check
pub async fn check(url: &str, retries: u32, interval_secs: u64) -> anyhow::Result<bool>
// Məsələn: GET http://localhost:3000/health → 200 OK?
```

### `src/log/streamer.rs`
```rust
// Deploy log-larını DB-ə yaz VƏ WebSocket channel-ına göndər
pub struct LogStreamer {
    deployment_id: Uuid,
    db: DbPool,
    ws_tx: Option<Sender<String>>,  // WebSocket connection varsa
}
impl LogStreamer {
    pub async fn log(&self, line: &str)  // DB-ə yaz + WS-ə göndər
    pub async fn finish(&self, status: DeployStatus)  // Final status
}
```

### `src/config/labels.rs`
```rust
// Traefik routing üçün Docker label-ları generate edir
// Coolify-də: ApplicationDeploymentJob.php - labels section
pub fn traefik_labels(app_name: &str, fqdn: &str, port: u16) -> HashMap<String, String>
// "traefik.enable" = "true"
// "traefik.http.routers.{name}.rule" = "Host(`{fqdn}`)"
// vb.
```

## Tamamlandı Sayılır Əgər
- [ ] `cargo build -p rc-deployer` uğurla keçir
- [ ] Git clone SSH key ilə işləyir
- [ ] Nixpacks build uzaq serverdə işləyir
- [ ] Dockerfile build Docker API ilə işləyir
- [ ] Container start/stop işləyir
- [ ] Log streaming WebSocket channel-ına gedir
- [ ] Deploy status DB-ə yazılır
- [ ] Integration test var (test container ilə)

## Növbəti Crate
`deployer` bitdikdən sonra → `proxy` crate-ini başla
Bax: `CRATE_SPECS/proxy.md`
