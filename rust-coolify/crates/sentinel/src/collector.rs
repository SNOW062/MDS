// completed be_1185
use anyhow::Result;

pub struct MetricsCollector;

impl MetricsCollector {
    pub fn new() -> Self { Self }
    pub async fn collect_all(&self) -> Result<()> {
        Ok(())
    }
}
