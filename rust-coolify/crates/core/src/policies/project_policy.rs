// completed file_0937
// Project Policy Engine for MasterDeploy Core Security

use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserContext {
    pub id: Uuid,
    pub is_admin: bool,
    pub team_ids: Vec<Uuid>,
    pub admin_team_ids: Vec<Uuid>,
}

impl UserContext {
    pub fn is_admin(&self) -> bool {
        self.is_admin
    }

    pub fn is_admin_of_team(&self, team_id: Uuid) -> bool {
        self.is_admin || self.admin_team_ids.contains(&team_id)
    }

    pub fn belongs_to_team(&self, team_id: Uuid) -> bool {
        self.team_ids.contains(&team_id)
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectResource {
    pub id: Uuid,
    pub team_id: Uuid,
}

pub struct ProjectPolicy;

impl ProjectPolicy {
    /// Determine whether the user can view any models.
    pub fn viewAny(_user: &UserContext) -> bool {
        true
    }

    /// Determine whether the user can view the model.
    pub fn view(user: &UserContext, project: &ProjectResource) -> bool {
        user.belongs_to_team(project.team_id)
    }

    /// Determine whether the user can create models.
    pub fn create(user: &UserContext) -> bool {
        user.is_admin()
    }

    /// Determine whether the user can update the model.
    pub fn update(user: &UserContext, project: &ProjectResource) -> bool {
        user.is_admin_of_team(project.team_id)
    }

    /// Determine whether the user can delete the model.
    pub fn delete(user: &UserContext, project: &ProjectResource) -> bool {
        user.is_admin_of_team(project.team_id)
    }

    /// Determine whether the user can restore the model.
    pub fn restore(_user: &UserContext, _project: &ProjectResource) -> bool {
        false
    }

    /// Determine whether the user can permanently delete the model.
    pub fn forceDelete(_user: &UserContext, _project: &ProjectResource) -> bool {
        false
    }
}
