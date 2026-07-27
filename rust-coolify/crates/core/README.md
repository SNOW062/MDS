# 🗺️ XƏRİTƏ — `crates/core`

> **Agent üçün GPS.** Bu faylı oxu, sonra işə başla.

---

## 📍 Sən Harda Durursun?
`e:\MD\rust-coolify\crates\core\`

## 🎯 Sənin Vəzifən
SSH bağlantıları, Docker API, process runner yazmaq.
Bütün digər crate-lər SSH/Docker üçün bu crate-ə müraciət edir.
**Yalnız `crates/core/` içinə yaz.**

---

## 📖 İŞƏ BAŞLAMADAN ƏVVƏL OXU

```
e:\MD\rust-coolify\TASKS\core.md       ← Task siyahısı
e:\MD\rust-coolify\WORKING_ON.md       ← Conflict yoxla
e:\MD\rust-coolify\HANDOFF.md          ← Əvvəlki agent nə etdi?
```

---

## 🔍 HƏR FAYL ÜÇÜN XƏRİTƏ

### `src/ssh/client.rs`
```
1. ƏVVƏLCƏ OXU:
   e:\MD\coolify-source\app\Helpers\SshMultiplexingHelper.php  (12KB)
   → execute() metoduna bax, necə SSH əmri göndərir

2. KİTABXANA: russh = "0.49" (Cargo.toml-da artıq var)

3. STRUCT:
   pub struct SshClient { host, port, user, private_key_pem }

4. METODLAR:
   pub async fn execute(&self, cmd: &str) -> anyhow::Result<String>
   pub async fn execute_stream(&self, cmd: &str, tx: tokio::sync::mpsc::Sender<String>) -> anyhow::Result<()>
   // execute_stream: output xətt-xətt tx-ə göndərir (WebSocket üçün)

5. YAZ:
   e:\MD\rust-coolify\crates\core\src\ssh\client.rs
```

### `src/ssh/multiplexer.rs`
```
1. ƏVVƏLCƏ OXU:
   e:\MD\coolify-source\app\Helpers\SshMultiplexingHelper.php
   → Multiplexing hissəsinə bax (ControlMaster logic)

2. MƏQSƏD:
   Eyni serverə çoxlu paralel əmr göndərmək üçün connection pool.
   HashMap<server_id, Arc<SshSession>> saxlayır.

3. YAZ:
   e:\MD\rust-coolify\crates\core\src\ssh\multiplexer.rs
```

### `src/ssh/key.rs`
```
1. ƏVVƏLCƏ OXU:
   e:\MD\coolify-source\app\Models\PrivateKey.php
   → generatePrivateKey() metoduna bax

2. KİTABXANA: russh-keys = "0.49"

3. METODLAR:
   pub fn generate_ed25519() -> anyhow::Result<(String, String)>  // (private_pem, public_openssh)
   pub fn generate_rsa(bits: u32) -> anyhow::Result<(String, String)>
   pub fn extract_public_key(private_pem: &str) -> anyhow::Result<String>

4. YAZ:
   e:\MD\rust-coolify\crates\core\src\ssh\key.rs
```

### `src/docker/container.rs`
```
1. ƏVVƏLCƏ OXU:
   e:\MD\coolify-source\app\Actions\Docker\GetContainersStatus.php  (28KB)
   → Container status-unu necə alır

2. KİTABXANA: bollard = "0.18"

3. METODLAR:
   pub async fn list(docker: &Docker) -> anyhow::Result<Vec<ContainerSummary>>
   pub async fn start(docker: &Docker, name: &str) -> anyhow::Result<()>
   pub async fn stop(docker: &Docker, name: &str) -> anyhow::Result<()>
   pub async fn restart(docker: &Docker, name: &str) -> anyhow::Result<()>
   pub async fn remove(docker: &Docker, name: &str, force: bool) -> anyhow::Result<()>
   pub async fn inspect(docker: &Docker, name: &str) -> anyhow::Result<ContainerInspectResponse>

4. YAZ:
   e:\MD\rust-coolify\crates\core\src\docker\container.rs
```

### `src/docker/logs.rs`
```
1. MƏQSƏD:
   Docker container log-larını canlı stream et → WebSocket channel-ına göndər

2. KİTABXANA: bollard (futures::StreamExt ilə)

3. METOD:
   pub async fn stream(
       docker: &Docker,
       container_name: &str,
       tx: mpsc::Sender<String>,
       follow: bool,
   ) -> anyhow::Result<()>

4. YAZ:
   e:\MD\rust-coolify\crates\core\src\docker\logs.rs
```

### `src/system/specs.rs`
```
1. ƏVVƏLCƏ OXU:
   e:\MD\coolify-source\app\Jobs\PushServerUpdateJob.php  (33KB)
   → System specs toplama hissəsinə bax (uname, nproc, free, df)

2. SSH İLƏ GÖNDƏRİLƏCƏK SCRIPT:
   #!/bin/sh
   echo "KERNEL=$(uname -r)"
   echo "CPU_CORES=$(nproc)"
   echo "RAM_TOTAL=$(free -m | awk '/^Mem:/{print $2}')"
   echo "RAM_FREE=$(free -m | awk '/^Mem:/{print $4}')"
   echo "DISK_TOTAL=$(df -BG / | awk 'NR==2{print $2}' | tr -d G)"
   echo "DISK_FREE=$(df -BG / | awk 'NR==2{print $4}' | tr -d G)"
   echo "DOCKER_VER=$(docker --version 2>/dev/null || echo NONE)"

3. OUTPUT parse et → SystemSpecs struct-a çevir

4. YAZ:
   e:\MD\rust-coolify\crates\core\src\system\specs.rs
```

### `src/system/install.rs`
```
1. ƏVVƏLCƏ OXU:
   e:\MD\coolify-source\app\Actions\Server\InstallDocker.php    (7KB)
   e:\MD\coolify-source\app\Actions\Server\InstallPrerequisites.php

2. BASH SCRIPT-LƏRİ sabit string kimi saxla:
   pub fn docker_install_script() -> &'static str { "#!/bin/sh\n..." }
   pub fn nixpacks_install_script() -> &'static str { "..." }

3. Bu script-lər ssh::client::execute() ilə uzaq serverə göndərilir

4. YAZ:
   e:\MD\rust-coolify\crates\core\src\system\install.rs
```

---

## ✅ BİTDİ SAYILIR ƏGƏR

```bash
cargo build -p rc-core
```

Həmçinin:
- [ ] `SshClient::execute()` real SSH bağlantısı qurur
- [ ] `SshClient::execute_stream()` output-u channel-a göndərir
- [ ] Docker container list/start/stop işləyir
- [ ] `generate_ed25519()` işləyir
- [ ] `collect_specs()` SSH ilə uzaq serverdən məlumat gətirir

---

## 🔄 YARIDA QALDINSA

```
1. e:\MD\rust-coolify\TASKS\core.md    → yarıda qalan [WIP] et
2. e:\MD\rust-coolify\HANDOFF.md       → nə etdin, nə qaldı
3. e:\MD\rust-coolify\WORKING_ON.md    → adını sil
```
