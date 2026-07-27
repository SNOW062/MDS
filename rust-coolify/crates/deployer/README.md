# 🗺️ XƏRİTƏ — `crates/deployer`

> **Agent üçün GPS.** Bu faylı oxu, sonra işə başla.
> Bu layihənin **ƏN BÖYÜK** crate-idir. Tələsmə, addım-addım get.

---

## 📍 Sən Harda Durursun?
`e:\MD\rust-coolify\crates\deployer\`

## 🎯 Sənin Vəzifən
Git clone → Build → Deploy → Log streaming pipeline-ı yazmaq.
**Yalnız `crates/deployer/` içinə yaz.**
SSH/Docker əməliyyatları üçün `rc-core` crate-ini istifadə et, özün yazma.

---

## ⚠️ ƏVVƏLCƏ BUNLAR BİTMƏLİDİR
```
✅ rc-db crate hazır olmalıdır
✅ rc-core crate hazır olmalıdır
```
Bunlar bitməyibsə — deployer-ə başlama!

---

## 📖 İŞƏ BAŞLAMADAN ƏVVƏL OXU

```
e:\MD\rust-coolify\TASKS\deployer.md
e:\MD\rust-coolify\WORKING_ON.md
e:\MD\rust-coolify\HANDOFF.md
```

---

## 🔍 ANA REFERANS FAYL

```
e:\MD\coolify-source\app\Jobs\ApplicationDeploymentJob.php
```
Bu fayl **247KB**-dır. Tamamını oxuma. Yalnız bu metodlara bax:
1. `handle()` — ana deploy axını (mərhələlər sıralanır)
2. `cloneRepository()` — git clone məntiqi
3. `buildImage()` — build məntiqi
4. `runContainer()` — konteyner işə salma
5. `healthCheck()` — sağlamlıq yoxlama

---

## 🔍 HƏR FAYL ÜÇÜN XƏRİTƏ

### `src/engine.rs`
```
ƏVVƏLCƏ OXU: ApplicationDeploymentJob.php → handle() metodu
MƏQSƏD: Bütün deploy mərhələlərini koordinasiya edir

pub struct DeployEngine { db: DbPool, ... }
impl DeployEngine {
    pub async fn run(&self, deployment_id: Uuid) -> anyhow::Result<()>
    // Sıra:
    // 1. DB-dən deployment + application məlumatını al
    // 2. git/clone.rs → kodu çək
    // 3. build/detect.rs → buildpack tap
    // 4. build/<buildpack>.rs → build et
    // 5. run/container.rs → işə sal
    // 6. run/healthcheck.rs → yoxla
    // 7. DB-ni yenilə (success/failed)
    // Hər addımda log/streamer.rs → DB-ə yaz + WS-ə göndər
}

YAZ: e:\MD\rust-coolify\crates\deployer\src\engine.rs
```

### `src/git/clone.rs`
```
ƏVVƏLCƏ OXU:
  ApplicationDeploymentJob.php → cloneRepository() metodu
  ApplicationDeploymentJob.php → cloneRepositoryWithSshKey() metodu

KİTABXANA: git2 = "0.19"

pub async fn clone(
    url: &str,         // git@github.com:user/repo.git
    branch: &str,      // "main"
    dest: &str,        // "/var/coolify/apps/{app_id}"
    ssh_key_path: Option<&str>,  // private key fayl yolu (temp file)
) -> anyhow::Result<String>  // commit hash qaytarır

YAZ: e:\MD\rust-coolify\crates\deployer\src\git\clone.rs
```

### `src/git/webhook.rs`
```
ƏVVƏLCƏ OXU:
  e:\MD\coolify-source\app\Jobs\ProcessGithubPullRequestWebhook.php  (6KB)

MƏQSƏD: GitHub/GitLab webhook payload-ını parse et
pub struct WebhookPayload {
    pub event: String,      // "push", "pull_request"
    pub branch: String,
    pub commit_sha: String,
    pub repo_url: String,
    pub pr_number: Option<u32>,
}
pub fn parse_github(headers: &HeaderMap, body: &str) -> anyhow::Result<WebhookPayload>
pub fn verify_signature(secret: &str, payload: &str, signature: &str) -> bool

YAZ: e:\MD\rust-coolify\crates\deployer\src\git\webhook.rs
```

### `src/build/detect.rs`
```
ƏVVƏLCƏ OXU:
  e:\MD\coolify-source\app\Services\DeploymentConfiguration\  (qovluq)

MƏQSƏD: Repo içindəki faylları oxu → buildpack tap
pub async fn detect_buildpack(repo_path: &str) -> BuildPack
// docker-compose.yml varsa → DockerCompose
// Dockerfile varsa → Dockerfile
// Heç biri yoxdursa → Nixpacks

pub async fn detect_language(repo_path: &str) -> Language
// package.json → NodeJS
// requirements.txt / pyproject.toml → Python
// Cargo.toml → Rust
// go.mod → Go
// composer.json → PHP

YAZ: e:\MD\rust-coolify\crates\deployer\src\build\detect.rs
```

### `src/build/nixpacks.rs`
```
MƏQSƏD: Nixpacks CLI ilə build et
// nixpacks binary uzaq serverdə quraşdırılmış olmalıdır

pub async fn build(
    ssh: &SshClient,
    app_dir: &str,        // "/var/coolify/apps/{app_id}"
    image_name: &str,     // "app-{app_id}:latest"
    env_vars: &HashMap<String, String>,
    log_tx: mpsc::Sender<String>,
) -> anyhow::Result<()>
// SSH əmri: nixpacks build {app_dir} --name {image_name} --env KEY=VAL

YAZ: e:\MD\rust-coolify\crates\deployer\src\build\nixpacks.rs
```

### `src/build/dockerfile.rs`
```
MƏQSƏD: Docker buildx ilə Dockerfile build et
KİTABXANA: bollard (rc-core::docker::DockerClient istifadə et)

pub async fn build(
    docker: &DockerClient,
    context_path: &str,
    image_name: &str,
    dockerfile: Option<&str>,  // default: "Dockerfile"
    build_args: &HashMap<String, String>,
    log_tx: mpsc::Sender<String>,
) -> anyhow::Result<()>

YAZ: e:\MD\rust-coolify\crates\deployer\src\build\dockerfile.rs
```

### `src/run/container.rs`
```
ƏVVƏLCƏ OXU: ApplicationDeploymentJob.php → runContainer() metodu

pub async fn start_app(
    docker: &DockerClient,
    image: &str,
    container_name: &str,     // "app-{app_id}"
    env_vars: &HashMap<String, String>,
    port_mapping: &str,       // "3000:3000"
    labels: &HashMap<String, String>,  // Traefik labels
    network: &str,            // "coolify"
) -> anyhow::Result<()>

YAZ: e:\MD\rust-coolify\crates\deployer\src\run\container.rs
```

### `src/run/healthcheck.rs`
```
MƏQSƏD: Deploy sonrası app-ın ayağa qalxdığını yoxla

pub async fn wait_for_healthy(
    url: &str,          // "http://localhost:3000/health"
    max_retries: u32,   // default: 10
    interval_secs: u64, // default: 5
) -> anyhow::Result<bool>

YAZ: e:\MD\rust-coolify\crates\deployer\src\run\healthcheck.rs
```

### `src/log/streamer.rs`
```
MƏQSƏD: Deploy log-larını həm DB-ə yaz, həm WebSocket-ə göndər

pub struct LogStreamer {
    deployment_id: Uuid,
    db: DbPool,
    ws_tx: Option<mpsc::Sender<String>>,
}
impl LogStreamer {
    pub async fn log(&self, line: &str)
    pub async fn finish(&self, success: bool)
}

YAZ: e:\MD\rust-coolify\crates\deployer\src\log\streamer.rs
```

### `src/config/labels.rs`
```
MƏQSƏD: Traefik routing üçün Docker label-ları generate et
ƏVVƏLCƏ OXU: ApplicationDeploymentJob.php → generateLabels() metodu

pub fn for_app(app_name: &str, fqdn: &str, port: u16) -> HashMap<String, String>
// "traefik.enable" = "true"
// "traefik.http.routers.{name}.rule" = "Host(`{fqdn}`)"
// "traefik.http.services.{name}.loadbalancer.server.port" = "{port}"

YAZ: e:\MD\rust-coolify\crates\deployer\src\config\labels.rs
```

---

## ✅ BİTDİ SAYILIR ƏGƏR

```bash
cargo build -p rc-deployer
```
Həmçinin:
- [ ] Git clone SSH key ilə işləyir
- [ ] Nixpacks build SSH ilə uzaq serverə göndərilir
- [ ] Container başlayır + Traefik label-ları var
- [ ] Log streaming WebSocket channel-ına gedir
- [ ] Deploy status DB-ə yazılır (success/failed)

---

## 🔄 YARIDA QALDINSA
```
1. TASKS/deployer.md  → [WIP] et
2. HANDOFF.md         → nə etdin, nə qaldı
3. WORKING_ON.md      → adını sil
```
