# rc-auth

# completed meta_auth_readme_md

Authentication crate for MasterDeploy (Coolify-compatible).

## Features

- **Password hashing** using Argon2 (matching Coolify's bcrypt semantics)
- **API Token** create/verify/revoke (Sanctum-compatible, "rc_" prefixed)
- **OAuth2** support: GitHub, GitLab, Google
- **Team roles**: Admin, Member, Viewer
- **Team invitations**: invite/accept/decline via email links
- **Authorization Policies**: Server, Team, Application

## Usage

```rust
use rc_auth::password::{hash_password, verify_password};
use rc_auth::token::{create_token, verify_token};
use rc_auth::team::roles::{TeamRole, can_deploy};
```
