-- completed mig_343
-- Converted from: 2026_07_07_113248_add_team_name_unique_index_to_tags_table.php

-- ALTER TABLE tags
-- Review 2026_07_07_113248_add_team_name_unique_index_to_tags_table.php for specific alterations
ALTER TABLE tags ADD COLUMN IF NOT EXISTS tags_team_id_name_unique TEXT;

-- ALTER TABLE tags
-- Review 2026_07_07_113248_add_team_name_unique_index_to_tags_table.php for specific alterations
ALTER TABLE tags ADD COLUMN IF NOT EXISTS tags_team_id_name_unique TEXT;
