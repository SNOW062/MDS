// completed be_1079
#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize, sqlx::Type)]
#[sqlx(type_name = "text", rename_all = "lowercase")]
pub enum DeployStatus {
    Queued,
    InProgress,
    Success,
    Failed,
    Cancelled,
}
