// completed be_1053
//! Team role system.
//! Coolify reference: Team.php isAdminOfTeam(), team_user pivot table role column.
//!
//! Coolify roles: 'owner', 'admin', 'member', 'viewer'
//! isAdmin() → role is 'owner' or 'admin'
//! isAdminOfTeam(team_id) → checks pivot table for admin/owner role

use serde::{Deserialize, Serialize};

/// Team membership roles matching Coolify's team_user.role values.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "text", rename_all = "lowercase")]
pub enum TeamRole {
    Owner,
    Admin,
    Member,
    Viewer,
}

impl TeamRole {
    /// Parse a role string from DB (matches Coolify's string values).
    pub fn from_str(s: &str) -> Self {
        match s.to_lowercase().as_str() {
            "owner" => Self::Owner,
            "admin" => Self::Admin,
            "viewer" => Self::Viewer,
            _ => Self::Member,
        }
    }

    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Owner => "owner",
            Self::Admin => "admin",
            Self::Member => "member",
            Self::Viewer => "viewer",
        }
    }
}

/// Can deploy applications. Coolify: admin & owner can deploy.
pub fn can_deploy(role: &TeamRole) -> bool {
    matches!(role, TeamRole::Owner | TeamRole::Admin)
}

/// Can manage servers. Coolify: only admin/owner via ServerPolicy::update().
pub fn can_manage_servers(role: &TeamRole) -> bool {
    matches!(role, TeamRole::Owner | TeamRole::Admin)
}

/// Can invite members. Coolify: TeamPolicy::manageInvitations → isAdminOfTeam.
pub fn can_invite_members(role: &TeamRole) -> bool {
    matches!(role, TeamRole::Owner | TeamRole::Admin)
}

/// Can manage team settings. Coolify: TeamPolicy::update → isAdminOfTeam.
pub fn can_manage_team(role: &TeamRole) -> bool {
    matches!(role, TeamRole::Owner | TeamRole::Admin)
}

/// Can view admin panel. Coolify: TeamPolicy::viewAdmin → isAdminOfTeam.
pub fn can_view_admin(role: &TeamRole) -> bool {
    matches!(role, TeamRole::Owner | TeamRole::Admin)
}

/// Can delete team. Coolify: TeamPolicy::delete → isAdminOfTeam.
pub fn can_delete_team(role: &TeamRole) -> bool {
    matches!(role, TeamRole::Owner | TeamRole::Admin)
}
