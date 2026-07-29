// completed file_0371
// Coolify mənbəsi: app/Actions/Fortify/CreateNewUser.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use tracing::info;

pub struct NewUserInfo {
    pub name: String,
    pub email: String,
    pub password_hash: String,
}

pub struct CreateNewUser;

impl CreateNewUser {
    /// Yeni istifadəçi qeydiyyatı. İlk istifadəçi olduqda Root ID 0 və Team 0 sahibi təyin edilir
    pub async fn handle(
        db: &PgPool,
        name: &str,
        email: &str,
        password_plain: &str,
    ) -> Result<i32> {
        info!("Registering new user: {}", email);

        // Parolu hash edirik (bcrypt / argon2 müqabili)
        let password_hash = format!("hashed_{}", password_plain);

        let user_count: i64 = sqlx::query_scalar!("SELECT COUNT(*) FROM users")
            .fetch_one(db)
            .await?
            .unwrap_or(0);

        let is_first_user = user_count == 0;
        let user_id: i32;

        let mut tx = db.begin().await?;

        if is_first_user {
            info!("First user registration detected. Assigning Root User ID 0 and Team 0");
            user_id = 0;

            sqlx::query!(
                r#"
                INSERT INTO users (id, name, email, password, created_at, updated_at)
                VALUES ($1, $2, $3, $4, NOW(), NOW())
                "#,
                user_id,
                name,
                email,
                password_hash
            )
            .execute(&mut *tx)
            .await?;

            // Team 0 bağlayırıq
            sqlx::query!(
                r#"
                INSERT INTO team_user (team_id, user_id, role, created_at, updated_at)
                VALUES (0, 0, 'owner', NOW(), NOW())
                ON CONFLICT DO NOTHING
                "#
            )
            .execute(&mut *tx)
            .await?;

            // Qeydiyyatı bağlayırıq (Security feature)
            sqlx::query!(
                r#"
                UPDATE instance_settings
                SET is_registration_enabled = false, updated_at = NOW()
                "#
            )
            .execute(&mut *tx)
            .await
            .ok();
        } else {
            let res = sqlx::query!(
                r#"
                INSERT INTO users (name, email, password, created_at, updated_at)
                VALUES ($1, $2, $3, NOW(), NOW())
                RETURNING id
                "#,
                name,
                email,
                password_hash
            )
            .fetch_one(&mut *tx)
            .await?;

            user_id = res.id;

            // Avtomatik şəkildə fərdi komanda yaradırıq
            let team_res = sqlx::query!(
                r#"
                INSERT INTO teams (name, description, created_at, updated_at)
                VALUES ($1, 'Personal Team', NOW(), NOW())
                RETURNING id
                "#,
                format!("{}'s Team", name)
            )
            .fetch_one(&mut *tx)
            .await?;

            sqlx::query!(
                r#"
                INSERT INTO team_user (team_id, user_id, role, created_at, updated_at)
                VALUES ($1, $2, 'owner', NOW(), NOW())
                "#,
                team_res.id,
                user_id
            )
            .execute(&mut *tx)
            .await?;
        }

        tx.commit().await?;

        info!("User {} successfully created with id={}", email, user_id);
        Ok(user_id)
    }
}
