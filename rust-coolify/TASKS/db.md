# TASKS — `db` Crate

> Hər sətir bir fayldır.
> Status: [TODO] = başlanmayıb | [WIP] = işlənir | [DONE] = bitib | [BLOCKED] = problem var

**Crate xəritəsi:** `crates/db/README.md` — ƏVVƏLCƏ ONU OXU

---

## 1. Lib + Init

| Status | Fayl | Coolify Mənbəyi |
|--------|------|-----------------|
| [TODO] | `src/lib.rs` | — (yenidən yaz, `init_db()` PostgreSQL + migrate) |

## 2. Enums

| Status | Fayl | Coolify Mənbəyi |
|--------|------|-----------------|
| [TODO] | `src/enums/build_pack.rs` | `coolify-source/app/Enums/BuildPackEnum.php` |
| [TODO] | `src/enums/deploy_status.rs` | `coolify-source/app/Enums/ApplicationDeploymentStatus.php` |
| [TODO] | `src/enums/proxy_type.rs` | `coolify-source/app/Enums/ProxyTypes.php` |
| [TODO] | `src/enums/database_engine.rs` | `coolify-source/app/Enums/` |
| [TODO] | `src/enums/notification_channel.rs` | `coolify-source/app/Enums/` |

## 3. Models

| Status | Fayl | Coolify Mənbəyi |
|--------|------|-----------------|
| [TODO] | `src/models/user.rs` | `coolify-source/app/Models/User.php` |
| [TODO] | `src/models/team.rs` | `coolify-source/app/Models/Team.php` |
| [TODO] | `src/models/api_token.rs` | `coolify-source/app/Models/PersonalAccessToken.php` |
| [TODO] | `src/models/private_key.rs` | `coolify-source/app/Models/PrivateKey.php` |
| [TODO] | `src/models/server.rs` | `coolify-source/app/Models/Server.php` |
| [TODO] | `src/models/server_setting.rs` | `coolify-source/app/Models/ServerSetting.php` |
| [TODO] | `src/models/project.rs` | `coolify-source/app/Models/Project.php` |
| [TODO] | `src/models/environment.rs` | `coolify-source/app/Models/Environment.php` |
| [TODO] | `src/models/application.rs` | `coolify-source/app/Models/Application.php` |
| [TODO] | `src/models/application_setting.rs` | `coolify-source/app/Models/ApplicationSetting.php` |
| [TODO] | `src/models/deployment.rs` | `coolify-source/app/Models/ApplicationDeploymentQueue.php` |
| [TODO] | `src/models/env_variable.rs` | `coolify-source/app/Models/EnvironmentVariable.php` |
| [TODO] | `src/models/shared_env_variable.rs` | `coolify-source/app/Models/SharedEnvironmentVariable.php` |
| [TODO] | `src/models/database.rs` | `coolify-source/app/Models/StandalonePostgresql.php` (+ digər 7) |
| [TODO] | `src/models/service.rs` | `coolify-source/app/Models/Service.php` |
| [TODO] | `src/models/service_app.rs` | `coolify-source/app/Models/ServiceApplication.php` |
| [TODO] | `src/models/service_db.rs` | `coolify-source/app/Models/ServiceDatabase.php` |
| [TODO] | `src/models/storage.rs` | `coolify-source/app/Models/S3Storage.php` |
| [TODO] | `src/models/scheduled_backup.rs` | `coolify-source/app/Models/ScheduledDatabaseBackup.php` |
| [TODO] | `src/models/scheduled_task.rs` | `coolify-source/app/Models/ScheduledTask.php` |
| [TODO] | `src/models/tag.rs` | `coolify-source/app/Models/Tag.php` |
| [TODO] | `src/models/ssl_cert.rs` | `coolify-source/app/Models/SslCertificate.php` |
| [TODO] | `src/models/notification_settings.rs` | `coolify-source/app/Models/*NotificationSettings.php` |
| [TODO] | `src/models/instance_settings.rs` | `coolify-source/app/Models/InstanceSettings.php` |
| [TODO] | `src/models/volume_backup.rs` | `coolify-source/app/Models/ScheduledVolumeBackup.php` |
| [TODO] | `src/models/cloud_provider.rs` | `coolify-source/app/Models/CloudProviderToken.php` |

## 4. Repos (CRUD sorğuları)

| Status | Fayl | Nə edir |
|--------|------|---------|
| [TODO] | `src/repos/server_repo.rs` | Server create/get/list/update/delete |
| [TODO] | `src/repos/app_repo.rs` | Application CRUD |
| [TODO] | `src/repos/deploy_repo.rs` | Deployment queue idarəsi |
| [TODO] | `src/repos/project_repo.rs` | Project + Environment CRUD |
| [TODO] | `src/repos/user_repo.rs` | User + Team CRUD |
| [TODO] | `src/repos/db_repo.rs` | Database container CRUD |
| [TODO] | `src/repos/service_repo.rs` | One-click service CRUD |

## 5. Migrations (SQL fayllar)

| Status | Fayl | Qeyd |
|--------|------|------|
| [DONE] | `migrations/0001_users.sql` | Yaradıldı, yoxlanmayıb |
| [DONE] | `migrations/0002_teams.sql` | Yaradıldı, yoxlanmayıb |
| [DONE] | `migrations/0003_api_tokens.sql` | Yaradıldı |
| [DONE] | `migrations/0004_private_keys.sql` | Yaradıldı |
| [DONE] | `migrations/0005_servers.sql` | Yaradıldı |
| [DONE] | `migrations/0006_projects.sql` | Yaradıldı |
| [DONE] | `migrations/0007_applications.sql` | Yaradıldı |
| [DONE] | `migrations/0008_deployments.sql` | Yaradıldı |
| [DONE] | `migrations/0009_env_variables.sql` | Yaradıldı |
| [DONE] | `migrations/0010_databases.sql` | Yaradıldı |
| [DONE] | `migrations/0011_services.sql` | Yaradıldı |
| [DONE] | `migrations/0012_s3_storage.sql` | Yaradıldı |
| [DONE] | `migrations/0013_scheduled_backups.sql` | Yaradıldı |
| [DONE] | `migrations/0014_scheduled_tasks.sql` | Yaradıldı |
| [DONE] | `migrations/0015_notification_settings.sql` | Yaradıldı |
| [DONE] | `migrations/0016_tags.sql` | Yaradıldı |
| [DONE] | `migrations/0017_ssl_certs.sql` | Yaradıldı |
| [DONE] | `migrations/0018_instance_settings.sql` | Yaradıldı |
| [TODO] | `migrations/0019_application_settings.sql` | Lazımdır |
| [TODO] | `migrations/0020_volume_backups.sql` | Lazımdır |
| [TODO] | `migrations/0021_cloud_providers.sql` | Lazımdır |

## 6. Test

| Status | Fayl | Nə edir |
|--------|------|---------|
| [TODO] | `src/models/tests/` | Hər model üçün unit test |
| [TODO] | `cargo build -p rc-db` | Yoxla: xətasız keçir? |
