# CRATE SPEC: `auth`

## Məqsəd
İstifadəçi autentifikasiyası, API token-lar, OAuth, komanda idarəsi.

## Coolify Referansları
```
e:\MD\coolify-source\app\Models\User.php
e:\MD\coolify-source\app\Models\PersonalAccessToken.php
e:\MD\coolify-source\app\Models\Team.php
e:\MD\coolify-source\app\Models\TeamInvitation.php
e:\MD\coolify-source\app\Models\OauthSetting.php
e:\MD\coolify-source\app\Policies\
e:\MD\coolify-source\routes\api.php  ← auth endpoint-lər
```

## Nə Yazılmalıdır

### `src/token.rs`
```rust
// API token yaratmaq, yoxlamaq, silmək
// Coolify-də: PersonalAccessToken.php
pub fn create_token(user_id: Uuid, name: &str, abilities: Vec<String>) -> (String, ApiToken)
// "rc_" prefix ilə random token
// Token-in hash-i DB-ə yazılır, orijinal bir dəfə göstərilir

pub async fn verify_token(pool: &DbPool, raw_token: &str) -> anyhow::Result<ApiToken>
// Hash hesabla → DB-dən tap → last_used_at yenilə

pub async fn revoke_token(pool: &DbPool, token_id: Uuid) -> anyhow::Result<()>
```

### `src/password.rs`
```rust
// Argon2 şifrə hash/verify
pub fn hash_password(password: &str) -> anyhow::Result<String>
pub fn verify_password(password: &str, hash: &str) -> anyhow::Result<bool>
```

### `src/oauth/github.rs`
```rust
// GitHub OAuth2
// Coolify-də: OauthSetting.php + Http/Controllers/OauthController.php
pub fn github_auth_url(client_id: &str, redirect_uri: &str, state: &str) -> String
pub async fn exchange_code(
    client_id: &str,
    client_secret: &str,
    code: &str,
    redirect_uri: &str,
) -> anyhow::Result<GithubUser>

pub struct GithubUser {
    pub id: i64,
    pub login: String,
    pub email: Option<String>,
    pub name: Option<String>,
}
```

### `src/team/roles.rs`
```rust
// Rol yoxlama
// Coolify-də: Team.php - role methods
pub enum TeamRole { Admin, Member, Viewer }

pub fn can_deploy(role: &TeamRole) -> bool
pub fn can_manage_servers(role: &TeamRole) -> bool
pub fn can_invite_members(role: &TeamRole) -> bool
```

### `src/team/invitation.rs`
```rust
// E-mail dəvət (rc-notify ilə işləyir)
pub async fn invite(
    pool: &DbPool,
    team_id: Uuid,
    email: &str,
    role: TeamRole,
) -> anyhow::Result<TeamInvitation>

pub async fn accept(pool: &DbPool, token: &str) -> anyhow::Result<()>
pub async fn decline(pool: &DbPool, token: &str) -> anyhow::Result<()>
```

## Tamamlandı Sayılır Əgər
- [ ] `cargo build -p rc-auth` keçir
- [ ] API token create/verify/revoke işləyir
- [ ] Password hash/verify işləyir
- [ ] GitHub OAuth flow işləyir
- [ ] Team invitation email göndərilir
- [ ] Unit testlər var
