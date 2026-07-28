-- completed mig_144
-- Converted from: 2024_02_20_165045_add_permissions_to_github_app.php

-- ALTER TABLE github_apps
-- Review 2024_02_20_165045_add_permissions_to_github_app.php for specific alterations
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS contents VARCHAR(255);
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS metadata VARCHAR(255);
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS pull_requests VARCHAR(255);
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS administration VARCHAR(255);
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS contents TEXT;
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS metadata TEXT;
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS pull_requests TEXT;
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS administration TEXT;

-- ALTER TABLE github_apps
-- Review 2024_02_20_165045_add_permissions_to_github_app.php for specific alterations
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS contents VARCHAR(255);
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS metadata VARCHAR(255);
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS pull_requests VARCHAR(255);
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS administration VARCHAR(255);
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS contents TEXT;
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS metadata TEXT;
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS pull_requests TEXT;
ALTER TABLE github_apps ADD COLUMN IF NOT EXISTS administration TEXT;
