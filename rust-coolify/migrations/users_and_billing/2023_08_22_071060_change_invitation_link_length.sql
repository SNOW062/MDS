-- completed mig_068
-- Converted from: 2023_08_22_071060_change_invitation_link_length.php

-- ALTER TABLE team_invitations
-- Review 2023_08_22_071060_change_invitation_link_length.php for specific alterations
ALTER TABLE team_invitations ADD COLUMN IF NOT EXISTS link TEXT;
ALTER TABLE team_invitations ADD COLUMN IF NOT EXISTS link VARCHAR(255);

-- ALTER TABLE team_invitations
-- Review 2023_08_22_071060_change_invitation_link_length.php for specific alterations
ALTER TABLE team_invitations ADD COLUMN IF NOT EXISTS link TEXT;
ALTER TABLE team_invitations ADD COLUMN IF NOT EXISTS link VARCHAR(255);
