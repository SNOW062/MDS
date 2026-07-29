# completed meta_api_readme_md
# rc-api MasterDeploy HTTP API Server

Coolify PHP backend-inin Rust ile yeniden yazilmasi.
Bu crate, axum framework uzeredeki REST API server-i implement edir.

## Arxitektura

- main.rs        - Server giris noktesi
- state.rs       - AppState (DB + Config)
- kernel.rs      - Middleware stack konfiqurasiyasi
- middleware/    - Auth, CORS, MCP, Maintenance, TrustHosts, CSRF vs.
- routes/        - Application, Database, Server, Project, Deploy route-lari
- routes/api/    - API v1 controller-lari
- routes/webhook - GitHub, GitLab, Bitbucket, Gitea, Stripe webhook-lari
- dto/           - Data Transfer Objects
- websocket/     - WebSocket endpoint-leri

## Endpointler

GET  /api/health                    - Saglamliq yoxlamasi
GET  /api/applications              - Tetbiqlerin siyahisi
POST /api/applications              - Yeni tetbiq yarat
POST /api/applications/:uuid/deploy - Deploy baslat
POST /api/applications/:uuid/stop   - Tetbiqi dondur
GET  /api/databases                 - Verilenbazalar (PG, MySQL, Redis, Mongo...)
GET  /api/servers                   - Serverler
GET  /api/projects                  - Proyektler
POST /api/deploy                    - Resursu deploy et
GET  /api/security/keys             - SSH acarlari
POST /api/scheduled-tasks           - Cron tapsirig yarat

## Authentication

Bearer token ile qorunan endpointler:
  Authorization: Bearer <token>

## Coolify Menbe Xeritesi

Coolify PHP                         -> Rust Ekvivalenti
app/Http/Kernel.php                 -> src/kernel.rs
app/Http/Middleware/ApiAllowed.php  -> middleware/auth.rs
app/Http/Controllers/Api/           -> routes/api/
routes/api.php                      -> routes/mod.rs
