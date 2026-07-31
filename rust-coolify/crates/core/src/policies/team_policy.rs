// completed file_0947
// Team Policy Engine for MasterDeploy Core Security

use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserTeamContext {
    pub id: Uuid,
    pub is_root: bool,
    pub team_ids: Vec<Uuid>,
    pub admin_team_ids: Vec<Uuid>,
}

impl UserTeamContext {
    pub fn belongs_to_team(&self, team_id: Uuid) -> bool {
        self.team_ids.contains(&team_id)
    }

    pub fn is_admin_of_team(&self, team_id: Uuid) -> bool {
        self.is_root || self.admin_team_ids.contains(&team_id)
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TeamResource {
    pub id: Uuid,
    pub name: String,
}

pub struct TeamPolicy;

impl TeamPolicy {
    /// Determine whether the user can view any models.
    pub fn viewAny(_user: &UserTeamContext) -> bool {
        true
    }

    /// Determine whether the user can view the model.
    pub fn view(user: &UserTeamContext, team: &TeamResource) -> bool {
        user.belongs_to_team(team.id)
    }

    /// Determine whether the user can create models.
    pub fn create(_user: &UserTeamContext) -> bool {
        true
    }

    /// Determine whether the user can update the model.
    pub fn update(user: &UserTeamContext, team: &TeamResource) -> bool {
        if !user.belongs_to_team(team.id) {
            return false;
        }
        user.is_admin_of_team(team.id)
    }

    /// Determine whether the user can delete the model.
    pub fn delete(user: &UserTeamContext, team: &TeamResource) -> bool {
        if !user.belongs_to_team(team.id) {
            return false;
        }
        user.is_admin_of_team(team.id)
    }

    /// Determine whether the user can manage team members.
    pub fn manageMembers(user: &UserTeamContext, team: &TeamResource) -> bool {
        if !user.belongs_to_team(team.id) {
            return false;
        }
        user.is_admin_of_team(team.id)
    }

    /// Determine whether the user can view admin panel.
    pub fn viewAdmin(user: &UserTeamContext, team: &TeamResource) -> bool {
        if !user.belongs_to_team(team.id) {
            return false;
        }
        user.is_admin_of_team(team.id)
    }

    /// Determine whether the user can manage invitations.
    pub fn manageInvitations(user: &UserTeamContext, team: &TeamResource) -> bool {
        if !user.belongs_to_team(team.id) {
            return false;
        }
        user.is_admin_of_team(team.id)
    }
}
