// completed file_0411
// Coolify mənbəsi: Stripe Webhook Processor
use anyhow::{Result, anyhow};
use serde_json::Value;
use sqlx::PgPool;
use tracing::info;

pub struct ProcessStripeWebhook;

impl ProcessStripeWebhook {
    /// Stripe Webhook event-lərini (invoice.payment_succeeded, customer.subscription.deleted) idarə edir
    pub async fn handle(db: &PgPool, payload: &Value) -> Result<()> {
        let event_type = payload["type"].as_str().unwrap_or("");
        info!("Processing Stripe Webhook event: {}", event_type);

        let data_object = &payload["data"]["object"];
        let customer_id = data_object["customer"].as_str().unwrap_or("");

        if customer_id.is_empty() {
            return Err(anyhow!("Missing customer ID in Stripe webhook payload"));
        }

        match event_type {
            "invoice.payment_succeeded" => {
                info!("Payment succeeded for Stripe customer {}", customer_id);
                sqlx::query!(
                    r#"
                    UPDATE subscriptions
                    SET stripe_invoice_paid = true, updated_at = NOW()
                    WHERE stripe_customer_id = $1
                    "#,
                    customer_id
                )
                .execute(db)
                .await?;
            }
            "customer.subscription.deleted" | "invoice.payment_failed" => {
                info!("Subscription ended/failed for Stripe customer {}", customer_id);
                sqlx::query!(
                    r#"
                    UPDATE subscriptions
                    SET stripe_invoice_paid = false, updated_at = NOW()
                    WHERE stripe_customer_id = $1
                    "#,
                    customer_id
                )
                .execute(db)
                .await?;
            }
            _ => {
                info!("Unhandled Stripe event type: {}", event_type);
            }
        }

        Ok(())
    }
}
