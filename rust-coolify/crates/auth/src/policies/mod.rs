// completed be_1049
//! Authorization policies matching Coolify's Laravel Policies.
//! Coolify reference: app/Policies/ (ServerPolicy, TeamPolicy, ApplicationPolicy)
//!
//! Pattern: user must be member of the resource's team.
//! Admin/Owner roles can create, update, delete.
//! Members can view and deploy.


/// User's effective role in a team (fetched from team_members pivot).
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum PolicyRole {
    Owner,
    Admin,
    Member,
    Viewer,
    /// User has no membership in this team.
    None,
}

impl PolicyRole {
    pub fn from_str(s: &str) -> Self {
        match s {
            "owner" => Self::Owner,
            "admin" => Self::Admin,
            "viewer" => Self::Viewer,
            "member" => Self::Member,
            _ => Self::None,
        }
    }

    /// isAdminOfTeam() in Coolify: owner or admin role.
    pub fn is_admin(&self) -> bool {
        matches!(self, Self::Owner | Self::Admin)
    }

    /// Member or higher: can view resources.
    pub fn is_member_or_higher(&self) -> bool {
        matches!(self, Self::Owner | Self::Admin | Self::Member)
    }
}

/// Server policy — mirrors Coolify's ServerPolicy.php.
pub struct ServerPolicy;

impl ServerPolicy {
    /// viewAny: any authenticated user → true
    pub fn view_any() -> bool { true }

    /// view: user must be in the server's team
    pub fn view(role: &PolicyRole) -> bool {
        role.is_member_or_higher()
    }

    /// create: isAdmin() — owner or admin
    pub fn create(role: &PolicyRole) -> bool {
        role.is_admin()
    }

    /// update: isAdminOfTeam(team_id)
    pub fn update(role: &PolicyRole) -> bool {
        role.is_admin()
    }

    /// delete: isAdminOfTeam(team_id)
    pub fn delete(role: &PolicyRole) -> bool {
        role.is_admin()
    }

    /// manageProxy, manageSentinel, viewSentinel, manageCaCertificate, viewSecurity
    pub fn manage_proxy(role: &PolicyRole) -> bool { role.is_admin() }
    pub fn manage_sentinel(role: &PolicyRole) -> bool { role.is_admin() }
    pub fn view_sentinel(role: &PolicyRole) -> bool { role.is_admin() }
    pub fn manage_ca_certificate(role: &PolicyRole) -> bool { role.is_admin() }
    pub fn view_security(role: &PolicyRole) -> bool { role.is_admin() }
}

/// Team policy — mirrors Coolify's TeamPolicy.php.
pub struct TeamPolicy;

impl TeamPolicy {
    pub fn view_any() -> bool { true }
    pub fn view(role: &PolicyRole) -> bool { role.is_member_or_higher() }
    /// create: all authenticated users can create teams
    pub fn create() -> bool { true }
    pub fn update(role: &PolicyRole) -> bool { role.is_admin() }
    pub fn delete(role: &PolicyRole) -> bool { role.is_admin() }
    pub fn manage_members(role: &PolicyRole) -> bool { role.is_admin() }
    pub fn view_admin(role: &PolicyRole) -> bool { role.is_admin() }
    pub fn manage_invitations(role: &PolicyRole) -> bool { role.is_admin() }
}

/// Application policy — mirrors Coolify's ApplicationPolicy.php.
pub struct ApplicationPolicy;

impl ApplicationPolicy {
    pub fn view_any() -> bool { true }
    pub fn view(role: &PolicyRole) -> bool { role.is_member_or_higher() }
    pub fn create(role: &PolicyRole) -> bool { role.is_admin() }
    pub fn update(role: &PolicyRole) -> bool { role.is_admin() }
    pub fn delete(role: &PolicyRole) -> bool { role.is_admin() }
    /// deploy: member or higher (members can trigger deploys)
    pub fn deploy(role: &PolicyRole) -> bool { role.is_member_or_higher() }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_server_policy_admin() {
        let admin = PolicyRole::Admin;
        assert!(ServerPolicy::view(&admin));
        assert!(ServerPolicy::create(&admin));
        assert!(ServerPolicy::delete(&admin));
    }

    #[test]
    fn test_server_policy_viewer() {
        let viewer = PolicyRole::Viewer;
        assert!(!ServerPolicy::view(&viewer)); // viewer is not member_or_higher
        assert!(!ServerPolicy::create(&viewer));
    }

    #[test]
    fn test_team_policy() {
        let member = PolicyRole::Member;
        assert!(TeamPolicy::view(&member));
        assert!(!TeamPolicy::update(&member)); // only admin
        assert!(!TeamPolicy::manage_invitations(&member));
    }
}
