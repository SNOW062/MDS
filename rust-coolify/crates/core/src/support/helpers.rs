// completed file_1074
use uuid::Uuid;

pub fn generate_random_name() -> String {
    format!("coolify-{}", &Uuid::new_v4().to_string()[..8])
}
