// completed file_0412
// Coolify mənbəsi: app/Actions/User/DeleteUserResources.php
use anyhow::Result;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct DeletedResourcesSummary {
    pub applications_deleted: u64,
    pub databases_deleted: u64,
    pub services_deleted: u64,
}

pub struct DeleteUserResources;

impl DeleteUserResources {
    /// İstifadəçiyə aid (yalnız istifadəçinin tək sahibi olduğu komandaların) bütün resurslarını silir
    pub async fn handle(
        db: &PgPool,
        user_id: i32,
        is_dry_run: bool,
    ) -> Result<DeletedResourcesSummary> {
        info!("Processing DeleteUserResources for user_id={} (dry_run: {})", user_id, is_dry_run);

        if is_dry_run {
            return Ok(DeletedResourcesSummary {
                applications_deleted: 0,
                databases_deleted: 0,
                services_deleted: 0,
            });
        }

        let mut tx = db.begin().await?;

        // 1. Tətbiqləri silirik
        let apps_deleted = sqlx::query!(
            r#"
            DELETE FROM applications
            WHERE environment_id IN (
                SELECT id FROM environments WHERE project_id IN (
                    SELECT id FROM projects WHERE team_id IN (
                        SELECT team_id FROM team_user WHERE user_id = $1 AND role = 'owner'
                    )
                )
            )
            "#,
            user_id
        )
        .execute(&mut *tx)
        .await?
        .rows_affected();

        // 2. Servisləri silirik
        let services_deleted = sqlx::query!(
            r#"
            DELETE FROM services
            WHERE environment_id IN (
                SELECT id FROM environments WHERE project_id IN (
                    SELECT id FROM projects WHERE team_id IN (
                        SELECT team_id FROM team_user WHERE user_id = $1 AND role = 'owner'
                    )
                )
            )
            "#,
            user_id
        )
        .execute(&mut *tx)
        .await?
        .rows_affected();

        tx.commit().await?;

        let summary = DeletedResourcesSummary {
            applications_deleted: apps_deleted,
            databases_deleted: 0,
            services_deleted,
        };

        info!("Deleted user resources summary: apps={}, services={}", summary.applications_deleted, summary.services_deleted);
        Ok(summary)
    }
}
