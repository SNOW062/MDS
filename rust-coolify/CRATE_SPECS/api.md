# CRATE SPEC: `api`

## Məqsəd
Bütün HTTP REST endpoint-lər və WebSocket bağlantıları.
Bu crate yalnız HTTP layer-dır — biznes məntiq digər crate-lərdədir.

## Coolify Referansları
```
e:\MD\coolify-source\routes\api.php                                   ← Bütün route-lar
e:\MD\coolify-source\app\Http\Controllers\Api\ServersController.php   ← Server API
e:\MD\coolify-source\app\Http\Controllers\Api\ApplicationsController.php (269KB!)
e:\MD\coolify-source\app\Http\Controllers\Api\DatabasesController.php (207KB!)
e:\MD\coolify-source\app\Http\Controllers\Api\ServicesController.php  (124KB!)
e:\MD\coolify-source\openapi.yaml                                     ← TAM API SPEC
```

## ƏSAS: openapi.yaml-ı Oxu!
`e:\MD\coolify-source\openapi.yaml` faylı bütün endpoint-ləri,
request/response strukturlarını göstərir.
Hər route yazmadan əvvəl bu fayla bax.

## Route Strukturu

### `/api/v1/servers`
```
GET    /api/v1/servers               → list_servers()
POST   /api/v1/servers               → create_server()
GET    /api/v1/servers/:id           → get_server()
PATCH  /api/v1/servers/:id           → update_server()
DELETE /api/v1/servers/:id           → delete_server()
POST   /api/v1/servers/:id/validate  → validate_server()
GET    /api/v1/servers/:id/resources → server_resources()
POST   /api/v1/servers/:id/restart   → restart_server()
```

### `/api/v1/applications`
```
GET    /api/v1/applications          → list_applications()
POST   /api/v1/applications          → create_application()
GET    /api/v1/applications/:id      → get_application()
PATCH  /api/v1/applications/:id      → update_application()
DELETE /api/v1/applications/:id      → delete_application()
POST   /api/v1/applications/:id/start   → start_application()
POST   /api/v1/applications/:id/stop    → stop_application()
POST   /api/v1/applications/:id/restart → restart_application()
POST   /api/v1/applications/:id/deploy  → deploy_application()
GET    /api/v1/applications/:id/logs    → get_logs()
GET    /api/v1/applications/:id/envs    → list_env_vars()
POST   /api/v1/applications/:id/envs    → create_env_var()
DELETE /api/v1/applications/:id/envs/:env_id → delete_env_var()
```

### `/api/v1/databases`
```
GET    /api/v1/databases              → list_databases()
POST   /api/v1/databases/postgresql   → create_postgres()
POST   /api/v1/databases/mysql        → create_mysql()
POST   /api/v1/databases/mariadb      → create_mariadb()
POST   /api/v1/databases/mongodb      → create_mongodb()
POST   /api/v1/databases/redis        → create_redis()
POST   /api/v1/databases/keydb        → create_keydb()
POST   /api/v1/databases/clickhouse   → create_clickhouse()
POST   /api/v1/databases/dragonfly    → create_dragonfly()
GET    /api/v1/databases/:id          → get_database()
PATCH  /api/v1/databases/:id          → update_database()
DELETE /api/v1/databases/:id          → delete_database()
POST   /api/v1/databases/:id/start    → start_database()
POST   /api/v1/databases/:id/stop     → stop_database()
POST   /api/v1/databases/:id/restart  → restart_database()
```

### WebSocket Endpoint-lər
```
WS /api/v1/deployments/:id/logs    → Deploy log streaming
WS /api/v1/servers/:id/terminal   → SSH terminal (xterm.js)
```

## Handler Yazma Nümunəsi
```rust
// Coolify-də: ServersController@index
async fn list_servers(
    State(state): State<AppState>,
    Extension(user): Extension<AuthUser>,  // auth middleware-dən gəlir
) -> Json<Value> {
    let servers = rc_db::repos::server_repo::list_servers(
        &state.db,
        user.team_id,
    ).await.unwrap_or_default();
    Json(json!(servers))
}
```

## Auth Middleware
```rust
// Hər endpoint Bearer token yoxlamalıdır
// Header: Authorization: Bearer rc_xxxxxxxxxxxx
// Middleware rc-auth::token::verify_token() çağırır
// Uğursuzsa 401 Unauthorized qaytarır
```

## Tamamlandı Sayılır Əgər
- [ ] `cargo build -p rc-api` keçir
- [ ] Bütün server endpoint-lər işləyir
- [ ] Bütün application endpoint-lər işləyir
- [ ] Database endpoint-lər işləyir
- [ ] Auth middleware Bearer token yoxlayır
- [ ] WebSocket deploy log streaming işləyir
- [ ] WebSocket SSH terminal işləyir
- [ ] Integration testlər var
