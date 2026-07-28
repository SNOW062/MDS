// completed file_0869
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct Subscription {
    pub id: uuid::Uuid,
    pub team_id: Option<uuid::Uuid>,
    pub stripe_invoice_paid: Option<String>,
    pub stripe_subscription_id: Option<uuid::Uuid>,
    pub stripe_customer_id: Option<uuid::Uuid>,
    pub stripe_cancel_at_period_end: Option<String>,
    pub stripe_plan_id: Option<uuid::Uuid>,
    pub stripe_feedback: Option<String>,
    pub stripe_comment: Option<String>,
    pub stripe_trial_already_ended: Option<String>,
    pub stripe_past_due: Option<String>,
    pub stripe_refunded_at: Option<String>,
}
