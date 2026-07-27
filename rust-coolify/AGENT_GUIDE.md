# Agent İş Qaydaları (AGENT_GUIDE.md)

## Sən Nə Etməlisən?

Bu sənədi oxuyan agent MasterDeploy layihəsinin bir hissəsini yazır.
Hər agent yalnız **bir crate** üçün məsuldur.

---

## Başlamadan Əvvəl MÜTLƏQq Oxu

1. `MASTER_PLAN.md` — ümumi arxitektura
2. `PROGRESS.md` — nə bitib, nə davam edir
3. `CRATE_SPECS/<crate-adı>.md` — sənin crate-inin spesifikasiyası
4. `e:\MD\coolify-source\app\` — Coolify PHP mənbəyi (referans)

---

## Coolify Referansından Necə İstifadə Etmək

Hər crate spesifikasiyasında **"Coolify Referansı"** bölməsi var.
Bu bölmədə PHP faylının yolu göstərilir.
O faylı oxu → Rust-da eyni funksiyanı yaz.

**Nümunə:**
```
Coolify referansı: e:\MD\coolify-source\app\Actions\Server\InstallDocker.php
Bizim fayl:        e:\MD\rust-coolify\crates\core\src\system\install.rs
```

---

## Kod Yazma Qaydaları

### 1. Hər funksiya async olmalıdır
```rust
// ✅ Düzgün
pub async fn install_docker(ssh: &SshClient) -> anyhow::Result<String> { ... }

// ❌ Yanlış
pub fn install_docker(ssh: &SshClient) -> String { ... }
```

### 2. Xəta idarəsi — thiserror + anyhow
```rust
// Crate-daxili xətalar üçün thiserror:
#[derive(thiserror::Error, Debug)]
pub enum DeployError {
    #[error("Git clone failed: {0}")]
    GitClone(String),
    #[error("Build failed: {0}")]
    Build(String),
}

// Funksiyalarda anyhow::Result:
pub async fn deploy() -> anyhow::Result<()> { ... }
```

### 3. Tracing (log)
```rust
use tracing::{info, warn, error, debug};

info!("Deploying application: {}", app_name);
error!("SSH connection failed: {}", e);
```

### 4. Serde — bütün modellər
```rust
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, sqlx::FromRow)]
pub struct Server {
    pub id: uuid::Uuid,
    pub name: String,
    // ...
}
```

### 5. Workspace asılılıqları
```toml
# Cargo.toml-da workspace asılılıqları belə istifadə edilir:
tokio = { workspace = true }
# Yeni asılılıq lazımdırsa əvvəlcə kök Cargo.toml-a əlavə et
```

---

## Hər Crate-in Sonu Nə Olmalıdır?

Crate bitmiş sayılır əgər:
- [ ] Bütün `mod.rs` faylları real kod ehtiva edir (yalnız comment yox)
- [ ] `cargo build` xətasız keçir
- [ ] Əsas funksiyalar üçün unit testlər var
- [ ] `PROGRESS.md`-də "✅ Bitdi" işarəsi var

---

## Test Yazma Qaydası

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_something() {
        // arrange
        // act
        // assert
    }
}
```

---

## Fayl Yaratma Sırası (Hər Crate üçün)

```
1. Cargo.toml        ← asılılıqlar
2. src/lib.rs        ← pub mod bəyanatları
3. src/errors.rs     ← thiserror xətaları
4. src/models/ (varsa) ← data strukturları
5. src/<modul>/mod.rs ← alt modul bəyanatları
6. src/<modul>/<fayl>.rs ← real implementasiya
7. testlər           ← hər funksiya üçün
```

---

## Coolify PHP → Rust Uyğunluq Cədvəli

| PHP konsept | Rust qarşılığı |
|-------------|----------------|
| `class Foo` | `struct Foo` + `impl Foo` |
| `interface Bar` | `trait Bar` |
| `enum Status` | `enum Status` |
| `$this->db->query()` | `sqlx::query!()` |
| `Job::dispatch()` | `tokio::spawn()` |
| `Event::fire()` | channel `tx.send()` |
| `Cache::get()` | `HashMap` / Redis client |
| `Log::info()` | `tracing::info!()` |
| `throw new Exception` | `anyhow::bail!()` |
| `try/catch` | `Result<T, E>` + `?` |
| `async/await` (PHP Fibers) | `async/await` (tokio) |

---

## PROGRESS.md Necə Yenilənir

Crate-i bitirdikdən sonra `PROGRESS.md`-i yenilə:

```markdown
## crates/core
- [x] ssh/client.rs
- [x] ssh/multiplexer.rs
- [ ] docker/container.rs   ← hələ davam edir
```

---

## Suallar Olarsa

1. Coolify PHP faylına bax: `e:\MD\coolify-source\app\`
2. Crate spesifikasiyasına bax: `e:\MD\rust-coolify\CRATE_SPECS\`
3. OpenAPI spec-ə bax: `e:\MD\coolify-source\openapi.yaml`
