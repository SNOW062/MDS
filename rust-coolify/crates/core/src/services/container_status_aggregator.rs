// completed file_0974
// Coolify mənbəsi: app/Services/ContainerStatusAggregator.php

pub struct ContainerStatusAggregator;

impl ContainerStatusAggregator {
    /// Bir neçə konteynerin statuslarını birləşdirərək ümumi resurs (App / Database / Service) statusunu hesablayır
    pub fn aggregate(statuses: &[String], max_restarts: u32) -> String {
        if statuses.is_empty() {
            return "exited".to_string();
        }

        let mut has_running = false;
        let mut has_restarting = false;
        let mut has_unhealthy = false;
        let mut has_exited = false;
        let mut has_starting = false;
        let mut has_degraded = false;

        for status in statuses {
            let s = status.to_lowercase();
            if s.contains("degraded") {
                has_degraded = true;
            } else if s.contains("restarting") {
                has_restarting = true;
            } else if s.contains("running") {
                has_running = true;
                if s.contains("unhealthy") {
                    has_unhealthy = true;
                }
            } else if s.contains("exited") {
                has_exited = true;
            } else if s.contains("starting") || s.contains("created") {
                has_starting = true;
            }
        }

        // Priority 1: Degraded və ya Crash Loop
        if has_degraded || (has_exited && max_restarts > 3) {
            return "degraded:unhealthy".to_string();
        }

        // Priority 2: Restarting
        if has_restarting {
            return "restarting:unknown".to_string();
        }

        // Priority 3: Qarışıq (running + exited)
        if has_running && has_exited {
            return "degraded:unhealthy".to_string();
        }

        // Priority 4: Starting
        if has_starting && !has_running {
            return "starting:unknown".to_string();
        }

        // Priority 5: Running
        if has_running {
            if has_unhealthy {
                return "running:unhealthy".to_string();
            }
            return "running:healthy".to_string();
        }

        "exited".to_string()
    }
}
