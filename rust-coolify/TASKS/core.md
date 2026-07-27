# TASKS — `core` Crate
> **Crate x?rit?si:** `crates/core/README.md` — ?VV?LC? ONU OXU

## SSH
| Status | Fayl | Coolify M?nb?yi |
|--------|------|-----------------|
| [TODO] | `src/ssh/client.rs` | `coolify-source/app/Helpers/SshMultiplexingHelper.php` |
| [TODO] | `src/ssh/multiplexer.rs` | `coolify-source/app/Helpers/SshMultiplexingHelper.php` |
| [TODO] | `src/ssh/key.rs` | `coolify-source/app/Models/PrivateKey.php` |
| [TODO] | `src/ssh/stream.rs` | — (output > tokio channel) |

## Docker
| Status | Fayl | Coolify M?nb?yi |
|--------|------|-----------------|
| [TODO] | `src/docker/client.rs` | bollard::Docker wrapper |
| [TODO] | `src/docker/container.rs` | `coolify-source/app/Actions/Docker/GetContainersStatus.php` |
| [TODO] | `src/docker/network.rs` | Docker network API |
| [TODO] | `src/docker/volume.rs` | Docker volume API |
| [TODO] | `src/docker/image.rs` | Docker image API |
| [TODO] | `src/docker/logs.rs` | Container log stream |

## System
| Status | Fayl | Coolify M?nb?yi |
|--------|------|-----------------|
| [TODO] | `src/system/specs.rs` | `coolify-source/app/Jobs/PushServerUpdateJob.php` |
| [TODO] | `src/system/install.rs` | `coolify-source/app/Actions/Server/InstallDocker.php` |
| [TODO] | `src/helpers/ssh_retry.rs` | `coolify-source/app/Helpers/SshRetryHandler.php` |
| [TODO] | `src/helpers/ssl.rs` | `coolify-source/app/Helpers/SslHelper.php` |

## Yoxlama
| Status | Is |
|--------|-----|
| [TODO] | `cargo build -p rc-core` x?tas?z kecir |
| [TODO] | SshClient unit test |
| [TODO] | Docker mock test |
