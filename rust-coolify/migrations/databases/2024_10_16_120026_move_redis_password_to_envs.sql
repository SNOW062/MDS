-- completed mig_215
-- Converted from: 2024_10_16_120026_move_redis_password_to_envs.php

-- ALTER TABLE standalone_redis
-- Review 2024_10_16_120026_move_redis_password_to_envs.php for specific alterations
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS redis_password TEXT;
