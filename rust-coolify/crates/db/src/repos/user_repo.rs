// completed be_1105
use uuid::Uuid;
use crate::DbPool;
use crate::models::user::User;

pub async fn create_user(pool: &DbPool, name: &str, email: &str, password_hash: &str) -> anyhow::Result<User> {
    let user = sqlx::query_as::<_, User>(
        "INSERT INTO users (id, name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(name)
    .bind(email)
    .bind(password_hash)
    .fetch_one(pool)
    .await?;
    Ok(user)
}

pub async fn get_user_by_email(pool: &DbPool, email: &str) -> anyhow::Result<Option<User>> {
    let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE email = $1")
        .bind(email)
        .fetch_optional(pool)
        .await?;
    Ok(user)
}

pub async fn get_user(pool: &DbPool, id: Uuid) -> anyhow::Result<Option<User>> {
    let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1")
        .bind(id)
        .fetch_optional(pool)
        .await?;
    Ok(user)
}
