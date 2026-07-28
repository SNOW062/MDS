// completed be_1051
//! Team invitation system.
//! Coolify reference: TeamInvitation.php
//!
//! TeamInvitation fields: team_id, uuid, email, role, link, via
//! Validity: configurable days (constants.invitation.link.expiration_days)
//! - setEmailAttribute: stored as lowercase
//! - isValid(): checks created_at + expiration_days

use chrono::Utc;
use sqlx::PgPool;
use uuid::Uuid;
use serde::{Deserialize, Serialize};

use crate::team::roles::TeamRole;

const INVITATION_EXPIRATION_DAYS: i64 = 7;

/// Stored team invitation (matches team_invitations table).
#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct TeamInvitation {
    pub id: Uuid,
    pub team_id: Uuid,
    pub uuid: Uuid,
    pub email: String,
    pub role: String,
    pub link: Option<String>,
    pub via: Option<String>,
    pub created_at: chrono::DateTime<Utc>,
    pub updated_at: chrono::DateTime<Utc>,
}

impl TeamInvitation {
    /// Check if the invitation is still valid (not expired).
    /// Coolify: isValid() checks created_at + expiration_days config.
    pub fn is_valid(&self) -> bool {
        let now = Utc::now();
        let diff = now - self.created_at;
        diff.num_days() <= INVITATION_EXPIRATION_DAYS
    }
}

/// Create and store a new team invitation.
/// Email is stored lowercase (matching Coolify's setEmailAttribute).
pub async fn invite(
    pool: &PgPool,
    team_id: Uuid,
    email: &str,
    role: TeamRole,
    base_url: &str,
) -> anyhow::Result<TeamInvitation> {
    let invitation_uuid = Uuid::new_v4();
    let link = format!("{}/team/invitation/{}", base_url, invitation_uuid);
    let email_lower = email.to_lowercase();

    let inv = sqlx::query_as::<_, TeamInvitation>(
        r#"INSERT INTO team_invitations
           (id, team_id, uuid, email, role, link, via, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, 'link', NOW(), NOW())
           RETURNING *"#,
    )
    .bind(Uuid::new_v4())
    .bind(team_id)
    .bind(invitation_uuid)
    .bind(&email_lower)
    .bind(role.as_str())
    .bind(&link)
    .fetch_one(pool)
    .await?;

    Ok(inv)
}

/// Accept an invitation by its UUID token.
/// Coolify: validates expiry, adds user to team, deletes invitation.
pub async fn accept(pool: &PgPool, invitation_uuid: Uuid, user_id: Uuid) -> anyhow::Result<()> {
    let inv = sqlx::query_as::<_, TeamInvitation>(
        "SELECT * FROM team_invitations WHERE uuid = $1",
    )
    .bind(invitation_uuid)
    .fetch_optional(pool)
    .await?
    .ok_or_else(|| anyhow::anyhow!("Invitation not found or already used"))?;

    if !inv.is_valid() {
        // Delete expired invitation
        sqlx::query("DELETE FROM team_invitations WHERE id = $1")
            .bind(inv.id)
            .execute(pool)
            .await?;
        return Err(anyhow::anyhow!("Invitation has expired"));
    }

    // Add user to team with the invitation role
    sqlx::query(
        r#"INSERT INTO team_members (id, team_id, user_id, role, created_at)
           VALUES ($1, $2, $3, $4, NOW())
           ON CONFLICT (team_id, user_id) DO UPDATE SET role = EXCLUDED.role"#,
    )
    .bind(Uuid::new_v4())
    .bind(inv.team_id)
    .bind(user_id)
    .bind(&inv.role)
    .execute(pool)
    .await?;

    // Delete the used invitation
    sqlx::query("DELETE FROM team_invitations WHERE id = $1")
        .bind(inv.id)
        .execute(pool)
        .await?;

    Ok(())
}

/// Decline an invitation (delete without adding to team).
pub async fn decline(pool: &PgPool, invitation_uuid: Uuid) -> anyhow::Result<()> {
    sqlx::query("DELETE FROM team_invitations WHERE uuid = $1")
        .bind(invitation_uuid)
        .execute(pool)
        .await?;
    Ok(())
}
