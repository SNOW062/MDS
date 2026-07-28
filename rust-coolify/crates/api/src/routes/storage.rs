// completed be_1035
// Coolify mənbəsi: app/Http/Controllers/Api/VolumeBackupsController.php
// Endpoints: volume backup schedule upsert and delete for applications, databases, services

use axum::{
    routing::{put, delete},
    Router, Json,
    extract::{Path, State},
    http::StatusCode,
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::state::AppState;

#[derive(Debug, Serialize, Deserialize)]
pub struct VolumeBackupScheduleRequest {
    pub frequency: String,
    pub enabled: Option<bool>,
    pub save_s3: Option<bool>,
    pub disable_local_backup: Option<bool>,
    pub stop_during_backup: Option<bool>,
    pub s3_storage_uuid: Option<String>,
    pub retention_amount_locally: Option<i32>,
    pub retention_days_locally: Option<i32>,
    pub retention_amount_s3: Option<i32>,
    pub retention_days_s3: Option<i32>,
    pub timeout: Option<i32>,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        // Coolify: /applications/{uuid}/storages/{storage_uuid}/backups
        .route("/api/applications/:uuid/storages/:storage_uuid/backups",
            put(upsert_backup_schedule_handler).delete(delete_backup_schedule_handler))
        // Coolify: /databases/{uuid}/storages/{storage_uuid}/backups
        .route("/api/databases/:uuid/storages/:storage_uuid/backups",
            put(upsert_backup_schedule_handler).delete(delete_backup_schedule_handler))
        // Coolify: /services/{uuid}/storages/{storage_uuid}/backups
        .route("/api/services/:uuid/storages/:storage_uuid/backups",
            put(upsert_backup_schedule_handler).delete(delete_backup_schedule_handler))
        .with_state(state)
}

/// PUT /api/{resource_type}/{uuid}/storages/{storage_uuid}/backups
/// Coolify: VolumeBackupsController::upsert — backup schedule yarat və ya əvəzlə
async fn upsert_backup_schedule_handler(
    State(state): State<AppState>,
    Path((resource_uuid, storage_uuid)): Path<(Uuid, Uuid)>,
    Json(payload): Json<VolumeBackupScheduleRequest>,
) -> Result<(StatusCode, Json<serde_json::Value>), StatusCode> {
    if payload.frequency.trim().is_empty() {
        return Err(StatusCode::UNPROCESSABLE_ENTITY);
    }

    // S3-ə saxlama istəyi varsa, local backup söndürülə bilər (Coolify validasiyası)
    let save_s3 = payload.save_s3.unwrap_or(false);
    let disable_local = payload.disable_local_backup.unwrap_or(false);
    if disable_local && !save_s3 {
        return Err(StatusCode::UNPROCESSABLE_ENTITY);
    }

    // Mövcud schedule-u yoxla
    let existing = sqlx::query(
        "SELECT uuid FROM scheduled_volume_backups WHERE storage_id = $1"
    )
    .bind(storage_uuid)
    .fetch_optional(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let schedule_uuid = Uuid::new_v4();
    let is_new = existing.is_none();

    if is_new {
        sqlx::query(
            "INSERT INTO scheduled_volume_backups (uuid, storage_id, resource_id, frequency, enabled, save_s3, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())"
        )
        .bind(schedule_uuid)
        .bind(storage_uuid)
        .bind(resource_uuid)
        .bind(&payload.frequency)
        .bind(payload.enabled.unwrap_or(true))
        .bind(save_s3)
        .execute(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    } else {
        sqlx::query(
            "UPDATE scheduled_volume_backups SET frequency = $1, enabled = $2, save_s3 = $3, updated_at = NOW()
             WHERE storage_id = $4"
        )
        .bind(&payload.frequency)
        .bind(payload.enabled.unwrap_or(true))
        .bind(save_s3)
        .bind(storage_uuid)
        .execute(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    }

    let status = if is_new { StatusCode::CREATED } else { StatusCode::OK };
    let message = if is_new { "Backup schedule created." } else { "Backup schedule replaced." };

    Ok((status, Json(serde_json::json!({
        "uuid": schedule_uuid.to_string(),
        "message": message,
        "storage_uuid": storage_uuid.to_string(),
        "frequency": payload.frequency,
        "enabled": payload.enabled.unwrap_or(true),
        "save_s3": save_s3,
        "disable_local_backup": disable_local,
        "stop_during_backup": payload.stop_during_backup.unwrap_or(false),
        "retention_amount_locally": payload.retention_amount_locally.unwrap_or(7),
        "retention_days_locally": payload.retention_days_locally.unwrap_or(0),
        "retention_amount_s3": payload.retention_amount_s3.unwrap_or(7),
        "retention_days_s3": payload.retention_days_s3.unwrap_or(0),
        "timeout": payload.timeout.unwrap_or(3600),
    }))))
}

/// DELETE /api/{resource_type}/{uuid}/storages/{storage_uuid}/backups
/// Coolify: VolumeBackupsController::destroy — backup schedule-u sil
async fn delete_backup_schedule_handler(
    State(state): State<AppState>,
    Path((_resource_uuid, storage_uuid)): Path<(Uuid, Uuid)>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let exists = sqlx::query(
        "SELECT uuid FROM scheduled_volume_backups WHERE storage_id = $1"
    )
    .bind(storage_uuid)
    .fetch_optional(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    if exists.is_none() {
        return Err(StatusCode::NOT_FOUND);
    }

    sqlx::query("DELETE FROM scheduled_volume_backups WHERE storage_id = $1")
        .bind(storage_uuid)
        .execute(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "message": "Backup schedule deleted." })))
}
