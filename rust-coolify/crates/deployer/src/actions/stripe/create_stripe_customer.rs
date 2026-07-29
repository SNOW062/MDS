// completed file_0410
// Coolify mənbəsi: Stripe Customer Management
use anyhow::{Result, anyhow};
use reqwest::Client;
use serde_json::Value;
use sqlx::PgPool;
use tracing::info;

pub struct CreateStripeCustomer;

impl CreateStripeCustomer {
    /// Stripe API vasitəsilə yeni Customer yaradır və `stripe_customer_id`-ni subscriptions cədvəlinə yazır
    pub async fn handle(
        db: &PgPool,
        team_id: i32,
        email: &str,
        name: &str,
        stripe_api_key: &str,
    ) -> Result<String> {
        info!("Creating Stripe customer for team_id={} ({})", team_id, email);

        if stripe_api_key.is_empty() {
            return Err(anyhow!("Stripe API Key is not configured"));
        }

        let client = Client::new();
        let params = [
            ("email", email),
            ("name", name),
            ("metadata[team_id]", &team_id.to_string()),
        ];

        let resp = client.post("https://api.stripe.com/v1/customers")
            .bearer_auth(stripe_api_key)
            .form(&params)
            .send()
            .await?;

        if !resp.status().is_success() {
            let body = resp.text().await.unwrap_or_default();
            return Err(anyhow!("Stripe API error creating customer: {}", body));
        }

        let json: Value = resp.json().await?;
        let customer_id = json["id"].as_str().ok_or_else(|| anyhow!("Invalid customer ID from Stripe"))?.to_string();

        // Subscriptions cədvəlində yeniləyirik
        sqlx::query!(
            r#"
            INSERT INTO subscriptions (team_id, stripe_customer_id, stripe_invoice_paid, created_at, updated_at)
            VALUES ($1, $2, false, NOW(), NOW())
            ON CONFLICT (team_id) DO UPDATE SET stripe_customer_id = $2, updated_at = NOW()
            "#,
            team_id,
            customer_id
        )
        .execute(db)
        .await?;

        info!("Stripe customer created with id={} for team_id={}", customer_id, team_id);
        Ok(customer_id)
    }
}
