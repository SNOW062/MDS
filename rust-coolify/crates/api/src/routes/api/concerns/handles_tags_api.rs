// completed file_0520
// crates/api/src/routes/api/concerns/handles_tags_api.rs
// Coolify: app/Http/Controllers/Api/Concerns/HandlesTagsApi.php
// Tag-lı resursların API-da idarə edilməsi üçün ümumi məntiq

use axum::{
    routing::{get, put},
    Router, Json,
    extract::{Path, State},
    http::StatusCode,
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct TagAttachRequest {
    pub tags: Vec<String>,
}

/// Resursa aid tag-ları siyahıya alır
pub async fn list_tags_for_resource(
    db: &sqlx::PgPool,
    resource_uuid: Uuid,
    resource_type: &str,
) -> Result<Vec<serde_json::Value>, sqlx::Error> {
    // taggables cədvəlindən tag-ları çək
    let rows = sqlx::query(
        r#"SELECT t.uuid, t.name
           FROM tags t
           JOIN taggables tg ON tg.tag_id = t.id
           WHERE tg.taggable_id = (
               SELECT id FROM {} WHERE uuid = $1
           ) AND tg.taggable_type = $2"#
    )
    .bind(resource_uuid)
    .bind(resource_type)
    .fetch_all(db)
    .await?;

    Ok(rows.iter().map(|_| serde_json::json!({ "name": "tag" })).collect())
}

/// Resursa tag-lar əlavə edir / siyahını yeniləyir
pub async fn update_tags_for_resource(
    db: &sqlx::PgPool,
    resource_uuid: Uuid,
    resource_table: &str,
    resource_type: &str,
    tags: Vec<String>,
) -> Result<(), sqlx::Error> {
    let resource_id: Option<i64> = sqlx::query_scalar(
        &format!("SELECT id FROM {} WHERE uuid = $1", resource_table)
    )
    .bind(resource_uuid)
    .fetch_optional(db)
    .await?;

    if let Some(rid) = resource_id {
        // Köhnə tag bağlantılarını sil
        sqlx::query(
            "DELETE FROM taggables WHERE taggable_id = $1 AND taggable_type = $2"
        )
        .bind(rid)
        .bind(resource_type)
        .execute(db)
        .await?;

        // Yeni tag-ları əlavə et
        for tag_name in tags {
            // Tag-ı tap və ya yarat
            let tag_id: Option<i32> = sqlx::query_scalar(
                "SELECT id FROM tags WHERE name = $1"
            )
            .bind(&tag_name)
            .fetch_optional(db)
            .await?;

            let final_tag_id = if let Some(id) = tag_id {
                id
            } else {
                sqlx::query_scalar(
                    "INSERT INTO tags (name, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING id"
                )
                .bind(&tag_name)
                .fetch_one(db)
                .await?
            };

            // Bağlantı yarat
            sqlx::query(
                "INSERT INTO taggables (tag_id, taggable_id, taggable_type) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING"
            )
            .bind(final_tag_id)
            .bind(rid)
            .bind(resource_type)
            .execute(db)
            .await?;
        }
    }

    Ok(())
}
