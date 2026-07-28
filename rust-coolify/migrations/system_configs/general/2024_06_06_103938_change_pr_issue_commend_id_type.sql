-- completed mig_178
-- Converted from: 2024_06_06_103938_change_pr_issue_commend_id_type.php

-- ALTER TABLE application_previews
-- Review 2024_06_06_103938_change_pr_issue_commend_id_type.php for specific alterations
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS pull_request_issue_comment_id VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS pull_request_issue_comment_id INTEGER;

-- ALTER TABLE application_previews
-- Review 2024_06_06_103938_change_pr_issue_commend_id_type.php for specific alterations
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS pull_request_issue_comment_id VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS pull_request_issue_comment_id INTEGER;
