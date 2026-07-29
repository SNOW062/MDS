// completed file_0527
// Coolify: MatchesManualWebhookApplications
use uuid::Uuid;

pub async fn find_application_by_webhook_token(
    db: &sqlx::PgPool,
    token: &str,
    provider: &str,
) -> Option<Uuid> {
    let column = match provider {
        "github" => "manual_webhook_secret_github",
        "gitlab" => "manual_webhook_secret_gitlab",
        "bitbucket" => "manual_webhook_secret_bitbucket",
        "gitea" => "manual_webhook_secret_gitea",
        _ => return None,
    };
    let row = sqlx::query(&format!(
        "SELECT uuid FROM applications WHERE {} = $1 LIMIT 1", column
    ))
    .bind(token)
    .fetch_optional(db)
    .await
    .ok()??;
    use sqlx::Row;
    let uuid_str: String = row.try_get("uuid").ok()?;
    Uuid::parse_str(&uuid_str).ok()
}
