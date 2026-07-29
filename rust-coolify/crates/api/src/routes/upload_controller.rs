// completed file_0496
// Coolify mənbəsi: app/Http/Controllers/UploadController.php
// Fayl yükləmə controller-i (SSH açarları, sertifikatlar, vs.)

use axum::{
    routing::post,
    Router, Json,
    extract::{State, Multipart},
    http::StatusCode,
};
use uuid::Uuid;
use crate::state::AppState;

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/api/upload/key", post(upload_private_key))
        .with_state(state)
}

/// SSH private key faylını yükləyir
/// Coolify: UploadController::uploadKey()
async fn upload_private_key(
    State(state): State<AppState>,
    mut multipart: Multipart,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let mut key_content = String::new();
    let mut name = String::new();

    while let Some(field) = multipart.next_field().await.map_err(|_| StatusCode::BAD_REQUEST)? {
        match field.name() {
            Some("key") => {
                let data = field.bytes().await.map_err(|_| StatusCode::BAD_REQUEST)?;
                key_content = String::from_utf8(data.to_vec())
                    .map_err(|_| StatusCode::BAD_REQUEST)?;
            }
            Some("name") => {
                let data = field.bytes().await.map_err(|_| StatusCode::BAD_REQUEST)?;
                name = String::from_utf8(data.to_vec())
                    .map_err(|_| StatusCode::BAD_REQUEST)?;
            }
            _ => {}
        }
    }

    if key_content.is_empty() {
        return Err(StatusCode::BAD_REQUEST);
    }

    let key_uuid = Uuid::new_v4();
    if name.is_empty() {
        name = format!("key-{}", &key_uuid.to_string()[..8]);
    }

    sqlx::query(
        r#"INSERT INTO private_keys (uuid, name, private_key, created_at, updated_at)
           VALUES ($1,$2,$3,NOW(),NOW())"#
    )
    .bind(key_uuid)
    .bind(&name)
    .bind(&key_content)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({
        "uuid": key_uuid,
        "name": name,
        "message": "Private key uploaded successfully."
    })))
}
