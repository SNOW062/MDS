// completed be_1121
// Coolify menkesi: app/Jobs/ApplicationDeploymentJob.php (Central deploy engine)
// Asinxron deploy pipeline idarecisi

use anyhow::Result;
use tokio::sync::mpsc;
use uuid::Uuid;

use crate::events::DeployEvent;
use crate::errors::DeployError;

/// Deploy etaplar
#[derive(Debug, Clone, PartialEq)]
pub enum DeployStage {
    Queued,
    Initializing,
    GitClone,
    GitPull,
    BuildDetect,
    BuildRun,
    Push,
    ContainerStart,
    HealthCheck,
    Done,
    Failed,
    Cancelled,
}

/// Bir deploy sureci ucun kontekst
#[derive(Debug, Clone)]
pub struct DeployContext {
    pub deployment_uuid: Uuid,
    pub application_uuid: Uuid,
    pub server_uuid: Uuid,
    pub git_repository: String,
    pub git_branch: String,
    pub build_pack: String,
    pub dockerfile: Option<String>,
    pub docker_compose_raw: Option<String>,
    pub force_rebuild: bool,
    pub stage: DeployStage,
}

impl DeployContext {
    pub fn new(
        deployment_uuid: Uuid,
        application_uuid: Uuid,
        server_uuid: Uuid,
        git_repository: String,
        git_branch: String,
        build_pack: String,
    ) -> Self {
        Self {
            deployment_uuid,
            application_uuid,
            server_uuid,
            git_repository,
            git_branch,
            build_pack,
            dockerfile: None,
            docker_compose_raw: None,
            force_rebuild: false,
            stage: DeployStage::Queued,
        }
    }
}

/// Ana Deploy Engine
/// Coolify-de bu ApplicationDeploymentJob-un ishini edir
pub struct DeployEngine {
    db: sqlx::PgPool,
    event_tx: mpsc::Sender<DeployEvent>,
}

impl DeployEngine {
    pub fn new(db: sqlx::PgPool, event_tx: mpsc::Sender<DeployEvent>) -> Self {
        Self { db, event_tx }
    }

    /// Deploy surecini baslat
    pub async fn run(&self, mut ctx: DeployContext) -> Result<(), DeployError> {
        self.emit(DeployEvent::Started {
            deployment_uuid: ctx.deployment_uuid,
            started_at: chrono::Utc::now(),
        }).await;

        self.update_status(&ctx, "in_progress").await?;

        // 1. Git clone / pull
        ctx.stage = DeployStage::GitClone;
        self.emit(DeployEvent::GitCloning {
            deployment_uuid: ctx.deployment_uuid,
            repository: ctx.git_repository.clone(),
            branch: ctx.git_branch.clone(),
        }).await;

        // TODO: crate::git::clone::run(&ctx).await?;

        // 2. Buildpack askarla
        ctx.stage = DeployStage::BuildDetect;

        // 3. Build icra et
        ctx.stage = DeployStage::BuildRun;
        self.emit(DeployEvent::BuildStarted {
            deployment_uuid: ctx.deployment_uuid,
            build_pack: ctx.build_pack.clone(),
        }).await;

        // TODO: crate::build::run(&ctx).await?;

        // 4. Konteyneri baslat
        ctx.stage = DeployStage::ContainerStart;
        // TODO: crate::run::container::start(&ctx).await?;

        // 5. Saglamliq yoxlamasi
        ctx.stage = DeployStage::HealthCheck;
        // TODO: crate::run::healthcheck::check(&ctx).await?;

        // 6. Tamamlandi
        ctx.stage = DeployStage::Done;
        self.update_status(&ctx, "finished").await?;
        self.emit(DeployEvent::Completed {
            deployment_uuid: ctx.deployment_uuid,
            application_uuid: ctx.application_uuid,
            duration_secs: 0,
        }).await;

        Ok(())
    }

    async fn emit(&self, event: DeployEvent) {
        let _ = self.event_tx.send(event).await;
    }

    async fn update_status(&self, ctx: &DeployContext, status: &str) -> Result<(), DeployError> {
        sqlx::query(
            "UPDATE application_deployment_queues SET status = $2, updated_at = NOW() WHERE uuid = $1"
        )
        .bind(ctx.deployment_uuid)
        .bind(status)
        .execute(&self.db)
        .await?;
        Ok(())
    }
}
