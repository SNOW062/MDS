# MasterDeploy (MD) — Master Plan

## Bu Layihə Nədir?

MasterDeploy, Coolify (PHP/Laravel)-nin tam funksional Rust versiyasıdır.
Coolify-nin hər funksiyası Rust-da yenidən yazılır — heç bir funksiya atlanmır.

## Mənbə Kodları Harada?

```
e:\MD\
├── coolify-source\     ← Orijinal Coolify PHP kodu (referans üçün)
├── MDS\                ← Köhnə MD layihəsi (köhnədir, istifadə edilmir)
└── rust-coolify\       ← YENİ layihə (buraya yazılır)
```

## Workspace Strukturu

```
e:\MD\rust-coolify\
├── Cargo.toml                ← Workspace root (bütün crate-lər burada qeydlidir)
├── migrations\               ← PostgreSQL migration SQL faylları
│   ├── 0001_users.sql
│   ├── 0002_teams.sql
│   └── ... (18 fayl var, davam edəcək)
├── MASTER_PLAN.md            ← Bu fayl
├── AGENT_GUIDE.md            ← Agent iş qaydaları
├── PROGRESS.md               ← Hansı crate bitdi, hansı davam edir
└── crates\
    ├── api\        ← HTTP server (Axum) — entry point
    ├── auth\       ← Authentication, API token, OAuth, Team
    ├── core\       ← SSH, Docker API, Process runner
    ├── db\         ← Bütün DB modellər + migrations
    ├── deployer\   ← Git clone, Build, Deploy engine
    ├── proxy\      ← Traefik/Caddy/Nginx/SSL
    ├── scheduler\  ← Background jobs, Cron
    ├── notify\     ← Email, Slack, Discord, Telegram
    ├── storage\    ← S3, Database backup, Volume backup
    ├── services\   ← 280+ one-click service templates
    └── sentinel\   ← Server monitoring (CPU/RAM/Disk)
```

## Coolify-nin Ölçüsü (Agent Anlasın)

| Fayl | Ölçü | Bizim Crate |
|------|------|-------------|
| ApplicationDeploymentJob.php | **247 KB** | `deployer` |
| ApplicationsController.php | **269 KB** | `api/routes/applications.rs` |
| Service.php | **75 KB** | `services` + `db/models/service.rs` |
| Server.php | **61 KB** | `core` + `db/models/server.rs` |
| DatabasesController.php | **207 KB** | `api/routes/databases.rs` |
| migrations/ | **348 fayl** | `migrations/` |
| service-templates.json | **1 MB** | `services/templates/` |

Bu ölçülər göstərir ki, hər crate özlüyündə çox böyük bir işdir.
**Bir agent = bir crate** prinsipi ilə işlənilməlidir.

## Crate-lərin Asılılıq Xəritəsi

```
api
 ├── auth       (istifadəçi yoxlama)
 ├── db         (bütün modellər)
 ├── deployer
 │    ├── core  (SSH + Docker)
 │    └── db
 ├── proxy
 │    └── core
 ├── scheduler
 │    ├── deployer
 │    ├── storage
 │    └── notify
 ├── notify
 │    └── db
 ├── storage
 │    ├── core
 │    └── db
 ├── services
 │    ├── core
 │    └── db
 └── sentinel
      ├── core
      └── db
```

**Qayda:** Asılılıq yalnız yuxarıdan aşağıya gedir.
`core` heç kimə asılı deyil. `db` yalnız sqlx-ə asılıdır.

## İş Prioriteti (Sıra Vacibdir!)

```
1. db        ← ƏN ÖNCƏ — hər şey DB-dən asılıdır
2. auth      ← İkinci — API token olmadan heç bir endpoint işləməz
3. core      ← Üçüncü — SSH + Docker real implementasiya
4. api       ← Dördüncü — bütün route-lar + WebSocket
5. deployer  ← Beşinci — ən böyük iş (Git + Build + Deploy)
6. proxy     ← Altıncı
7. scheduler ← Yeddinci
8. notify    ← Səkkizinci
9. sentinel  ← Doqquzuncu
10. storage  ← Onuncu
11. services ← On birinci (280+ şablon)
```

## Texnologiya Stack

```toml
# Async runtime
tokio = "1.40"

# HTTP framework
axum = "0.7"          # REST + WebSocket

# Database
sqlx = "0.8"          # PostgreSQL (async ORM)

# SSH
russh = "0.49"        # SSH client (async)

# Docker
bollard = "0.18"      # Docker API (async)

# Git
git2 = "0.19"         # libgit2 binding

# Auth
jsonwebtoken = "9"
argon2 = "0.5"

# Email
lettre = "0.11"

# HTTP client
reqwest = "0.12"      # Slack, Discord, Telegram, Webhook

# S3
aws-sdk-s3 = "1"

# Template engine
tera = "1"            # Jinja2-compatible (one-click services)

# Cron
tokio-cron-scheduler = "0.13"
```

## Environment Variables (.env)

```env
DATABASE_URL=postgres://postgres:password@localhost/masterdeploy
RUST_LOG=info
JWT_SECRET=change-me-in-production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
APP_URL=http://localhost:8000
```

## Hal-hazırki Vəziyyət

PROGRESS.md faylına bax.
