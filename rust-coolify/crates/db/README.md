# 🗺️ XƏRİTƏ — `crates/db`

> **Agent üçün GPS.** Bu faylı oxu, sonra işə başla.
> Sual yoxdur — hər cavab buradadır.

---

## 📍 Sən Harda Durursun?
`e:\MD\rust-coolify\crates\db\`

## 🎯 Sənin Vəzifən
Bu crate-in bütün Rust modelləri, CRUD repo-ları və DB init-ini yazmaq.
**Başqa crate-ə toxunma.** Yalnız `crates/db/` içinə yaz.

---

## 📖 İŞƏ BAŞLAMADAN ƏVVƏL OXU

### 1. Task siyahısını yoxla
```
e:\MD\rust-coolify\TASKS\db.md
```
`[TODO]` olan task-lardan birini götür.
`[WIP]` olanı götürmə (başqası işləyir).

### 2. Conflict yoxla
```
e:\MD\rust-coolify\WORKING_ON.md
```
Sənin götürdüyün fayl orada varsa — başqasını götür.

### 3. Öz adını qeyd et
`WORKING_ON.md`-ə əlavə et:
```
- [Agent-X] [tarix saat] → crates/db/src/models/server.rs
```

---

## 🔍 HƏR FAYL ÜÇÜN XƏRİTƏ

### `src/models/server.rs` yazacaqsan?
```
1. ƏVVƏLCƏ OXU:
   e:\MD\coolify-source\app\Models\Server.php
   (61KB fayldır — əsas sahələri tap: property-lər, relations)

2. MIGRATION-A BAX:
   e:\MD\rust-coolify\migrations\0005_servers.sql
   (Hansı sütunlar var? Onları struct-a çevir)

3. YAZ:
   e:\MD\rust-coolify\crates\db\src\models\server.rs

4. STRUCT ŞABLONU:
   #[derive(Debug, Clone, sqlx::FromRow, serde::Serialize, serde::Deserialize)]
   pub struct Server { ... }
```

### `src/models/application.rs` yazacaqsan?
```
1. ƏVVƏLCƏ OXU:
   e:\MD\coolify-source\app\Models\Application.php
   (105KB — yalnız $fillable array-ı və $casts-a bax)

2. MIGRATION-A BAX:
   e:\MD\rust-coolify\migrations\0007_applications.sql

3. YAZ:
   e:\MD\rust-coolify\crates\db\src\models\application.rs
```

### `src/models/database.rs` yazacaqsan?
```
1. ƏVVƏLCƏ OXU (hamısını):
   e:\MD\coolify-source\app\Models\StandalonePostgresql.php
   e:\MD\coolify-source\app\Models\StandaloneMysql.php
   e:\MD\coolify-source\app\Models\StandaloneMariadb.php
   e:\MD\coolify-source\app\Models\StandaloneMongodb.php
   e:\MD\coolify-source\app\Models\StandaloneRedis.php
   e:\MD\coolify-source\app\Models\StandaloneKeydb.php
   e:\MD\coolify-source\app\Models\StandaloneClickhouse.php
   e:\MD\coolify-source\app\Models\StandaloneDragonfly.php
   (Hamısı eyni strukturdur, bizim 1 unified struct-da birləşdiririk)

2. MIGRATION-A BAX:
   e:\MD\rust-coolify\migrations\0010_databases.sql

3. YAZ:
   e:\MD\rust-coolify\crates\db\src\models\database.rs
```

### `src/models/service.rs` yazacaqsan?
```
1. ƏVVƏLCƏ OXU:
   e:\MD\coolify-source\app\Models\Service.php  ← 75KB! Çox böyükdür.
   Yalnız bunlara bax:
   - protected $fillable  (hansı sahələr var)
   - protected $casts     (tip çevirmələri)
   - Relation method-ları (hasMany, belongsTo)

2. MIGRATION-A BAX:
   e:\MD\rust-coolify\migrations\0011_services.sql

3. YAZ:
   e:\MD\rust-coolify\crates\db\src\models\service.rs
```

### `src/enums/*.rs` yazacaqsan?
```
1. ƏVVƏLCƏ OXU:
   e:\MD\coolify-source\app\Enums\  (qovluğun içi)
   BuildPackEnum.php, ApplicationDeploymentStatus.php, ProxyTypes.php

2. RUST ENUM ŞABLONU:
   #[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize, sqlx::Type)]
   #[sqlx(type_name = "text", rename_all = "lowercase")]
   pub enum BuildPack { Nixpacks, Dockerfile, DockerCompose, Static }

3. YAZ:
   e:\MD\rust-coolify\crates\db\src\enums\build_pack.rs
```

### `src/repos/server_repo.rs` yazacaqsan?
```
1. ƏVVƏLCƏ OXU:
   e:\MD\coolify-source\app\Http\Controllers\Api\ServersController.php
   (Hansı sorğular var? list, get, create, update, delete)

2. SQLX ŞABLONU:
   pub async fn list_servers(pool: &PgPool, team_id: Uuid) -> anyhow::Result<Vec<Server>> {
       sqlx::query_as::<_, Server>("SELECT * FROM servers WHERE team_id = $1")
           .bind(team_id)
           .fetch_all(pool)
           .await
           .map_err(|e| anyhow::anyhow!("DB error: {}", e))
   }

3. YAZ:
   e:\MD\rust-coolify\crates\db\src\repos\server_repo.rs
```

### `src/lib.rs` yazacaqsan?
```
1. Bu fayl init_db() funksiyasını ehtiva edir:
   - DATABASE_URL env var-ından PgPool yaradır
   - sqlx::migrate!("../../migrations").run(&pool) çağırır
   - pub type DbPool = sqlx::PgPool export edir

2. Bütün modellər və repo-lar pub mod ilə elan edilir

3. Coolify referansı yoxdur — sıfırdan yaz
```

---

## ✅ BİTDİ SAYILIR ƏGƏR

```bash
# Bu əmr xətasız keçsə — crate hazırdır:
cargo build -p rc-db
```

Həmçinin:
- [ ] Bütün model struct-ları `#[derive(sqlx::FromRow)]` var
- [ ] Hər model üçün repo-da ən az create + get + list var
- [ ] `init_db()` funksiyası migration-ları işlədir

---

## 🔄 YARIDA QALDINSA

Bu faylları yenilə:
1. `e:\MD\rust-coolify\TASKS\db.md` → yarıda qalan task-ı `[WIP]` et
2. `e:\MD\rust-coolify\HANDOFF.md` → nə etdiyini + nə qaldığını yaz
3. `e:\MD\rust-coolify\WORKING_ON.md` → öz adını sil

---

## ⚠️ BİLMƏLİSƏN

- **PostgreSQL** istifadə edilir, SQLite yox
- Bütün ID-lər `uuid::Uuid` tipindədir
- Bütün tarixlər `chrono::DateTime<chrono::Utc>` tipindədir
- Workspace asılılıqları `{ workspace = true }` ilə istifadə olunur
- Yeni kitabxana lazımdırsa → kök `Cargo.toml`-a əlavə et, sonra `{ workspace = true }` istifadə et

---

## 📞 SUAL OLARSA

Coolify OpenAPI spec-ə bax:
```
e:\MD\coolify-source\openapi.yaml
```
Bu fayl bütün API strukturunu + model sahələrini göstərir.
