// completed file_0850_invitation_link
// Coolify mənbəsi: app/Notifications/TransactionalEmails/InvitationLink.php

pub struct InvitationLinkTransactionalEmail;

impl InvitationLinkTransactionalEmail {
    pub fn format_message(team_name: &str, invite_link: &str) -> String {
        format!(
            "<h2>You Have Been Invited!</h2><p>You were invited to join team <b>{}</b> on Coolify.</p><p><a href=\"{}\">Accept Invitation</a></p>",
            team_name, invite_link
        )
    }
}
