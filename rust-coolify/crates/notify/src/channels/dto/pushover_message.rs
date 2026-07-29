// completed file_0905
// Coolify mənbəsi: Notifications/DTO/PushoverMessage.php
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct PushoverMessage {
    pub token: String,
    pub user: String,
    pub title: Option<String>,
    pub message: String,
    pub url: Option<String>,
    pub url_title: Option<String>,
    pub priority: Option<i8>,
    pub sound: Option<String>,
}

impl PushoverMessage {
    pub fn new(token: String, user: String, message: String) -> Self {
        Self {
            token,
            user,
            message,
            title: None,
            url: None,
            url_title: None,
            priority: Some(0),
            sound: None,
        }
    }
}
