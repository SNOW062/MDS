# MasterDeploy Log İzləmə Faylı
Zəhmət olmasa, terminalınızda baş verən xətanı və ya log məlumatlarını bu faylın sonuna əlavə edin.
Yadda saxladıqdan sonra mənə bildirin, dərhal oxuyub analiz edəcəyəm.

---
[LOG Girişi gözlənilir...]
[DOCKER] #25 556.4  9 |     extract::{Path, State},
[DOCKER] #25 556.4    |               ^^^^  ^^^^^
[DOCKER] #25 556.4 10 |     http::StatusCode,
[DOCKER] #25 556.4    |     ^^^^^^^^^^^^^^^^
[DOCKER] #25 556.4
[DOCKER] #25 556.4 warning: unused import: `tokio::sync::broadcast`
[DOCKER] #25 556.4   --> crates/api/src/websocket/deploy_log.rs:14:5
[DOCKER] #25 556.4    |
[DOCKER] #25 556.4 14 | use tokio::sync::broadcast;
[DOCKER] #25 556.4    |     ^^^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 556.4
[DOCKER] #25 561.3 warning: unused variable: `q`
[DOCKER] #25 561.3    --> crates/api/src/routes/applications.rs:160:11
[DOCKER] #25 561.3     |
[DOCKER] #25 561.3 160 |     Query(q): Query<TagQuery>,
[DOCKER] #25 561.3     |           ^ help: if this is intentional, prefix it with an underscore: `_q`
[DOCKER] #25 561.3     |
[DOCKER] #25 561.3     = note: `#[warn(unused_variables)]` (part of `#[warn(unused)]`) on by default
[DOCKER] #25 561.3
[DOCKER] #25 561.4 warning: unused variable: `q`
[DOCKER] #25 561.4    --> crates/api/src/routes/applications.rs:354:11
[DOCKER] #25 561.4     |
[DOCKER] #25 561.4 354 |     Query(q): Query<DeployQuery>,
[DOCKER] #25 561.4     |           ^ help: if this is intentional, prefix it with an underscore: `_q`
[DOCKER] #25 561.4
[DOCKER] #25 561.4 warning: unused variable: `uuid`
[DOCKER] #25 561.4    --> crates/api/src/routes/applications.rs:497:11
[DOCKER] #25 561.4     |
[DOCKER] #25 561.4 497 |     Path((uuid, env_uuid)): Path<(Uuid, Uuid)>,
[DOCKER] #25 561.4     |           ^^^^ help: if this is intentional, prefix it with an underscore: `_uuid`
[DOCKER] #25 561.4
[DOCKER] #25 561.4 warning: unused variable: `uuid`
[DOCKER] #25 561.4    --> crates/api/src/routes/applications.rs:515:11
[DOCKER] #25 561.4     |
[DOCKER] #25 561.4 515 |     Path((uuid, env_uuid)): Path<(Uuid, Uuid)>,
[DOCKER] #25 561.4     |           ^^^^ help: if this is intentional, prefix it with an underscore: `_uuid`
[DOCKER] #25 561.4
[DOCKER] #25 561.4 warning: unused variable: `rows`
[DOCKER] #25 561.4    --> crates/api/src/routes/applications.rs:543:9
[DOCKER] #25 561.4     |
[DOCKER] #25 561.4 543 |     let rows = sqlx::query(
[DOCKER] #25 561.4     |         ^^^^ help: if this is intentional, prefix it with an underscore: `_rows`
[DOCKER] #25 561.4
[DOCKER] #25 561.4 warning: unused variable: `state`
[DOCKER] #25 561.4    --> crates/api/src/routes/applications.rs:559:11
[DOCKER] #25 561.4     |
[DOCKER] #25 561.4 559 |     State(state): State<AppState>,
[DOCKER] #25 561.4     |           ^^^^^ help: if this is intentional, prefix it with an underscore: `_state`
[DOCKER] #25 561.4
[DOCKER] #25 561.7 warning: unused variable: `rows`
[DOCKER] #25 561.7    --> crates/api/src/routes/databases.rs:150:9
[DOCKER] #25 561.7     |
[DOCKER] #25 561.7 150 |     let rows = sqlx::query(
[DOCKER] #25 561.7     |         ^^^^ help: if this is intentional, prefix it with an underscore: `_rows`
[DOCKER] #25 561.7
[DOCKER] #25 561.7 warning: unused variable: `state`
[DOCKER] #25 561.7    --> crates/api/src/routes/databases.rs:275:26
[DOCKER] #25 561.7     |
[DOCKER] #25 561.7 275 | async fn get_mysql(State(state): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
[DOCKER] #25 561.7     |                          ^^^^^ help: if this is intentional, prefix it with an underscore: `_state`
[DOCKER] #25 561.7
[DOCKER] #25 561.7 warning: unused variable: `state`
[DOCKER] #25 561.7    --> crates/api/src/routes/databases.rs:278:29
[DOCKER] #25 561.7     |
[DOCKER] #25 561.7 278 | async fn update_mysql(State(state): State<AppState>, Path(uuid): Path<Uuid>, Json(_body): Json<serde_json::Value>) -> Result<Json<s...
[DOCKER] #25 561.7     |                             ^^^^^ help: if this is intentional, prefix it with an underscore: `_state`
[DOCKER] #25 561.7
[DOCKER] #25 561.7 warning: unused variable: `uuid`
[DOCKER] #25 561.7    --> crates/api/src/routes/databases.rs:278:59
[DOCKER] #25 561.7     |
[DOCKER] #25 561.7 278 | ...ate): State<AppState>, Path(uuid): Path<Uuid>, Json(_body): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCo...
[DOCKER] #25 561.7     |                                ^^^^ help: if this is intentional, prefix it with an underscore: `_uuid`
[DOCKER] #25 561.7
[DOCKER] #25 561.7 warning: unused variable: `state`
[DOCKER] #25 561.7    --> crates/api/src/routes/databases.rs:283:31
[DOCKER] #25 561.7     |
[DOCKER] #25 561.7 283 | async fn create_mariadb(State(state): State<AppState>, Json(body): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, Stat...
[DOCKER] #25 561.7     |                               ^^^^^ help: if this is intentional, prefix it with an underscore: `_state`
[DOCKER] #25 561.7
[DOCKER] #25 561.7 warning: unused variable: `body`
[DOCKER] #25 561.7    --> crates/api/src/routes/databases.rs:283:61
[DOCKER] #25 561.7     |
[DOCKER] #25 561.7 283 | ...ate): State<AppState>, Json(body): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
[DOCKER] #25 561.7     |                                ^^^^ help: if this is intentional, prefix it with an underscore: `_body`
[DOCKER] #25 561.7
[DOCKER] #25 561.7 warning: unused variable: `uuid`
[DOCKER] #25 561.7    --> crates/api/src/routes/databases.rs:290:58
[DOCKER] #25 561.7     |
[DOCKER] #25 561.7 290 | ...(_s): State<AppState>, Path(uuid): Path<Uuid>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
[DOCKER] #25 561.7     |                                ^^^^ help: if this is intentional, prefix it with an underscore: `_uuid`
[DOCKER] #25 561.7
[DOCKER] #25 561.7 warning: unused variable: `state`
[DOCKER] #25 561.7    --> crates/api/src/routes/databases.rs:313:28
[DOCKER] #25 561.7     |
[DOCKER] #25 561.7 313 | async fn get_mongodb(State(state): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
[DOCKER] #25 561.7     |                            ^^^^^ help: if this is intentional, prefix it with an underscore: `_state`
[DOCKER] #25 561.7
[DOCKER] #25 561.7 warning: unused variable: `uuid`
[DOCKER] #25 561.7    --> crates/api/src/routes/databases.rs:316:58
[DOCKER] #25 561.7     |
[DOCKER] #25 561.7 316 | ...(_s): State<AppState>, Path(uuid): Path<Uuid>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
[DOCKER] #25 561.7     |                                ^^^^ help: if this is intentional, prefix it with an underscore: `_uuid`
[DOCKER] #25 561.7
[DOCKER] #25 561.7 warning: unused variable: `state`
[DOCKER] #25 561.7    --> crates/api/src/routes/databases.rs:337:26
[DOCKER] #25 561.7     |
[DOCKER] #25 561.7 337 | async fn get_redis(State(state): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
[DOCKER] #25 561.7     |                          ^^^^^ help: if this is intentional, prefix it with an underscore: `_state`
[DOCKER] #25 561.7
[DOCKER] #25 561.7 warning: unused variable: `uuid`
[DOCKER] #25 561.7    --> crates/api/src/routes/databases.rs:340:56
[DOCKER] #25 561.7     |
[DOCKER] #25 561.7 340 | async fn update_redis(State(_s): State<AppState>, Path(uuid): Path<Uuid>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_j...
[DOCKER] #25 561.7     |                                                        ^^^^ help: if this is intentional, prefix it with an underscore: `_uuid`
[DOCKER] #25 561.7
[DOCKER] #25 561.8 warning: unused variable: `uuid`
[DOCKER] #25 561.8    --> crates/api/src/routes/databases.rs:351:60
[DOCKER] #25 561.8     |
[DOCKER] #25 561.8 351 | ...(_s): State<AppState>, Path(uuid): Path<Uuid>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
[DOCKER] #25 561.8     |                                ^^^^ help: if this is intentional, prefix it with an underscore: `_uuid`
[DOCKER] #25 561.8
[DOCKER] #25 561.8 warning: unused variable: `uuid`
[DOCKER] #25 561.8    --> crates/api/src/routes/databases.rs:362:56
[DOCKER] #25 561.8     |
[DOCKER] #25 561.8 362 | async fn update_keydb(State(_s): State<AppState>, Path(uuid): Path<Uuid>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_j...
[DOCKER] #25 561.8     |                                                        ^^^^ help: if this is intentional, prefix it with an underscore: `_uuid`
[DOCKER] #25 561.8
[DOCKER] #25 561.8 warning: unused variable: `uuid`
[DOCKER] #25 561.8    --> crates/api/src/routes/databases.rs:373:61
[DOCKER] #25 561.8     |
[DOCKER] #25 561.8 373 | ...(_s): State<AppState>, Path(uuid): Path<Uuid>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
[DOCKER] #25 561.8     |                                ^^^^ help: if this is intentional, prefix it with an underscore: `_uuid`
[DOCKER] #25 561.8
[DOCKER] #25 562.0 warning: unused variable: `project_uuid`
[DOCKER] #25 562.0   --> crates/api/src/routes/services.rs:45:9
[DOCKER] #25 562.0    |
[DOCKER] #25 562.0 45 |     let project_uuid = Uuid::parse_str(&payload.project_uuid).map_err(|_| StatusCode::BAD_REQUEST)?;
[DOCKER] #25 562.0    |         ^^^^^^^^^^^^ help: if this is intentional, prefix it with an underscore: `_project_uuid`   
[DOCKER] #25 562.0
[DOCKER] #25 562.5 warning: unused variable: `state`
[DOCKER] #25 562.5   --> crates/api/src/routes/webhooks.rs:72:11
[DOCKER] #25 562.5    |
[DOCKER] #25 562.5 72 |     State(state): State<AppState>,
[DOCKER] #25 562.5    |           ^^^^^ help: if this is intentional, prefix it with an underscore: `_state`
[DOCKER] #25 562.5
[DOCKER] #25 562.5 warning: unused variable: `payload`
[DOCKER] #25 562.5   --> crates/api/src/routes/webhooks.rs:74:10
[DOCKER] #25 562.5    |
[DOCKER] #25 562.5 74 |     Json(payload): Json<serde_json::Value>,
[DOCKER] #25 562.5    |          ^^^^^^^ help: if this is intentional, prefix it with an underscore: `_payload`
[DOCKER] #25 562.5
[DOCKER] #25 562.5 warning: unused variable: `state`
[DOCKER] #25 562.5    --> crates/api/src/routes/webhooks.rs:104:11
[DOCKER] #25 562.5     |
[DOCKER] #25 562.5 104 |     State(state): State<AppState>,
[DOCKER] #25 562.5     |           ^^^^^ help: if this is intentional, prefix it with an underscore: `_state`
[DOCKER] #25 562.5
[DOCKER] #25 562.5 warning: unused variable: `state`
[DOCKER] #25 562.5    --> crates/api/src/routes/webhooks.rs:152:11
[DOCKER] #25 562.5     |
[DOCKER] #25 562.5 152 |     State(state): State<AppState>,
[DOCKER] #25 562.5     |           ^^^^^ help: if this is intentional, prefix it with an underscore: `_state`
[DOCKER] #25 562.5
[DOCKER] #25 562.5 warning: unused variable: `payload`
[DOCKER] #25 562.5    --> crates/api/src/routes/webhooks.rs:154:10
[DOCKER] #25 562.5     |
[DOCKER] #25 562.5 154 |     Json(payload): Json<serde_json::Value>,
[DOCKER] #25 562.5     |          ^^^^^^^ help: if this is intentional, prefix it with an underscore: `_payload`
[DOCKER] #25 562.5
[DOCKER] #25 562.5 warning: unused variable: `state`
[DOCKER] #25 562.5    --> crates/api/src/routes/webhooks.rs:173:11
[DOCKER] #25 562.5     |
[DOCKER] #25 562.5 173 |     State(state): State<AppState>,
[DOCKER] #25 562.5     |           ^^^^^ help: if this is intentional, prefix it with an underscore: `_state`
[DOCKER] #25 562.5
[DOCKER] #25 562.5 warning: unused variable: `payload`
[DOCKER] #25 562.5    --> crates/api/src/routes/webhooks.rs:175:10
[DOCKER] #25 562.5     |
[DOCKER] #25 562.5 175 |     Json(payload): Json<serde_json::Value>,
[DOCKER] #25 562.5     |          ^^^^^^^ help: if this is intentional, prefix it with an underscore: `_payload`
[DOCKER] #25 562.5
[DOCKER] #25 562.6 warning: unused variable: `state`
[DOCKER] #25 562.6    --> crates/api/src/routes/webhooks.rs:194:11
[DOCKER] #25 562.6     |
[DOCKER] #25 562.6 194 |     State(state): State<AppState>,
[DOCKER] #25 562.6     |           ^^^^^ help: if this is intentional, prefix it with an underscore: `_state`
[DOCKER] #25 562.6
[DOCKER] #25 562.6 warning: unused variable: `payload`
[DOCKER] #25 562.6    --> crates/api/src/routes/webhooks.rs:196:10
[DOCKER] #25 562.6     |
[DOCKER] #25 562.6 196 |     Json(payload): Json<serde_json::Value>,
[DOCKER] #25 562.6     |          ^^^^^^^ help: if this is intentional, prefix it with an underscore: `_payload`
[DOCKER] #25 562.6
[DOCKER] #25 562.6 warning: unused variable: `state`
[DOCKER] #25 562.6   --> crates/api/src/routes/oauth_controller.rs:73:11
[DOCKER] #25 562.6    |
[DOCKER] #25 562.6 73 |     State(state): State<AppState>,
[DOCKER] #25 562.6    |           ^^^^^ help: if this is intentional, prefix it with an underscore: `_state`
[DOCKER] #25 562.6
[DOCKER] #25 562.6 warning: unused variable: `code`
[DOCKER] #25 562.6   --> crates/api/src/routes/oauth_controller.rs:84:9
[DOCKER] #25 562.6    |
[DOCKER] #25 562.6 84 |     let code = query.code.ok_or_else(|| (
[DOCKER] #25 562.6    |         ^^^^ help: if this is intentional, prefix it with an underscore: `_code`
[DOCKER] #25 562.6
[DOCKER] #25 562.7 warning: unused variable: `headers`
[DOCKER] #25 562.7   --> crates/api/src/routes/webhook/bitbucket.rs:19:5
[DOCKER] #25 562.7    |
[DOCKER] #25 562.7 19 |     headers: HeaderMap,
[DOCKER] #25 562.7    |     ^^^^^^^ help: if this is intentional, prefix it with an underscore: `_headers`
[DOCKER] #25 562.7
[DOCKER] #25 562.7 warning: unused variable: `headers`
[DOCKER] #25 562.7   --> crates/api/src/routes/webhook/gitea.rs:19:5
[DOCKER] #25 562.7    |
[DOCKER] #25 562.7 19 |     headers: HeaderMap,
[DOCKER] #25 562.7    |     ^^^^^^^ help: if this is intentional, prefix it with an underscore: `_headers`
[DOCKER] #25 562.7
[DOCKER] #25 562.7 warning: unused variable: `headers`
[DOCKER] #25 562.7   --> crates/api/src/routes/webhook/github.rs:19:5
[DOCKER] #25 562.7    |
[DOCKER] #25 562.7 19 |     headers: HeaderMap,
[DOCKER] #25 562.7    |     ^^^^^^^ help: if this is intentional, prefix it with an underscore: `_headers`
[DOCKER] #25 562.7
[DOCKER] #25 562.7 warning: unused variable: `headers`
[DOCKER] #25 562.7   --> crates/api/src/routes/webhook/gitlab.rs:19:5
[DOCKER] #25 562.7    |
[DOCKER] #25 562.7 19 |     headers: HeaderMap,
[DOCKER] #25 562.7    |     ^^^^^^^ help: if this is intentional, prefix it with an underscore: `_headers`
[DOCKER] #25 562.7
[DOCKER] #25 562.7 warning: unused variable: `headers`
[DOCKER] #25 562.7   --> crates/api/src/routes/webhook/stripe.rs:19:5
[DOCKER] #25 562.7    |
[DOCKER] #25 562.7 19 |     headers: HeaderMap,
[DOCKER] #25 562.7    |     ^^^^^^^ help: if this is intentional, prefix it with an underscore: `_headers`
[DOCKER] #25 562.7
[DOCKER] #25 562.8 warning: unused variable: `params`
[DOCKER] #25 562.8   --> crates/api/src/websocket/deploy_log.rs:48:11
[DOCKER] #25 562.8    |
[DOCKER] #25 562.8 48 |     Query(params): Query<DeployLogQuery>,
[DOCKER] #25 562.8    |           ^^^^^^ help: if this is intentional, prefix it with an underscore: `_params`
[DOCKER] #25 562.8
[DOCKER] #25 562.9 warning: unused variable: `params`
[DOCKER] #25 562.9   --> crates/api/src/websocket/terminal.rs:41:11
[DOCKER] #25 562.9    |
[DOCKER] #25 562.9 41 |     Query(params): Query<TerminalQuery>,
[DOCKER] #25 562.9    |           ^^^^^^ help: if this is intentional, prefix it with an underscore: `_params`
[DOCKER] #25 562.9
[DOCKER] #25 562.9 warning: unused variable: `uuid`
[DOCKER] #25 562.9   --> crates/api/src/websocket/terminal.rs:68:15
[DOCKER] #25 562.9    |
[DOCKER] #25 562.9 68 |     let Some((uuid, is_terminal_enabled, server_ip)) = server_row else {
[DOCKER] #25 562.9    |               ^^^^ help: if this is intentional, prefix it with an underscore: `_uuid`
[DOCKER] #25 562.9
[DOCKER] #25 563.3 warning: field `config` is never read
[DOCKER] #25 563.3   --> crates/api/src/state.rs:18:9
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 11 | pub struct AppState {
[DOCKER] #25 563.3    |            -------- field in this struct
[DOCKER] #25 563.3 ...
[DOCKER] #25 563.3 18 |     pub config: Arc<AppConfig>,
[DOCKER] #25 563.3    |         ^^^^^^
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3    = note: `AppState` has a derived impl for the trait `Clone`, but this is intentionally ignored during dead code analysis
[DOCKER] #25 563.3    = note: `#[warn(dead_code)]` (part of `#[warn(unused)]`) on by default
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: fields `version`, `api_enabled`, `mcp_enabled`, `github_api_version`, and `is_production` are never read
[DOCKER] #25 563.3   --> crates/api/src/state.rs:26:9
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 24 | pub struct AppConfig {
[DOCKER] #25 563.3    |            --------- fields in this struct
[DOCKER] #25 563.3 25 |     /// Tətbiq versiyası (Coolify: constants.coolify.version)
[DOCKER] #25 563.3 26 |     pub version: String,
[DOCKER] #25 563.3    |         ^^^^^^^
[DOCKER] #25 563.3 ...
[DOCKER] #25 563.3 29 |     pub api_enabled: bool,
[DOCKER] #25 563.3    |         ^^^^^^^^^^^
[DOCKER] #25 563.3 ...
[DOCKER] #25 563.3 32 |     pub mcp_enabled: bool,
[DOCKER] #25 563.3    |         ^^^^^^^^^^^
[DOCKER] #25 563.3 ...
[DOCKER] #25 563.3 35 |     pub github_api_version: String,
[DOCKER] #25 563.3    |         ^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3 ...
[DOCKER] #25 563.3 38 |     pub is_production: bool,
[DOCKER] #25 563.3    |         ^^^^^^^^^^^^^
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3    = note: `AppConfig` has derived impls for the traits `Clone` and `Debug`, but these are intentionally ignored during dead code analysis
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: constant `MEMBER_DISALLOWED_ABILITIES` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/auth.rs:13:7
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 13 | const MEMBER_DISALLOWED_ABILITIES: &[&str] = &[
[DOCKER] #25 563.3    |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `auth_middleware` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/auth.rs:21:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 21 | pub async fn auth_middleware(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `encrypt_cookies_middleware` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/encrypt_cookies.rs:12:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 12 | pub async fn encrypt_cookies_middleware(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `ensure_mcp_enabled` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/ensure_mcp_enabled.rs:16:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 16 | pub async fn ensure_mcp_enabled(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `ensure_team_mcp_enabled` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/ensure_team_mcp_enabled.rs:17:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub async fn ensure_team_mcp_enabled(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `ensure_token_belongs_to_current_team_member` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/ensure_token_belongs_to_current_team_member.rs:18:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 18 | pub async fn ensure_token_belongs_to_current_team_member(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `prevent_requests_during_maintenance` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/prevent_requests_during_maintenance.rs:17:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub async fn prevent_requests_during_maintenance(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `redirect_if_authenticated` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/redirect_if_authenticated.rs:20:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 20 | pub async fn redirect_if_authenticated(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `trim_strings` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/trim_strings.rs:17:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub async fn trim_strings(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `trim_string` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/trim_strings.rs:30:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 30 | pub fn trim_string<'de, D>(deserializer: D) -> Result<String, D::Error>
[DOCKER] #25 563.3    |        ^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `trim_option_string` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/trim_strings.rs:40:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 40 | pub fn trim_option_string<'de, D>(deserializer: D) -> Result<Option<String>, D::Error>
[DOCKER] #25 563.3    |        ^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `trust_hosts` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/trust_hosts.rs:17:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub async fn trust_hosts(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `trust_proxies` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/trust_proxies.rs:19:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 19 | pub async fn trust_proxies(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `extract_real_ip` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/trust_proxies.rs:30:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 30 | pub fn extract_real_ip(headers: &axum::http::HeaderMap, fallback: String) -> String {
[DOCKER] #25 563.3    |        ^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `validate_signature` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/validate_signature.rs:18:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 18 | pub async fn validate_signature(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `verify_csrf_token` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/verify_csrf_token.rs:18:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 18 | pub async fn verify_csrf_token(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `generate_csrf_token` is never used
[DOCKER] #25 563.3   --> crates/api/src/middleware/verify_csrf_token.rs:29:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 29 | pub fn generate_csrf_token() -> String {
[DOCKER] #25 563.3    |        ^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `get_server_domains` is never used
[DOCKER] #25 563.3    --> crates/api/src/routes/servers.rs:181:14
[DOCKER] #25 563.3     |
[DOCKER] #25 563.3 181 | pub async fn get_server_domains(
[DOCKER] #25 563.3     |              ^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: struct `ProjectResponse` is never constructed
[DOCKER] #25 563.3   --> crates/api/src/routes/projects.rs:24:12
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 24 | pub struct ProjectResponse {
[DOCKER] #25 563.3    |            ^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `delete_service` is never used
[DOCKER] #25 563.3    --> crates/api/src/routes/services.rs:175:14
[DOCKER] #25 563.3     |
[DOCKER] #25 563.3 175 | pub async fn delete_service(
[DOCKER] #25 563.3     |              ^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `start_service_handler` is never used
[DOCKER] #25 563.3    --> crates/api/src/routes/services.rs:193:14
[DOCKER] #25 563.3     |
[DOCKER] #25 563.3 193 | pub async fn start_service_handler(
[DOCKER] #25 563.3     |              ^^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `stop_service_handler` is never used
[DOCKER] #25 563.3    --> crates/api/src/routes/services.rs:206:14
[DOCKER] #25 563.3     |
[DOCKER] #25 563.3 206 | pub async fn stop_service_handler(
[DOCKER] #25 563.3     |              ^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: fields `action`, `number`, and `commits` are never read
[DOCKER] #25 563.3   --> crates/api/src/routes/webhooks.rs:20:9
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 16 | pub struct WebhookPayload {
[DOCKER] #25 563.3    |            -------------- fields in this struct
[DOCKER] #25 563.3 ...
[DOCKER] #25 563.3 20 |     pub action: Option<String>,
[DOCKER] #25 563.3    |         ^^^^^^
[DOCKER] #25 563.3 21 |     pub number: Option<i64>,
[DOCKER] #25 563.3    |         ^^^^^^
[DOCKER] #25 563.3 22 |     pub pull_request: Option<PullRequestPayload>,
[DOCKER] #25 563.3 23 |     pub commits: Option<Vec<CommitPayload>>,
[DOCKER] #25 563.3    |         ^^^^^^^
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3    = note: `WebhookPayload` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: fields `html_url`, `title`, and `base` are never read
[DOCKER] #25 563.3   --> crates/api/src/routes/webhooks.rs:33:9
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 32 | pub struct PullRequestPayload {
[DOCKER] #25 563.3    |            ------------------ fields in this struct
[DOCKER] #25 563.3 33 |     pub html_url: Option<String>,
[DOCKER] #25 563.3    |         ^^^^^^^^
[DOCKER] #25 563.3 34 |     pub title: Option<String>,
[DOCKER] #25 563.3    |         ^^^^^
[DOCKER] #25 563.3 35 |     pub head: Option<GitRef>,
[DOCKER] #25 563.3 36 |     pub base: Option<GitRef>,
[DOCKER] #25 563.3    |         ^^^^
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3    = note: `PullRequestPayload` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: field `sha` is never read
[DOCKER] #25 563.3   --> crates/api/src/routes/webhooks.rs:43:9
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 40 | pub struct GitRef {
[DOCKER] #25 563.3    |            ------ field in this struct
[DOCKER] #25 563.3 ...
[DOCKER] #25 563.3 43 |     pub sha: Option<String>,
[DOCKER] #25 563.3    |         ^^^
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3    = note: `GitRef` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: fields `message`, `added`, `removed`, and `modified` are never read
[DOCKER] #25 563.3   --> crates/api/src/routes/webhooks.rs:48:9
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 47 | pub struct CommitPayload {
[DOCKER] #25 563.3    |            ------------- fields in this struct
[DOCKER] #25 563.3 48 |     pub message: Option<String>,
[DOCKER] #25 563.3    |         ^^^^^^^
[DOCKER] #25 563.3 49 |     pub added: Option<Vec<String>>,
[DOCKER] #25 563.3    |         ^^^^^
[DOCKER] #25 563.3 50 |     pub removed: Option<Vec<String>>,
[DOCKER] #25 563.3    |         ^^^^^^^
[DOCKER] #25 563.3 51 |     pub modified: Option<Vec<String>>,
[DOCKER] #25 563.3    |         ^^^^^^^^
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3    = note: `CommitPayload` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `api_error` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/controller.rs:10:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 10 | pub fn api_error(status: StatusCode, message: &str) -> (StatusCode, Json<serde_json::Value>) {     
[DOCKER] #25 563.3    |        ^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `api_success` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/controller.rs:15:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 15 | pub fn api_success(message: &str) -> Json<serde_json::Value> {
[DOCKER] #25 563.3    |        ^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `invalid_token_response` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/controller.rs:20:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 20 | pub fn invalid_token_response() -> (StatusCode, Json<serde_json::Value>) {
[DOCKER] #25 563.3    |        ^^^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `not_found_response` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/controller.rs:25:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 25 | pub fn not_found_response(resource: &str) -> (StatusCode, Json<serde_json::Value>) {
[DOCKER] #25 563.3    |        ^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `validation_error` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/controller.rs:30:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 30 | pub fn validation_error(errors: &str) -> (StatusCode, Json<serde_json::Value>) {
[DOCKER] #25 563.3    |        ^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `paginate` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/controller.rs:35:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 35 | pub fn paginate(skip: Option<i64>, take: Option<i64>) -> (i64, i64) {
[DOCKER] #25 563.3    |        ^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: struct `OAuthCallbackQuery` is never constructed
[DOCKER] #25 563.3   --> crates/api/src/routes/oauth_controller.rs:16:12
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 16 | pub struct OAuthCallbackQuery {
[DOCKER] #25 563.3    |            ^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/oauth_controller.rs:22:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 22 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `oauth_redirect` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/oauth_controller.rs:32:10
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 32 | async fn oauth_redirect(
[DOCKER] #25 563.3    |          ^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `oauth_callback` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/oauth_controller.rs:72:10
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 72 | async fn oauth_callback(
[DOCKER] #25 563.3    |          ^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/upload_controller.rs:14:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 14 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `upload_private_key` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/upload_controller.rs:22:10
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 22 | async fn upload_private_key(
[DOCKER] #25 563.3    |          ^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/applications_controller.rs:19:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 19 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/cloud_provider_tokens_controller.rs:17:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/databases_controller.rs:15:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 15 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/deploy_controller.rs:16:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 16 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/destinations_controller.rs:17:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/digital_ocean_controller.rs:17:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/github_controller.rs:17:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/hetzner_controller.rs:17:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/open_api.rs:15:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 15 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/other_controller.rs:17:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/project_controller.rs:20:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 20 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/resources_controller.rs:15:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 15 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/scheduled_tasks_controller.rs:19:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 19 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/security_controller.rs:17:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/sentinel_controller.rs:16:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 16 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/servers_controller.rs:21:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 21 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/service_applications_controller.rs:17:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/service_databases_controller.rs:17:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/services_controller.rs:22:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 22 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/tags_controller.rs:16:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 16 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/team_controller.rs:17:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/volume_backups_controller.rs:17:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/vultr_controller.rs:17:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: struct `TagAttachRequest` is never constructed
[DOCKER] #25 563.3   --> crates/api/src/routes/api/concerns/handles_tags_api.rs:16:12
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 16 | pub struct TagAttachRequest {
[DOCKER] #25 563.3    |            ^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `list_tags_for_resource` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/concerns/handles_tags_api.rs:21:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 21 | pub async fn list_tags_for_resource(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `update_tags_for_resource` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/api/concerns/handles_tags_api.rs:44:14
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 44 | pub async fn update_tags_for_resource(
[DOCKER] #25 563.3    |              ^^^^^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/webhook/bitbucket.rs:11:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 11 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `handle_webhook` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/webhook/bitbucket.rs:17:10
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | async fn handle_webhook(
[DOCKER] #25 563.3    |          ^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/webhook/gitea.rs:11:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 11 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `handle_webhook` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/webhook/gitea.rs:17:10
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | async fn handle_webhook(
[DOCKER] #25 563.3    |          ^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/webhook/github.rs:11:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 11 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `handle_webhook` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/webhook/github.rs:17:10
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | async fn handle_webhook(
[DOCKER] #25 563.3    |          ^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/webhook/gitlab.rs:11:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 11 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `handle_webhook` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/webhook/gitlab.rs:17:10
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | async fn handle_webhook(
[DOCKER] #25 563.3    |          ^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `router` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/webhook/stripe.rs:11:8
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 11 | pub fn router(state: AppState) -> Router {
[DOCKER] #25 563.3    |        ^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `handle_webhook` is never used
[DOCKER] #25 563.3   --> crates/api/src/routes/webhook/stripe.rs:17:10
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 17 | async fn handle_webhook(
[DOCKER] #25 563.3    |          ^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `should_skip_deploy` is never used
[DOCKER] #25 563.3  --> crates/api/src/routes/webhook/concerns/detects_skip_deploy_commits.rs:4:8
[DOCKER] #25 563.3   |
[DOCKER] #25 563.3 4 | pub fn should_skip_deploy(commit_message: &str) -> bool {
[DOCKER] #25 563.3   |        ^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: function `find_application_by_webhook_token` is never used
[DOCKER] #25 563.3  --> crates/api/src/routes/webhook/concerns/matches_manual_webhook_applications.rs:5:14
[DOCKER] #25 563.3   |
[DOCKER] #25 563.3 5 | pub async fn find_application_by_webhook_token(
[DOCKER] #25 563.3   |              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: struct `DeployLogEntry` is never constructed
[DOCKER] #25 563.3   --> crates/api/src/websocket/deploy_log.rs:21:12
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 21 | pub struct DeployLogEntry {
[DOCKER] #25 563.3    |            ^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: fields `deployment_uuid` and `token` are never read
[DOCKER] #25 563.3   --> crates/api/src/websocket/deploy_log.rs:38:9
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 36 | pub struct DeployLogQuery {
[DOCKER] #25 563.3    |            -------------- fields in this struct
[DOCKER] #25 563.3 37 |     /// Qoşulacaq deployment-in UUID-si
[DOCKER] #25 563.3 38 |     pub deployment_uuid: Option<String>,
[DOCKER] #25 563.3    |         ^^^^^^^^^^^^^^^
[DOCKER] #25 563.3 39 |     /// Authentication token
[DOCKER] #25 563.3 40 |     pub token: Option<String>,
[DOCKER] #25 563.3    |         ^^^^^
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3    = note: `DeployLogQuery` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: field `token` is never read
[DOCKER] #25 563.3   --> crates/api/src/websocket/terminal.rs:21:9
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 19 | pub struct TerminalQuery {
[DOCKER] #25 563.3    |            ------------- field in this struct
[DOCKER] #25 563.3 20 |     /// Authentication token
[DOCKER] #25 563.3 21 |     pub token: Option<String>,
[DOCKER] #25 563.3    |         ^^^^^
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3    = note: `TerminalQuery` has a derived impl for the trait `Debug`, but this is intentionally ignored during dead code analysis
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: struct `CreateServerDto` is never constructed
[DOCKER] #25 563.3  --> crates/api/src/dto/mod.rs:8:12
[DOCKER] #25 563.3   |
[DOCKER] #25 563.3 8 | pub struct CreateServerDto {
[DOCKER] #25 563.3   |            ^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: struct `UpdateServerDto` is never constructed
[DOCKER] #25 563.3   --> crates/api/src/dto/mod.rs:20:12
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 20 | pub struct UpdateServerDto {
[DOCKER] #25 563.3    |            ^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: struct `CreateApplicationDto` is never constructed
[DOCKER] #25 563.3   --> crates/api/src/dto/mod.rs:33:12
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 33 | pub struct CreateApplicationDto {
[DOCKER] #25 563.3    |            ^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: struct `UpdateApplicationDto` is never constructed
[DOCKER] #25 563.3   --> crates/api/src/dto/mod.rs:45:12
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 45 | pub struct UpdateApplicationDto {
[DOCKER] #25 563.3    |            ^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: struct `CreateDatabaseDto` is never constructed
[DOCKER] #25 563.3   --> crates/api/src/dto/mod.rs:56:12
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 56 | pub struct CreateDatabaseDto {
[DOCKER] #25 563.3    |            ^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: struct `DeploymentTriggerDto` is never constructed
[DOCKER] #25 563.3   --> crates/api/src/dto/mod.rs:66:12
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 66 | pub struct DeploymentTriggerDto {
[DOCKER] #25 563.3    |            ^^^^^^^^^^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 563.3 warning: struct `ApiResponse` is never constructed
[DOCKER] #25 563.3   --> crates/api/src/dto/mod.rs:73:12
[DOCKER] #25 563.3    |
[DOCKER] #25 563.3 73 | pub struct ApiResponse<T> {
[DOCKER] #25 563.3    |            ^^^^^^^^^^^
[DOCKER] #25 563.3
[DOCKER] #25 664.5 error: linking with `cc` failed: exit status: 1
[DOCKER] #25 664.5   |
[DOCKER] #25 664.5   = note:  "cc" "-m64" "<sysroot>/lib/rustlib/x86_64-unknown-linux-musl/lib/self-contained/rcrt1.o" "<sysroot>/lib/rustlib/x86_64-unknown-linux-musl/lib/self-contained/crti.o" "<sysroot>/lib/rustlib/x86_64-unknown-linux-musl/lib/self-contained/crtbeginS.o" "/app/target/release/deps/rustcUuga3i/symbols.o" "<17 object files omitted>" "-Wl,--as-needed" "-Wl,-Bstatic" "/app/target/release/deps/{librc_db-6a26ff28e7cf38e6,libtracing_subscriber-c15835283126e284,libsharded_slab-cfb1e1a8f88be954,liblazy_static-c8360287d80b1103,libmatchers-11c9bbd9df7eb850,libregex_automata-633413a8698e7f7f,libaho_corasick-c1e375c8b50daf5f,libregex_syntax-0e69c3e70a959f1c,libnu_ansi_term-496ed13be31e0ca8,libthread_local-3f1e0eb22cb4cca6,libtracing_log-87b594ec8d213330,libtower_http-847b45f00084a4bc,libmime_guess-bb1f3e89595449b0,libunicase-be99ec16bcfc7ef6,libhttp_range_header-429221db71ab1a5e,librc_auth-99467fdaa8bbfa25,libreqwest-5a5ad37c697ad566,librustls_pemfile-7b3884ca56dfc6dc,libhyper_tls-ccd5f8584cac4210,libbase64-7c6d1deb0773f5db,libtokio_native_tls-d3d3432b8e52eb9d,libnative_tls-7b41536411fdf284,libopenssl_probe-1886d89572e0f77b,libopenssl-0ff13928aef6cfe2,libforeign_types-280f8c6ee096f673,libforeign_types_shared-7d546dfe8ba874d6,libopenssl_sys-a3de92722a651c23}.rlib" "-lssl" "-lcrypto" "/app/target/release/deps/{libhyper-431e67ee1d3bb7ec,libsocket2-9c6a2b591b0bc630,libh2-a708fb00e6b331b6,libsync_wrapper-57dc50b260bd989b,libhttp_body-f18152e53633ac40,libhttp-3aeae82364090d57,libanyhow-37a12e475853e661,libsqlx-8b7ce3b4ce9df7e4,libsqlx_postgres-a2e5ecb118327dc2,libdotenvy-ffabd972f813c349,libcrc-67329f345af4aac8,libcrc_catalog-f40195c7a1d92fbe,libhex-a3df04c52ee38a63,libwhoami-cb87f048b2f34ca2,libhome-facff60ddb6e3f8f,libbitflags-b3d9dc95539234b6,libmd5-6a4ba05f865fb327,libatoi-53609ae74db6dfe9,libstringprep-645c886e67afe1d4,libunicode_properties-6e802eefb192c156,libunicode_normalization-ef68c9e1fd76dd3a,libtinyvec-ebea8324571e6f37,libtinyvec_macros-209cfaa82fd38547,libunicode_bidi-bd7a6c45a47aaecb,libhkdf-590e383ecf605750,libhmac-da75440e135bcb4c,libsqlx_core-e35ce416ed04c7ed,libwebpki_roots-8e22e8fe352b20da,libwebpki_roots-060e154fe5c7a6ec,libthiserror-b029b2c08d29dc8c,libsha2-efd64a6e196fe8b3,librustls-55393637dca3628e,libwebpki-43932e0b807b49f7,libring-3e1868b0990b83d5,libuntrusted-4f7dc214014f0639,librustls_pki_types-95e95b456e13e44e,libzeroize-a55468847289c973,libhashlink-3dac2ce8ef914e3a,libhashbrown-1681b9a3f088b010,libfoldhash-2dc9ae2d6da4299a,liballocator_api2-e5a5d3fa9157bdc1,liburl-cec96090a109e372,libidna-17a535123fe84642,libidna_adapter-c54402e6db6bc9d5,libicu_properties-03243c27b4f89e2b,libicu_properties_data-66a0c965af93cb04,libicu_normalizer-60428aa3fb6b7f01,libicu_normalizer_data-2eac5de27375c7d8,libicu_collections-502e53b406de8c56,libutf8_iter-7d879d3739abddfd,libpotential_utf-74930b6983173d57,libicu_provider-b9140116b1925b9b,libicu_locale_core-a562e23d51368b2f,libtinystr-f9a172952e2ba42d,liblitemap-1cbeca73dea6bb5d,libwriteable-e87a4b3030da08bc,libzerovec-05f38dbaa55236fa,libzerotrie-35c2813df3cfdf79,libyoke-d31605baabe0a91e,libstable_deref_trait-8130ef896d7fa33a,libzerofrom-380852e2dc557c9d,libcrossbeam_queue-33c3bf63b46a0781,libcrossbeam_utils-566828fa449072d3,libeither-c4ac617cad1293e2,libevent_listener-5b78dac53b811b8e,libparking-95920b4ea3a74b06,libchrono-9ac9ec802182f8de,libiana_time_zone-6616298b23c27809,libnum_traits-e1a1c6e004ddf7ee,libuuid-a61c35f2868fd93e,libgetrandom-b773175b6b171488,libargon2-79571dcf5320cf10,libblake2-bfcee91b12a005cd,libpassword_hash-f688aa895e64a682,libbase64ct-e7227ac4bf09a08b,libaxum-020492663cca2b0f,libmulter-f9a6cdf49859a8ed,libspin-987afaac46d52bad,libencoding_rs-7dd0685b7eff4b0a,libserde_path_to_error-64227e904c2c6dd7,libserde_json-277b26b71156d625,libzmij-3a4c08d46b682808,libserde_urlencoded-4c8c273b48ce151e,libryu-98b2e21ff8488abf,libform_urlencoded-0305b3f354f25b8a,libmatchit-7b10ebb5a6b71af8,libtokio_tungstenite-cfa652a28df9c86c,libtungstenite-658523a29dc7e406,libdata_encoding-04a0ffd9cd2c96d4,librand-6a973fbc8b7b7f8e,librand_chacha-3bb931319de0ecc1,libppv_lite86-9fa8393e9768b575,libzerocopy-b2e04f25ba99eb89,librand_core-9a2a8dbf759b2a99,libgetrandom-e7a24b4e30ce1505,libutf8-277d549d34887ef6,libbyteorder-ac0cd5ba498a9620,libthiserror-66db44b9daefd196,libsha1-44e17d472b5db0e0,libcpufeatures-01d9d350a707dd91,libdigest-a5d1d061ae85ef0b,libsubtle-0426b90ae6952a30,libblock_buffer-444297714b14ca36,libcrypto_common-d64415a5f0a35fbb,libgeneric_array-e762f5645a29af7d,libtypenum-22a202def5669bbf,libhyper_util-f31b467ce37434ac,libbase64-5568722d951d59cf,libpercent_encoding-df5df54993f67e42,libipnet-7e862e51d96be535,libhyper-44d1454492426e11,libwant-8c12feefd4a2fc18,libtry_lock-c85c935fbb7a5974,libhttparse-14d4c6521bc75bfb,libh2-26fbe3f17a5ce53e,libindexmap-828c5176dd42434b,libequivalent-2fae05ec90dda6b5,libhashbrown-e98d66ccbfff7f45,libfnv-886d605a28ff5df8,libtokio_util-d3384af6e442c127,libatomic_waker-5982527fc76cf531,libhttpdate-5fb3a19d6a3e8e48,libfutures_channel-0945c83e24aa640f,libaxum_core-fc9fe8978f086dca,libmime-b9013d67950ee37d,libhttp_body_util-f6f593d663a6cc1e,libhttp_body-6a03e0974379895f,libhttp-71ddff959cc9d51a,libitoa-013f96b7280c58a7,libtracing-5a03cec4ed85873f,liblog-f3b1936d122d8edc,libtracing_core-8701e99e5d461186,libonce_cell-19c7667277bee6d4,libtower-30944a5816535ae3,libsync_wrapper-94c51ca02c1b419b,libfutures_util-10ae32781851e52d,libmemchr-771d0875f1f5c284,libfutures_io-39045ab5ddaf961e,libslab-41b89e835357bb80,libfutures_sink-5ecec62d14a1161d,libfutures_task-b7a5a0298adc57e1,libfutures_core-2071a6f0b2d59d98,libtower_layer-af3f479e44fcdda4,libtower_service-ffb18e65717216db,libtokio-847e8456bbe01844,libsignal_hook_registry-dbd443112288f739,liberrno-07f17f689dcbf436,libsocket2-59e5e6ff41b11bc7,libbytes-67a7b490a549bc64,libmio-6d8c8b420882f896,libparking_lot-5d2a802382fda689,libparking_lot_core-2eb7e22390e9f90a,liblibc-0b66a21deb618282,libcfg_if-4bd3cfcf2a50c425,libsmallvec-3b0c3b4f22cf2295,libserde-80b430dcb4974b20,libserde_core-f0898f89d1334b2e,liblock_api-581dfe1a85e9fbd9,libscopeguard-a610d12a056adf43,libpin_project_lite-8dfe61ce258f3897}.rlib" "<sysroot>/lib/rustlib/x86_64-unknown-linux-musl/lib/{libstd-*,libpanic_unwind-*,libobject-*,libmemchr-*,libaddr2line-*,libgimli-*,libcfg_if-*,librustc_demangle-*,libstd_detect-*,libhashbrown-*,librustc_std_workspace_alloc-*,libminiz_oxide-*,libadler2-*,libunwind-*}.rlib" "-lunwind" "<sysroot>/lib/rustlib/x86_64-unknown-linux-musl/lib/liblibc-*.rlib" "-lc" "<sysroot>/lib/rustlib/x86_64-unknown-linux-musl/lib/{librustc_std_workspace_core-*,liballoc-*,libcore-*,libcompiler_builtins-*}.rlib" "-L" "/app/target/release/deps/rustcUuga3i/raw-dylibs" "-Wl,-Bdynamic" "-Wl,--eh-frame-hdr" "-Wl,-z,noexecstack" "-nostartfiles" "-L" "/app/target/release/build/ring-9c8f15c6f2e3243e/out" "-L" "/app/target/release/build/libgit2-sys-ea3c675f2deb0dbf/out/build" "-L" "/app/target/release/build/libssh2-sys-ad67f2efbb20b259/out/build" "-L" "/app/target/release/build/libz-sys-5709ac8e7d639bf6/out/lib" "-L" "<sysroot>/lib/rustlib/x86_64-unknown-linux-musl/lib/self-contained" "-L" "<sysroot>/lib/rustlib/x86_64-unknown-linux-musl/lib" "-o" "/app/target/release/deps/rc_api-d2f259bb7bcbe855" "-Wl,--gc-sections" "-static-pie" "-Wl,-z,relro,-z,now" "-Wl,-O1" "-Wl,--strip-debug" "-nodefaultlibs" "<sysroot>/lib/rustlib/x86_64-unknown-linux-musl/lib/self-contained/crtendS.o" "<sysroot>/lib/rustlib/x86_64-unknown-linux-musl/lib/self-contained/crtn.o"
[DOCKER] #25 664.5   = note: some arguments are omitted. use `--verbose` to show all linker arguments
[DOCKER] #25 664.5   = note: /usr/lib/gcc/x86_64-alpine-linux-musl/15.2.0/../../../../x86_64-alpine-linux-musl/bin/ld: cannot find -lssl: No such file or directory
[DOCKER] #25 664.5           /usr/lib/gcc/x86_64-alpine-linux-musl/15.2.0/../../../../x86_64-alpine-linux-musl/bin/ld: have you installed the static version of the ssl library ?
[DOCKER] #25 664.5           /usr/lib/gcc/x86_64-alpine-linux-musl/15.2.0/../../../../x86_64-alpine-linux-musl/bin/ld: cannot find -lcrypto: No such file or directory
[DOCKER] #25 664.5           /usr/lib/gcc/x86_64-alpine-linux-musl/15.2.0/../../../../x86_64-alpine-linux-musl/bin/ld: have you installed the static version of the crypto library ?
[DOCKER] #25 664.5           collect2: error: ld returned 1 exit status
[DOCKER] #25 664.5
[DOCKER] #25 664.5
[DOCKER] #25 664.7 warning: `rc-api` (bin "rc-api") generated 221 warnings
[DOCKER] #25 664.7 error: could not compile `rc-api` (bin "rc-api") due to 1 previous error; 221 warnings emitted
[DOCKER] #25 ERROR: process "/bin/sh -c cargo build --release -p rc-api" did not complete successfully: exit code: 101
[DOCKER] ------
[DOCKER]  > [backend-builder 7/7] RUN cargo build --release -p rc-api:
[DOCKER] 664.5   = note: some arguments are omitted. use `--verbose` to show all linker arguments
[DOCKER] 664.5   = note: /usr/lib/gcc/x86_64-alpine-linux-musl/15.2.0/../../../../x86_64-alpine-linux-musl/bin/ld: cannot find -lssl: No such file or directory
[DOCKER] 664.5           /usr/lib/gcc/x86_64-alpine-linux-musl/15.2.0/../../../../x86_64-alpine-linux-musl/bin/ld: have you installed the static version of the ssl library ?
[DOCKER] 664.5           /usr/lib/gcc/x86_64-alpine-linux-musl/15.2.0/../../../../x86_64-alpine-linux-musl/bin/ld: cannot find -lcrypto: No such file or directory
[DOCKER] 664.5           /usr/lib/gcc/x86_64-alpine-linux-musl/15.2.0/../../../../x86_64-alpine-linux-musl/bin/ld: have you installed the static version of the crypto library ?
[DOCKER] 664.5           collect2: error: ld returned 1 exit status
[DOCKER] 664.5
[DOCKER] 664.5
[DOCKER] 664.7 warning: `rc-api` (bin "rc-api") generated 221 warnings
[DOCKER] 664.7 error: could not compile `rc-api` (bin "rc-api") due to 1 previous error; 221 warnings emitted
[DOCKER] ------
[DOCKER] Dockerfile:11
[DOCKER]
[DOCKER] --------------------
[DOCKER]
[DOCKER]    9 |     COPY migrations ./migrations
[DOCKER]
[DOCKER]   10 |
[DOCKER]
[DOCKER]   11 | >>> RUN cargo build --release -p rc-api
[DOCKER]
[DOCKER]   12 |
[DOCKER]
[DOCKER]   13 |     # 2. Build Stage: Vite Frontend UI
[DOCKER]
[DOCKER] --------------------
[DOCKER]
[DOCKER] failed to solve: process "/bin/sh -c cargo build --release -p rc-api" did not complete successfully: exit code: 101
[DOCKER]
[DOCKER]
[DOCKER]
[DOCKER] View build details: docker-desktop://dashboard/build/default/default/66tabosu2qv7ckskp49mz5bbe
[DOCKER]