# MasterDeploy — Frontend Implementasiya Plani

> **Agent ucun:** Bu sened React frontendini tam olaraq nece quracagini izah edir.
> Her komponent Coolify-nin original Blade view-larina esaslanir.
> Referans fayllar D:\MDS\coolify-source\ altindadir.

---

## 1. TEXNOLOGIYA STACK

```
React 19 + TypeScript
Vite 8 (build tool)
TailwindCSS v4
lucide-react (ikonlar)
React Router v7 (routing)
Zustand (state management)
Tanstack Query v5 (API data fetching)
xterm.js (SSH terminal)
@monaco-editor/react (kod editoru)
recharts (qrafikler)
```

**Qovluq:** D:\MDS\rust-coolify\ui\

---

## 2. COOLIFY UI - TAM SEHIFE XERITESI

### 2.1 Auth Sehifeleri
**Coolify referansi:** coolify-source/resources/views/auth/

| Coolify fayl | React komponenti | Route |
|---|---|---|
| login.blade.php | LoginPage | /login |
| register.blade.php | RegisterPage | /register |
| forgot-password.blade.php | ForgotPasswordPage | /forgot-password |
| reset-password.blade.php | ResetPasswordPage | /reset-password |
| two-factor-challenge.blade.php | TwoFactorPage | /two-factor |
| verify-email.blade.php | VerifyEmailPage | /verify-email |

**Login sehifesinin elementleri:**
- Email input
- Password input (show/hide toggle)
- "Remember me" checkbox
- "Forgot password?" link
- Login button (loading state var)
- "Register" link
- OAuth buttonlar (GitHub, GitLab, Google, Bitbucket)

---

### 2.2 Onboarding Sehifesi
**Coolify referansi:** coolify-source/resources/views/livewire/boarding/index.blade.php (53KB!)

| React komponenti | Route |
|---|---|
| OnboardingPage | /onboarding |

**Addimlar (Step-by-step wizard):**
1. Welcome — xos geldin mesaji
2. Create Team — ilk komanda adi
3. Add Private Key — SSH private key elave et
4. Add Server — ilk server elave et (SSH ile validate)
5. Create Project — ilk proyekt
6. Done — dashboard-a yonlendir

**Elementler:**
- Progress bar (addimlari gosterir)
- Step indicator (1/2/3...)
- Back/Next duymeleri
- Skip option

---

### 2.3 Dashboard
**Coolify referansi:** coolify-source/resources/views/livewire/dashboard.blade.php

| React komponenti | Route |
|---|---|
| DashboardPage | / |

**Elementler:**
- h1 Dashboard + subtitle "Your self-hosted infrastructure."
- Projects bolmesi:
  - "Projects" basligi + "+" (Add) duymesi (modal acir)
  - Project kartlari (2 sutunlu grid, xl:2col)
  - Her kartda: ad, description, "Settings" link, "+ Add Resource" link
  - Bos veziyyet: "No projects found" xeberdarligi + Add button
- Servers bolmesi:
  - "Servers" basligi + "+" duymesi
  - Server kartlari (2 sutunlu grid)
  - Her kartda: ad, IP, status badge (reachable/not reachable)
  - Bos veziyyet: "No private keys found" => private key elave et modal

---

### 2.4 Proyekt Sehifeleri
**Coolify referansi:** coolify-source/resources/views/livewire/project/

#### 2.4.1 Proyekt Detay
**Fayl:** project/show.blade.php

| React komponenti | Route |
|---|---|
| ProjectDetailPage | /project/:uuid/:env_uuid |

**Elementler:**
- Proyekt adi + description (edit edile biler inline)
- Environment tablari (production, staging, custom...)
- Resurslar siyahisi:
  - Applications (her biri status badge ile)
  - Databases (PostgreSQL, MySQL, Redis, MongoDB...)
  - Services (one-click)
- "+ Add Resource" duymesi => Resource secim modal

#### 2.4.2 Yeni Resurs Elave Et
**Fayl:** project/new/select.blade.php (42KB!)

| React komponenti | Route |
|---|---|
| NewResourcePage | /project/:uuid/:env_uuid/new |

**Resurs novleri (tab-lar):**
- Applications:
  - Public Git Repository
  - Private GitHub Repository
  - Private GitLab Repository
  - Docker Image
  - Docker Compose
  - Dockerfile
- Databases:
  - PostgreSQL, MySQL, MariaDB, MongoDB
  - Redis, KeyDB, ClickHouse, Dragonfly
- Services (one-click):
  - 280+ sablon (WordPress, Ghost, Plausible...)

---

### 2.5 Application Sehifeleri
**Coolify referansi:** coolify-source/resources/views/livewire/project/application/

#### 2.5.1 Application Heading/Status Bar
**Fayl:** application/heading.blade.php (33KB!)

**Elementler (her application sehifesinin ustunde):**
- App adi
- Status badge: running / stopped / degraded / restarting
- Deploy button (esas, primary)
- Stop/Start/Restart buttonlar
- Open URL button (xarici link ikonu)
- Deployment log goster/gizle toggle
- Tab naviqasiyasi (General, Advanced, Deployments, Logs, Rollback...)

#### 2.5.2 Application General Ayarlar
**Fayl:** application/general.blade.php (47KB!)

Route: /project/:p/:e/app/:uuid/general

**Formlar:**
- Source bolmesi: Git URL, Branch, Commit SHA, Git source
- Build bolmesi: Build pack, Dockerfile, Build cmd, Start cmd, Base/Publish dir
- Domains bolmesi: Domain list, Port mapping, HTTPS force, www redirect
- Health Check: Path, Port, Method, Interval, Timeout, Retries

#### 2.5.3 Application Environment Variables
Route: /project/:p/:e/app/:uuid/envs

**Elementler:**
- ENV var siyahisi (key=value)
- Her setirde: key input, value input (password type toggle), delete button
- is_preview / is_build_time / is_shared toggle-lar
- "+ Add" duymesi
- Bulk import (textarea-dan paste et)

#### 2.5.4 Application Advanced Ayarlar
**Fayl:** application/advanced.blade.php (11KB)
Route: /project/:p/:e/app/:uuid/advanced

**Elementler:**
- Custom Docker labels
- Docker network
- Custom pre/post deployment commands
- Resource limits (CPU, Memory)
- Restart policy (always/unless-stopped/on-failure/no)

#### 2.5.5 Deployments Siyahisi
**Fayl:** application/deployment/index.blade.php
Route: /project/:p/:e/app/:uuid/deployments

**Elementler:**
- Deployment siyahisi (tarix, commit, branch, status, vaxt)
- Status badge-ler: running / finished / failed / cancelled
- Her deployment-e klik => log detay sehifesi
- Pagination

#### 2.5.6 Deployment Log Detay
**Fayl:** application/deployment/show.blade.php (28KB)
Route: /project/:p/:e/app/:uuid/deployment/:deploy_uuid

**Elementler:**
- Real-time log streaming (WebSocket)
- Log lines (rengli: info/success/error/warning)
- Timestamps
- "Cancel deployment" button
- Copy log button

#### 2.5.7 Application Logs (Runtime)
Route: /project/:p/:e/app/:uuid/logs

**Elementler:**
- Real-time container log (WebSocket/SSE)
- Search/filter input
- Timestamp toggle, Auto-scroll toggle
- Download log button

#### 2.5.8 Rollback
**Fayl:** application/rollback.blade.php

**Elementler:**
- Son N deployment siyahisi
- Her biri ucun "Rollback to this" duymesi
- Confirm modal

#### 2.5.9 Previews (PR Previews)
**Fayl:** application/previews.blade.php (17KB)

**Elementler:**
- Open PR-lar siyahisi (GitHub-dan gelir)
- Her PR ucun: enable/disable toggle, custom domain, deploy button

---

### 2.6 Database Sehifeleri
**Coolify referansi:** coolify-source/resources/views/livewire/project/database/

**DB noveleri ucun xususi fayllar:**
- database/postgresql/ => PostgreSQL
- database/mysql/      => MySQL
- database/mariadb/    => MariaDB
- database/mongodb/    => MongoDB
- database/redis/      => Redis
- database/keydb/      => KeyDB
- database/clickhouse/ => ClickHouse
- database/dragonfly/  => Dragonfly

**DB Heading elementleri (heading.blade.php - 17KB):**
- DB adi + tip
- Status badge
- Start/Stop/Restart buttonlar
- Tab naviqasiyasi (Configuration, Backups, Logs...)

**DB Configuration umumi elementler:**
- DB_USER, DB_PASSWORD (sifreli, copy button)
- DB_DATABASE adi
- Port mapping
- Volume mount path
- Custom docker image

#### Backups (scheduled-backups.blade.php - 15KB)
Route: /project/:p/:e/db/:uuid/backups

**Elementler:**
- Backup siyahisi (vaxt, olcu, status)
- "+ Create Backup" modal: cron expression, S3 storage, Keep last N
- "Backup Now" duymesi
- Her backup ucun: download, delete

---

### 2.7 Services (One-Click) Sehifeleri
**Coolify referansi:** coolify-source/resources/views/livewire/project/service/

**Fayl:** service/index.blade.php (22KB)
Route: /project/:p/:e/service/:uuid

**Elementler:**
- Service adi + stack adi
- Resource kartlari (her container ayrica): ad, tip, status, domain
- Environment Variables bolmesi
- File Storage bolmesi

**Storage fayl:** service/storage.blade.php (42KB)
- Volume siyahisi
- Her volume: ad, mount path, olcu
- File manager (fayllar inline edit edilebilir)

---

### 2.8 Server Sehifeleri
**Coolify referansi:** coolify-source/resources/views/livewire/server/

#### Servers Siyahisi
Route: /servers

#### Server Yarat
**Fayl:** server/create.blade.php (8KB)
Route: /servers/new

**Form elementleri:**
- Server adi, Description
- IP / Hostname
- SSH port (default: 22)
- Private key secimi (dropdown)
- Non-root user toggle + username
- "Validate & Install" duymesi

#### Server Detay
**Fayl:** server/show.blade.php (66KB!) + server/navbar.blade.php (18KB)
Route: /server/:uuid

**Tab naviqasiyasi:**
- Resources — butun resource-lar siyahisi
- Configuration — IP, SSH, private key, validate, install docker
- Proxy — Traefik/Caddy secimi, YAML editor
- Private Keys — server ucun SSH key-ler
- Destinations — Docker network-ler
- Log Drains — Axiom, Newrelic, Datadog
- Advanced — xususi ayarlar
- Sentinel — monitoring agent
- Security — firewall ayarlari
- Docker Cleanup — image/container temizleme

#### Server Charts (Monitoring)
**Fayl:** server/charts.blade.php (17KB)
Route: /server/:uuid/charts

**Elementler:**
- CPU (%) — line chart, real-time
- RAM (MB) — line chart
- Disk I/O — line chart
- Network I/O — line chart
- Time range: 1h, 6h, 24h, 7d

#### Server Proxy
**Fayl:** server/proxy.blade.php (14KB)
Route: /server/:uuid/proxy

**Elementler:**
- Proxy novu: Traefik / Caddy / None
- YAML konfiqurasiya (Monaco Editor)
- Reload/Restart proxy duymeleri
- Proxy status + logs

#### Server Terminal (SSH)
Route: /server/:uuid/terminal

**Elementler:**
- xterm.js terminal (tam ekran)
- WebSocket baglanma: wss://api/v1/servers/:id/terminal
- Disconnect button

---

### 2.9 Security Sehifeleri
**Coolify referansi:** coolify-source/resources/views/livewire/security/

#### API Tokens
**Fayl:** security/api-tokens.blade.php (12KB)
Route: /security/api-tokens

**Elementler:**
- Token siyahisi (ad, yaradilma, son istifade)
- "+ Create Token" modal: ad, permissions, expiry
- Token bir defe goster + copy
- Revoke (confirm modal ile)

#### Private Keys
Route: /security/private-keys

**Elementler:**
- Key siyahisi (ad, fingerprint)
- "+ Add Key" modal: ad, PEM textarea, "Generate" duymesi
- Delete (confirm modal)

---

### 2.10 Notifications Sehifeleri
**Coolify referansi:** coolify-source/resources/views/livewire/notifications/

Route: /notifications

**Tab-lar:**
- Email — SMTP ayarlari, test, events
- Slack — Webhook URL, test, events
- Discord — Webhook URL, test, events
- Telegram — Bot Token, Chat ID, test, events
- Pushover — API key, events
- Custom Webhook — URL, headers, events

**Hər notification uçun events:**
- Deploy started / finished / failed
- Server unreachable
- Backup finished / failed

---

### 2.11 S3 Storage Sehifeleri
**Coolify referansi:** coolify-source/resources/views/livewire/storage/

Route: /storages, /storages/:uuid

**Elementler:**
- S3 bucket siyahisi
- "+ Add S3" modal: Bucket, Region, Endpoint, Access Key, Secret Key
- "Test Connection" duymesi
- Backup baglantilar siyahisi

---

### 2.12 Team Sehifeleri
**Coolify referansi:** coolify-source/resources/views/livewire/team/

Route: /team

**Elementler:**
- Team adi, description (edit)
- Members siyahisi (ad, email, rol, Remove)
- "Invite Member" modal: email, rol secimi
- Pending invitations
- "Switch Team" dropdown (header-de)
- "+ Create New Team"

---

### 2.13 Settings Sehifeleri
**Coolify referansi:** coolify-source/resources/views/livewire/settings/

Route: /settings

**Tab-lar:**
- General: instance adi, URL, wildcard domain, port range, auto update
- Advanced: demo mode, registration toggle, rate limiting
- Scheduled Jobs: cron job siyahisi, add modal
- Updates: version, "Check for Updates", auto-update toggle

---

### 2.14 Profile Sehifesi
Route: /profile

**Elementler:**
- Ad, email update
- Password change
- 2FA enable/disable (QR kod + backup codes)
- Session siyahisi (aktiv sessions, logout)
- Delete account (confirm modal)

---

## 3. GLOBAL KOMPONENTLER

### 3.1 Layout
```
AppLayout
  |- Navbar (sol sidebar)
  |- TopBar (ust bar: team switch, notifications, user menu)
  `- main (children)
```

**Navbar elementleri:**
- MasterDeploy logo
- Dashboard link
- Projects list (collapsible)
- Servers link
- Sources link
- Security (API Tokens, Private Keys)
- Notifications link
- Settings link
- Team switch dropdown
- User avatar + name (asagida)
- Logout button

### 3.2 Toast Notifications
**Coolify referansi:** components/toast.blade.php (26KB)

- Success (yasil), Error (qirmizi), Warning (sari), Info (mavi)
- Dismiss duymesi
- Auto-dismiss (3 san)
- Stack desteyi

### 3.3 Modal Komponentleri
**Coolify referansi:** components/modal.blade.php

```
Modal           - esas modal
ModalInput      - form ile modal
ConfirmModal    - "Emin misiniz?" modal
SlideOver       - sagdan acilan panel
PopupSmall      - kicik tooltip popup
```

**ConfirmModal xususiyyetleri:**
- "Bu emeliyyat geri qaytarila bilmez" xeberdarligi
- Resource adini metn kimi yaz (confirm)
- Delete duymesi (primary red)
- Cancel duymesi

### 3.4 Form Komponentleri
**Coolify referansi:** components/forms/

```tsx
Input          // text, password, email, number
Textarea       // multi-line text
Select         // dropdown secim
Checkbox       // toggle/checkbox
Button         // primary, secondary, danger, ghost
CopyButton     // kopyala (clipboard)
MonacoEditor   // YAML, JSON, Dockerfile
EnvVarInput    // KEY=VALUE xususi input
```

**Button variantlari:**
- primary   - mavi/indigo, esas action
- secondary - boz, ikinci dereceili
- danger    - qirmizi, silme
- ghost     - seffaf, minimal
- loading   - spinner ile

### 3.5 Status Badge
**Coolify referansi:** components/status-badge.blade.php

```tsx
StatusBadge status="running"    // yasil + pulse animation
StatusBadge status="stopped"    // boz
StatusBadge status="degraded"   // sari
StatusBadge status="starting"   // mavi + pulse
StatusBadge status="restarting" // sari + pulse
StatusBadge status="error"      // qirmizi
```

### 3.6 Global Search
**Coolify referansi:** livewire/global-search.blade.php (79KB!)

- Ctrl+K ile acilir
- Projects, Servers, Applications, Databases axtarir
- Klaviatura naviqasiyasi (yukari/asagi/Enter)
- Real-time search (debounced 300ms)

### 3.7 Deployments Indicator
**Coolify referansi:** livewire/deployments-indicator.blade.php

- Header-de aktiv deployment-lar sayi
- Klikilende dropdown: aktiv deployment-lar siyahisi
- Her biri progress bar ile

---

## 4. API ESASI

**OpenAPI spec:** D:\MDS\coolify-source\openapi.yaml (383KB — tam API)
**Base URL:** /api/v1
**Auth:** Authorization: Bearer <token> (her request-de)

### Esas endpoint-ler:
```
GET  /api/v1/servers                      => server siyahisi
GET  /api/v1/servers/:id                  => server detay
POST /api/v1/servers/:id/validate         => validate server
GET  /api/v1/projects                     => proyekt siyahisi
GET  /api/v1/projects/:uuid/environments  => muhitler
GET  /api/v1/applications                 => app siyahisi
GET  /api/v1/applications/:uuid           => app detay
POST /api/v1/applications/:uuid/deploy    => deploy baslat
POST /api/v1/applications/:uuid/start     => start
POST /api/v1/applications/:uuid/stop      => stop
POST /api/v1/applications/:uuid/restart   => restart
GET  /api/v1/applications/:uuid/logs      => deployment log
GET  /api/v1/applications/:uuid/envs      => env vars
POST /api/v1/applications/:uuid/envs      => env var elave et
GET  /api/v1/databases                    => db siyahisi
GET  /api/v1/services                     => service siyahisi
```

**WebSocket endpoint-ler:**
```
WS /api/v1/deployments/:uuid/logs      => deploy log stream
WS /api/v1/servers/:uuid/terminal     => SSH terminal
WS /api/v1/applications/:uuid/logs    => container log stream
```

---

## 5. DIZAYN SISTEMI (Coolify-ye Uygun)

### Renk Palitasi (Dark theme)
```css
--bg-primary:    #0f0f0f    /* esas arxa fon */
--bg-secondary:  #18181b    /* kartlar */
--bg-tertiary:   #27272a    /* input */
--border:        #3f3f46    /* serhedd */
--text-primary:  #e4e4e7    /* esas metn */
--text-secondary:#a1a1aa    /* ikinci metn */
--accent:        #6366f1    /* indigo */
--success:       #22c55e    /* yasil */
--warning:       #f59e0b    /* sari */
--error:         #ef4444    /* qirmizi */
--info:          #3b82f6    /* mavi */
```

### Tipografiya
```
Font: Inter (Google Fonts)
Mono: JetBrains Mono (kod ucun)
h1: 2rem, bold
h2: 1.5rem, semibold
h3: 1.25rem, semibold
body: 0.875rem (14px)
small: 0.75rem (12px)
```

### Coolify-ye xas CSS class-lar (replika et)
```css
.coolbox         /* kart container - border, rounded, hover */
.box-title       /* kart baslig metni */
.box-description /* kart acaqlama metni */
.subtitle        /* sehife subtitle */
```

---

## 6. ROUTING STRUKTURU

```
/                                                    => DashboardPage
/login                                               => LoginPage
/register                                            => RegisterPage
/forgot-password                                     => ForgotPasswordPage
/reset-password                                      => ResetPasswordPage
/two-factor                                          => TwoFactorPage
/onboarding                                          => OnboardingPage

/project/:uuid/:env_uuid                             => ProjectDetailPage
/project/:uuid/:env_uuid/new                         => NewResourcePage
/project/:uuid/:env_uuid/app/:app_uuid/general       => AppGeneralPage
/project/:uuid/:env_uuid/app/:app_uuid/envs          => AppEnvVarsPage
/project/:uuid/:env_uuid/app/:app_uuid/advanced      => AppAdvancedPage
/project/:uuid/:env_uuid/app/:app_uuid/deployments   => AppDeploymentsPage
/project/:uuid/:env_uuid/app/:app_uuid/deployment/:d => DeploymentLogPage
/project/:uuid/:env_uuid/app/:app_uuid/logs          => AppLogsPage
/project/:uuid/:env_uuid/app/:app_uuid/rollback      => AppRollbackPage
/project/:uuid/:env_uuid/app/:app_uuid/previews      => AppPreviewsPage
/project/:uuid/:env_uuid/db/:db_uuid/configuration   => DbConfigPage
/project/:uuid/:env_uuid/db/:db_uuid/backups         => DbBackupsPage
/project/:uuid/:env_uuid/db/:db_uuid/logs            => DbLogsPage
/project/:uuid/:env_uuid/service/:s_uuid             => ServiceDetailPage

/servers                                             => ServersPage
/servers/new                                         => CreateServerPage
/server/:uuid                                        => ServerDetailPage
/server/:uuid/proxy                                  => ServerProxyPage
/server/:uuid/terminal                               => TerminalPage
/server/:uuid/charts                                 => ServerChartsPage

/sources                                             => SourcesPage
/sources/github/:uuid                                => GitHubSourcePage

/security/api-tokens                                 => ApiTokensPage
/security/private-keys                               => PrivateKeysPage
/security/private-keys/:uuid                         => PrivateKeyDetailPage
/security/cloud-tokens                               => CloudTokensPage

/storages                                            => S3StoragePage
/storages/:uuid                                      => S3StorageDetailPage

/notifications                                       => NotificationsPage
/team                                                => TeamPage
/admin                                               => AdminPage
/settings                                            => SettingsPage
/profile                                             => ProfilePage
```

---

## 7. STATE MANAGEMENTI (Zustand)

```typescript
useAuthStore()    // user, token, team
useProjectStore() // aktiv project, environment
useServerStore()  // server list + aktiv server
useDeployStore()  // aktiv deployment-lar
useToastStore()   // toast notifications
```

---

## 8. IMPLEMENTASIYA SIRASI

```
Merrhele 1 - Esas Infrastruktur
  1. React Router v7 qur
  2. API client (axios + Tanstack Query)
  3. Auth store (Zustand)
  4. AppLayout (Navbar + TopBar)
  5. Toast system

Merrhele 2 - Auth Axisi
  6. Login, Register, Forgot Password

Merrhele 3 - Dashboard + Onboarding
  7. Dashboard (projects + servers grid)
  8. Onboarding wizard

Merrhele 4 - Server Modulu
  9.  Servers list + Create server
  10. Server detail + tabs
  11. Server charts (recharts)
  12. SSH Terminal (xterm.js)

Merrhele 5 - Application Modulu
  13. Project + Environment detail
  14. New Resource wizard
  15. App General settings
  16. App Env Vars
  17. Deployment log (WebSocket)
  18. Real-time logs (WebSocket)

Merrhele 6 - Database Modulu
  19. DB configuration (her tip ucun)
  20. Backup management

Merrhele 7 - Service Modulu
  21. One-click services
  22. Service storage/volumes

Merrhele 8 - Admin + Settings
  23. Security (API tokens, SSH keys)
  24. Notifications
  25. Team management
  26. S3 Storage
  27. Instance settings

Merrhele 9 - Polishing
  28. Global Search (Ctrl+K)
  29. Deployments indicator
  30. Mobile responsive layout
```

---

## 9. ONEMLI QEYDLER

1. **Mock data ile basla** — Backend olmadan UI-i test etmek ucun src/mocks/ qovlugunda mock data yaz.

2. **WebSocket** — Deploy log, container log, terminal ucun. Backend hazir olana qeder mock simulyasiya et.

3. **Monaco Editor** — Proxy config (YAML), Dockerfile, Compose ucun. @monaco-editor/react paketi.

4. **xterm.js** — SSH terminal ucun. xterm + xterm-addon-fit + xterm-addon-web-links paketleri.

5. **Dark mode yalniz** — Coolify yalniz dark mode-dadir. Light mode lazim deyil.

6. **Realtime charts** — Tanstack Query ile 5 saniyelik polling (WebSocket lazim deyil bu ucun).

7. **Her sehifede tab-lar** — React Router nested routes ile implement et.

---

## 10. REFERANS FAYLLAR (En Vacib)

```
D:\MDS\coolify-source\resources\views\livewire\
|- dashboard.blade.php                      (8KB)  - Dashboard
|- boarding\index.blade.php                 (53KB) - Onboarding
|- project\application\general.blade.php    (47KB) - App ayarlari
|- project\application\heading.blade.php    (33KB) - App status bar
|- project\service\heading.blade.php        (34KB) - Service heading
|- project\service\storage.blade.php        (42KB) - Service storage
|- project\new\select.blade.php             (42KB) - Yeni resurs secim
|- server\show.blade.php                    (66KB) - Server detay
|- server\navbar.blade.php                  (18KB) - Server nav
|- livewire\global-search.blade.php         (79KB) - Global axtaris

D:\MDS\coolify-source\openapi.yaml          (383KB) - TAM API SPEC
D:\MDS\coolify-source\routes\api.php        (28KB)  - API route-lar
D:\MDS\coolify-source\routes\web.php        (29KB)  - Web route-lar
```
