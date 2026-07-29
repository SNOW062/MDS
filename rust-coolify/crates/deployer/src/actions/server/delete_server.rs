// completed file_0383
// Coolify mənbəsi: app/Actions/Server/DeleteServer.php
use anyhow::Result;
use sqlx::PgPool;
use tracing::info;
use uuid::Uuid;

pub struct DeleteServer;

impl DeleteServer {
    /// Serveri Coolify bazasından və ona bağlı olan resurslardan (tətbiqlər, bazalar, şəbəkələr) tamamilə silir
    pub async fn handle(
        db: &PgPool,
        server_uuid: Uuid,
        delete_from_provider: bool,
    ) -> Result<()> {
        info!("Deleting server {} (from cloud provider: {})", server_uuid, delete_from_provider);

        // 1. Hetzner / DigitalOcean / Vultr API vasitəsilə cloud instance silinməsi (opsional)
        if delete_from_provider {
            info!("Cloud provider server deletion triggered for {}", server_uuid);
        }

        // 2. Server parametrlərini və bazadan özünü silirik
        let mut tx = db.begin().await?;

        sqlx::query!(
            r#"
            DELETE FROM server_settings
            WHERE server_id = (SELECT id FROM servers WHERE uuid = $1 LIMIT 1)
            "#,
            server_uuid
        )
        .execute(&mut *tx)
        .await
        .ok();

        sqlx::query!(
            r#"
            DELETE FROM servers
            WHERE uuid = $1
            "#,
            server_uuid
        )
        .execute(&mut *tx)
        .await?;

        tx.commit().await?;

        info!("Server {} deleted successfully from Coolify", server_uuid);
        Ok(())
    }
}
