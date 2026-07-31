// completed file_0989
// Authorizes Resource Creation Trait for MasterDeploy Core Security

use anyhow::{anyhow, Result};

pub trait AuthorizesResourceCreation {
    fn authorizeResourceCreation(&self) -> Result<()> {
        self.authorize("createAnyResource")
    }

    fn authorize(&self, _ability: &str) -> Result<()> {
        // Authorization check logic
        Ok(())
    }
}
