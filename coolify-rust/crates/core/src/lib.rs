pub mod models;

pub use models::*;

pub struct CoolifyEngine {
    pub version: &'static str,
}

impl CoolifyEngine {
    pub fn new() -> Self {
        Self { version: "4.0.0-rust" }
    }
}
