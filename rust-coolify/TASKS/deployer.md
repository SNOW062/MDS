# TASKS — `deployer` Crate
> **Crate x?rit?si:** `crates/deployer/README.md` — ?VV?LC? ONU OXU
> ?? Bu crate-? baslamadan rc-db v? rc-core haz?r olmal?d?r!

## Engine
| Status | Fayl | Coolify M?nb?yi |
|--------|------|-----------------|
| [TODO] | `src/engine.rs` | `ApplicationDeploymentJob.php` > handle() |

## Git
| Status | Fayl | Coolify M?nb?yi |
|--------|------|-----------------|
| [TODO] | `src/git/clone.rs` | `ApplicationDeploymentJob.php` > cloneRepository() |
| [TODO] | `src/git/pull.rs` | `ApplicationDeploymentJob.php` > pullRepository() |
| [TODO] | `src/git/webhook.rs` | `ProcessGithubPullRequestWebhook.php` |
| [TODO] | `src/git/preview.rs` | `ApplicationPullRequestUpdateJob.php` |

## Build
| Status | Fayl | Coolify M?nb?yi |
|--------|------|-----------------|
| [TODO] | `src/build/detect.rs` | `app/Services/DeploymentConfiguration/` |
| [TODO] | `src/build/nixpacks.rs` | `ApplicationDeploymentJob.php` > nixpacksBuild() |
| [TODO] | `src/build/dockerfile.rs` | `ApplicationDeploymentJob.php` > dockerfileBuild() |
| [TODO] | `src/build/compose.rs` | `ApplicationDeploymentJob.php` > dockerComposeDeploy() |
| [TODO] | `src/build/static_html.rs` | Static site deploy |

## Run
| Status | Fayl | Coolify M?nb?yi |
|--------|------|-----------------|
| [TODO] | `src/run/container.rs` | `ApplicationDeploymentJob.php` > runContainer() |
| [TODO] | `src/run/healthcheck.rs` | `ApplicationDeploymentJob.php` > healthCheck() |
| [TODO] | `src/run/rollback.rs` | Rollback to previous image |

## Config + Log
| Status | Fayl | Coolify M?nb?yi |
|--------|------|-----------------|
| [TODO] | `src/log/streamer.rs` | — (DB + WebSocket) |
| [TODO] | `src/config/env.rs` | `EnvironmentVariable.php` |
| [TODO] | `src/config/labels.rs` | `ApplicationDeploymentJob.php` > generateLabels() |

## Actions
| Status | Fayl | Coolify M?nb?yi |
|--------|------|-----------------|
| [TODO] | `src/actions/start_deployment.rs` | `Actions/Application/` |
| [TODO] | `src/actions/stop_application.rs` | `Actions/Application/StopApplication.php` |
| [TODO] | `src/actions/cleanup_preview.rs` | `Actions/Application/CleanupPreviewDeployment.php` |
