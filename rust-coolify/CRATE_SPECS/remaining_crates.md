# CRATE SPEC: `proxy`

## Məqsəd
Traefik, Caddy, Nginx proxy idarəsi. SSL/TLS sertifikat avtomatikası.

## Coolify Referansları
```
e:\MD\coolify-source\app\Actions\Proxy\CheckProxy.php        (16KB)
e:\MD\coolify-source\app\Actions\Proxy\StartProxy.php        (4KB)
e:\MD\coolify-source\app\Actions\Proxy\StopProxy.php
e:\MD\coolify-source\app\Actions\Proxy\GetProxyConfiguration.php
e:\MD\coolify-source\app\Actions\Proxy\SaveProxyConfiguration.php
e:\MD\coolify-source\app\Helpers\SslHelper.php               (8KB)
e:\MD\coolify-source\app\Jobs\RestartProxyJob.php            (6KB)
e:\MD\coolify-source\app\Jobs\CheckTraefikVersionForServerJob.php
```

## Nə Yazılmalıdır

### `src/traefik/config.rs`
```rust
// Traefik static config yaratmaq (TOML/YAML)
pub fn generate_static_config(server: &Server) -> String
// Çıxış: traefik.yaml məzmunu
// entrypoints, providers.docker, api, certificatesResolvers

pub fn generate_dynamic_config(apps: &[Application]) -> String
// Çıxış: dynamic/apps.yaml
// Hər app üçün router + service + middleware
```

### `src/traefik/deploy.rs`
```rust
// Traefik konteynerini deploy et
// Coolify-də: StartProxy.php
pub async fn deploy_traefik(
    docker: &DockerClient,
    server: &Server,
) -> anyhow::Result<()>
// docker run traefik:v3 ilə işə salır
// Docker socket mount edir
// 80, 443, 8080 port-larını açır
```

### `src/ssl/acme.rs`
```rust
// Let's Encrypt ACME v2
// Coolify-də: SslHelper.php
pub async fn request_cert(domain: &str, email: &str) -> anyhow::Result<(String, String)>
// Returns: (cert_pem, key_pem)
// instant-acme library istifadə et
```

### `src/ssl/renewal.rs`
```rust
// SSL cert vaxtını yoxla → 30 gündən az varsa yenilə
pub async fn check_and_renew(pool: &DbPool, docker: &DockerClient) -> anyhow::Result<()>
```

## Tamamlandı Sayılır Əgər
- [ ] Traefik static + dynamic config generate işləyir
- [ ] Traefik konteyner deploy olunur
- [ ] SSL cert Let's Encrypt-dən alınır
- [ ] SSL renewal avtomatik işləyir

---

# CRATE SPEC: `scheduler`

## Məqsəd
Background job-lar, cron tapşırıqlar, avtomatik təmizlik.

## Coolify Referansları
```
e:\MD\coolify-source\app\Jobs\ScheduledJobManager.php        (23KB)
e:\MD\coolify-source\app\Jobs\ServerConnectionCheckJob.php   (6KB)
e:\MD\coolify-source\app\Jobs\DockerCleanupJob.php           (6KB)
e:\MD\coolify-source\app\Jobs\DatabaseBackupJob.php          (43KB)
e:\MD\coolify-source\app\Jobs\VolumeBackupJob.php            (18KB)
e:\MD\coolify-source\app\Jobs\ScheduledTaskJob.php           (10KB)
e:\MD\coolify-source\app\Jobs\CheckAndStartSentinelJob.php
```

## Nə Yazılmalıdır

### `src/manager.rs`
```rust
// Bütün job-ları başladır
// tokio-cron-scheduler istifadə edir
pub struct JobManager {
    scheduler: JobScheduler,
}
impl JobManager {
    pub async fn start(&self) -> anyhow::Result<()>
    // Hər job-u scheduler-ə əlavə edir:
    // - server_check: hər 1 dəqiqə
    // - docker_cleanup: hər gün gecə yarısı
    // - ssl_renewal: hər gün saat 03:00
    // - update_check: hər 12 saat
    // - sentinel_check: hər 5 dəqiqə
}
```

### `src/jobs/server_check.rs`
```rust
// Coolify-də: ServerConnectionCheckJob.php
// Hər server üçün SSH bağlantısını yoxla
// is_reachable → DB-ə yaz
// Əlçatmaz olsa → rc-notify vasitəsilə bildiriş göndər
pub async fn run(pool: &DbPool, core: &CoreServices, notify: &Notifier) -> anyhow::Result<()>
```

### `src/jobs/docker_cleanup.rs`
```rust
// Coolify-də: DockerCleanupJob.php
// docker image prune -f
// docker builder prune -f
// docker container prune -f
pub async fn run(pool: &DbPool, core: &CoreServices) -> anyhow::Result<()>
```

## Tamamlandı Sayılır Əgər
- [ ] JobManager startup-da bütün job-ları əlavə edir
- [ ] server_check hər 1 dəqiqə işləyir
- [ ] docker_cleanup işləyir
- [ ] custom cron tapşırıqlar istifadəçi-tərəfindən qurula bilir

---

# CRATE SPEC: `notify`

## Məqsəd
E-mail, Slack, Discord, Telegram, Pushover, Webhook bildirişləri.

## Coolify Referansları
```
e:\MD\coolify-source\app\Notifications\               ← bütün notification class-lar
e:\MD\coolify-source\app\Jobs\SendMessageToSlackJob.php
e:\MD\coolify-source\app\Jobs\SendMessageToDiscordJob.php
e:\MD\coolify-source\app\Jobs\SendMessageToTelegramJob.php
```

## Nə Yazılmalıdır

### `src/dispatcher.rs`
```rust
// Hadisəyə görə doğru kanala göndər
pub async fn dispatch(pool: &DbPool, team_id: Uuid, event: NotifyEvent) -> anyhow::Result<()>
// DB-dən team-in aktiv kanallarını al → hər birini çağır
```

### `src/channels/email.rs`
```rust
// lettre ilə SMTP
pub async fn send(config: &EmailConfig, to: &str, subject: &str, body: &str) -> anyhow::Result<()>
```

### `src/channels/slack.rs`
```rust
// Slack Incoming Webhook
pub async fn send(webhook_url: &str, message: &str) -> anyhow::Result<()>
```

### `src/channels/discord.rs`
```rust
// Discord Webhook
pub async fn send(webhook_url: &str, message: &str) -> anyhow::Result<()>
```

### `src/channels/telegram.rs`
```rust
// Telegram Bot API
pub async fn send(bot_token: &str, chat_id: &str, message: &str) -> anyhow::Result<()>
```

## Tamamlandı Sayılır Əgər
- [ ] Email SMTP ilə göndərilir
- [ ] Slack webhook işləyir
- [ ] Discord webhook işləyir
- [ ] Telegram bot işləyir
- [ ] Deploy success/fail bildirişi göndərilir

---

# CRATE SPEC: `sentinel`

## Məqsəd
Server CPU/RAM/Disk real-time monitoring, tarixçə saxlama, alert-lər.

## Coolify Referansları
```
e:\MD\coolify-source\app\Jobs\PushServerUpdateJob.php       (33KB) ← ANA REFERANS
e:\MD\coolify-source\app\Jobs\CheckAndStartSentinelJob.php
e:\MD\coolify-source\app\Http\Controllers\Api\SentinelController.php
```

## Nə Yazılmalıdır

### `src/collector.rs`
```rust
// Uzaq serverə bash script göndər, output-u parse et
// Coolify-də: PushServerUpdateJob.php
pub async fn collect_server_metrics(ssh: &SshClient) -> anyhow::Result<ServerMetrics>

pub struct ServerMetrics {
    pub cpu_percent: f32,
    pub ram_used_mb: u64,
    pub ram_total_mb: u64,
    pub disk_used_gb: u64,
    pub disk_total_gb: u64,
    pub containers: Vec<ContainerMetric>,
    pub collected_at: DateTime<Utc>,
}
```

### `src/history.rs`
```rust
// Metrics-i DB-ə yaz (time-series)
// Köhnə records-ları sil (retention policy)
pub async fn save(pool: &DbPool, server_id: Uuid, metrics: &ServerMetrics) -> anyhow::Result<()>
pub async fn get_history(pool: &DbPool, server_id: Uuid, hours: u32) -> anyhow::Result<Vec<ServerMetrics>>
pub async fn cleanup_old(pool: &DbPool, days: u32) -> anyhow::Result<()>
```

## Tamamlandı Sayılır Əgər
- [ ] Uzaq serverdən real CPU/RAM/Disk alınır
- [ ] Metrics DB-ə yazılır
- [ ] API endpoint metrics tarixçəsini verir
- [ ] Alert threshold keçildikdə notify göndərilir

---

# CRATE SPEC: `storage`

## Məqsəd
S3-compatible storage, database backup, volume backup/restore.

## Coolify Referansları
```
e:\MD\coolify-source\app\Jobs\DatabaseBackupJob.php       (43KB) ← ANA REFERANS
e:\MD\coolify-source\app\Jobs\VolumeBackupJob.php         (18KB)
e:\MD\coolify-source\app\Jobs\VolumeBackupRecoveryJob.php (4KB)
e:\MD\coolify-source\app\Models\S3Storage.php             (8KB)
```

## Nə Yazılmalıdır

### `src/s3/client.rs`
```rust
// aws-sdk-s3 ilə S3-compatible client
// MinIO, Cloudflare R2, AWS S3 - hamısı eyni interface
pub struct S3Client { inner: aws_sdk_s3::Client }
impl S3Client {
    pub async fn from_config(config: &S3Config) -> anyhow::Result<Self>
    pub async fn upload_file(path: &str, key: &str) -> anyhow::Result<String>
    pub async fn download_file(key: &str, dest: &str) -> anyhow::Result<()>
    pub async fn list_objects(prefix: &str) -> anyhow::Result<Vec<String>>
    pub async fn delete_object(key: &str) -> anyhow::Result<()>
}
```

### `src/backup/database/postgres.rs`
```rust
// SSH ilə uzaq serverdə pg_dump çalışdır → S3-ə yüklə
pub async fn backup(
    ssh: &SshClient,
    s3: &S3Client,
    db_config: &DatabaseConfig,
    backup_key: &str,  // S3 key: "backups/postgres/2026-07-27_00-00-00.sql.gz"
) -> anyhow::Result<()>
// SSH: pg_dump -U {user} {db_name} | gzip | s3cmd put - s3://{bucket}/{key}
```

## Tamamlandı Sayılır Əgər
- [ ] S3 upload/download işləyir
- [ ] PostgreSQL backup + S3 upload işləyir
- [ ] MySQL backup işləyir
- [ ] Volume backup tar.gz → S3 işləyir
- [ ] Restore işləyir

---

# CRATE SPEC: `services`

## Məqsəd
280+ one-click service şablonları (Wordpress, Ghost, Nextcloud, vb.)

## Coolify Referansları
```
e:\MD\coolify-source\app\Models\Service.php                 (75KB!)
e:\MD\coolify-source\templates\service-templates.json       (1MB!)
e:\MD\coolify-source\app\Actions\Service\StartService.php
e:\MD\coolify-source\app\Actions\Service\StopService.php
```

## Nə Yazılmalıdır

### `src/template/loader.rs`
```rust
// service-templates.json faylını oxu
// Şablon axtarışı: wordpress, ghost, vb.
pub fn load_templates() -> anyhow::Result<Vec<ServiceTemplate>>
pub fn find_template(key: &str) -> anyhow::Result<ServiceTemplate>
```

### `src/template/renderer.rs`
```rust
// Tera template engine ilə şablonu render et
// İstifadəçi dəyişənlərini doldur
pub fn render(template: &ServiceTemplate, vars: &HashMap<String, String>) -> anyhow::Result<String>
// Çıxış: docker-compose.yaml məzmunu
```

### `src/lifecycle/start.rs`
```rust
// Render edilmiş compose faylını → serverdə işə sal
// docker compose up -d
pub async fn start_service(
    ssh: &SshClient,
    service_id: Uuid,
    compose_content: &str,
) -> anyhow::Result<()>
```

## Tamamlandı Sayılır Əgər
- [ ] service-templates.json-dan şablon yüklənir
- [ ] Şablon dəyişənlər ilə render edilir
- [ ] Service start/stop/restart işləyir
- [ ] Standalone DB-lər (postgres, mysql, vb.) işə salınır
