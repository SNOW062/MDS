// completed file_0991
// Coolify mənbəsi: app/Traits/CalculatesExcludedStatus.php

pub struct CalculatesExcludedStatus;

impl CalculatesExcludedStatus {
    /// Monitoring zamanı status hesablanmasında nəzərə alınmayan istisna edilən statusları süzgəcdən keçirir
    pub fn is_excluded_status(status: &str) -> bool {
        let s = status.to_lowercase();
        s == "exited:0" || s == "stopped" || s == "disabled"
    }
}
