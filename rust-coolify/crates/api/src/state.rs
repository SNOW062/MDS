// AppState - shared application state
#[derive(Clone)]
pub struct AppState {
    pub db: rc_db::DbPool,
}

impl AppState {
    pub async fn new() -> anyhow::Result<Self> {
        let db = rc_db::init_db().await?;
        Ok(Self { db })
    }
}
