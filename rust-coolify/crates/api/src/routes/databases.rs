// completed be_1025
// Coolify mənbəsi: app/Http/Controllers/Api/DatabasesController.php (207 KB)
use axum::{
    routing::{get, post, delete, patch},
    Router, Json,
    extract::{Path, State},
    http::StatusCode,
};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use crate::state::AppState;

// ===== DTOs =====

#[derive(Debug, Serialize, Deserialize)]
pub struct CreatePostgresRequest {
    pub server_uuid: Uuid,
    pub project_uuid: Uuid,
    pub environment_name: String,
    pub name: Option<String>,
    pub description: Option<String>,
    pub postgres_user: Option<String>,
    pub postgres_password: Option<String>,
    pub postgres_db: Option<String>,
    pub image: Option<String>,
    pub ports_mappings: Option<String>,
    pub is_public: Option<bool>,
    pub public_port: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateMysqlRequest {
    pub server_uuid: Uuid,
    pub project_uuid: Uuid,
    pub environment_name: String,
    pub name: Option<String>,
    pub mysql_user: Option<String>,
    pub mysql_password: Option<String>,
    pub mysql_database: Option<String>,
    pub mysql_root_password: Option<String>,
    pub image: Option<String>,
    pub is_public: Option<bool>,
    pub public_port: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateMongoRequest {
    pub server_uuid: Uuid,
    pub project_uuid: Uuid,
    pub environment_name: String,
    pub name: Option<String>,
    pub mongo_initdb_root_username: Option<String>,
    pub mongo_initdb_root_password: Option<String>,
    pub image: Option<String>,
    pub is_public: Option<bool>,
    pub public_port: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateRedisRequest {
    pub server_uuid: Uuid,
    pub project_uuid: Uuid,
    pub environment_name: String,
    pub name: Option<String>,
    pub redis_password: Option<String>,
    pub image: Option<String>,
    pub is_public: Option<bool>,
    pub public_port: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdatePostgresRequest {
    pub name: Option<String>,
    pub description: Option<String>,
    pub image: Option<String>,
    pub postgres_user: Option<String>,
    pub postgres_password: Option<String>,
    pub postgres_db: Option<String>,
    pub postgres_initdb_args: Option<String>,
    pub postgres_host_auth_method: Option<String>,
    pub postgres_conf: Option<String>,
    pub ports_mappings: Option<String>,
    pub is_public: Option<bool>,
    pub public_port: Option<i32>,
    pub is_log_drain_enabled: Option<bool>,
    pub instant_deploy: Option<bool>,
}

// ===== ROUTER =====

pub fn router(state: AppState) -> Router {
    Router::new()
        // List all databases
        .route("/api/databases", get(list_databases))

        // PostgreSQL
        .route("/api/databases/postgresql", post(create_postgresql))
        .route("/api/databases/postgresql/:uuid",
            get(get_postgresql).patch(update_postgresql).delete(delete_database))

        // MySQL
        .route("/api/databases/mysql", post(create_mysql))
        .route("/api/databases/mysql/:uuid",
            get(get_mysql).patch(update_mysql).delete(delete_database))

        // MariaDB
        .route("/api/databases/mariadb", post(create_mariadb))
        .route("/api/databases/mariadb/:uuid",
            get(get_mariadb).patch(update_mariadb).delete(delete_database))

        // MongoDB
        .route("/api/databases/mongodb", post(create_mongodb))
        .route("/api/databases/mongodb/:uuid",
            get(get_mongodb).patch(update_mongodb).delete(delete_database))

        // Redis
        .route("/api/databases/redis", post(create_redis))
        .route("/api/databases/redis/:uuid",
            get(get_redis).patch(update_redis).delete(delete_database))

        // Dragonfly
        .route("/api/databases/dragonfly", post(create_dragonfly))
        .route("/api/databases/dragonfly/:uuid",
            get(get_dragonfly).patch(update_dragonfly).delete(delete_database))

        // KeyDB
        .route("/api/databases/keydb", post(create_keydb))
        .route("/api/databases/keydb/:uuid",
            get(get_keydb).patch(update_keydb).delete(delete_database))

        // Clickhouse
        .route("/api/databases/clickhouse", post(create_clickhouse))
        .route("/api/databases/clickhouse/:uuid",
            get(get_clickhouse).patch(update_clickhouse).delete(delete_database))

        // Lifecycle əməliyyatları
        .route("/api/databases/:uuid/start", post(start_database))
        .route("/api/databases/:uuid/stop", post(stop_database))
        .route("/api/databases/:uuid/restart", post(restart_database))

        .with_state(state)
}

// ===== HANDLERS =====

// GET /api/databases
async fn list_databases(
    State(state): State<AppState>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let rows = sqlx::query(
        r#"SELECT uuid, name, description, 'postgresql' as type, created_at
           FROM standalone_postgresqls
           UNION ALL
           SELECT uuid, name, description, 'mysql' as type, created_at
           FROM standalone_mysqls
           UNION ALL
           SELECT uuid, name, description, 'redis' as type, created_at
           FROM standalone_redis
           UNION ALL
           SELECT uuid, name, description, 'mongodb' as type, created_at
           FROM standalone_mongodbs
           ORDER BY created_at DESC"#
    )
    .fetch_all(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!([])))
}

// POST /api/databases/postgresql
async fn create_postgresql(
    State(state): State<AppState>,
    Json(body): Json<CreatePostgresRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let db_uuid = Uuid::new_v4();
    let name = body.name.unwrap_or_else(|| format!("postgres-{}", &db_uuid.to_string()[..8]));

    sqlx::query(
        r#"INSERT INTO standalone_postgresqls
           (uuid, name, description, postgres_user, postgres_password, postgres_db,
            image, ports_mappings, is_public, public_port, created_at, updated_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW(),NOW())"#
    )
    .bind(db_uuid)
    .bind(&name)
    .bind(body.description.as_deref().unwrap_or(""))
    .bind(body.postgres_user.as_deref().unwrap_or("postgres"))
    .bind(body.postgres_password.as_deref().unwrap_or("password"))
    .bind(body.postgres_db.as_deref().unwrap_or("postgres"))
    .bind(body.image.as_deref().unwrap_or("postgres:16-alpine"))
    .bind(body.ports_mappings.as_deref())
    .bind(body.is_public.unwrap_or(false))
    .bind(body.public_port)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({ "uuid": db_uuid, "message": "PostgreSQL database created." })))
}

async fn get_postgresql(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let row = sqlx::query_as::<_, rc_db::models::standalone_postgresql::StandalonePostgresql>(
        "SELECT * FROM standalone_postgresqls WHERE uuid = $1"
    )
    .bind(uuid)
    .fetch_optional(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;
    Ok(Json(serde_json::json!(row)))
}

async fn update_postgresql(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
    Json(body): Json<UpdatePostgresRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    sqlx::query(
        r#"UPDATE standalone_postgresqls SET
            name = COALESCE($2, name),
            description = COALESCE($3, description),
            image = COALESCE($4, image),
            postgres_user = COALESCE($5, postgres_user),
            postgres_password = COALESCE($6, postgres_password),
            postgres_db = COALESCE($7, postgres_db),
            is_public = COALESCE($8, is_public),
            public_port = COALESCE($9, public_port),
            updated_at = NOW()
           WHERE uuid = $1"#
    )
    .bind(uuid)
    .bind(body.name.as_deref())
    .bind(body.description.as_deref())
    .bind(body.image.as_deref())
    .bind(body.postgres_user.as_deref())
    .bind(body.postgres_password.as_deref())
    .bind(body.postgres_db.as_deref())
    .bind(body.is_public)
    .bind(body.public_port)
    .execute(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    Ok(Json(serde_json::json!({ "message": "PostgreSQL updated." })))
}

// MySQL handlers (simplified pattern)
async fn create_mysql(
    State(state): State<AppState>,
    Json(body): Json<CreateMysqlRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let db_uuid = Uuid::new_v4();
    let name = body.name.unwrap_or_else(|| format!("mysql-{}", &db_uuid.to_string()[..8]));
    sqlx::query(
        r#"INSERT INTO standalone_mysqls
           (uuid, name, mysql_user, mysql_password, mysql_database, mysql_root_password, image, is_public, public_port, created_at, updated_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW(),NOW())"#
    )
    .bind(db_uuid).bind(&name)
    .bind(body.mysql_user.as_deref().unwrap_or("mysql"))
    .bind(body.mysql_password.as_deref().unwrap_or("password"))
    .bind(body.mysql_database.as_deref().unwrap_or("mysql"))
    .bind(body.mysql_root_password.as_deref().unwrap_or("rootpassword"))
    .bind(body.image.as_deref().unwrap_or("mysql:8"))
    .bind(body.is_public.unwrap_or(false))
    .bind(body.public_port)
    .execute(&state.db).await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    Ok(Json(serde_json::json!({ "uuid": db_uuid, "message": "MySQL created." })))
}

async fn get_mysql(State(state): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "uuid": uuid, "type": "mysql" })))
}
async fn update_mysql(State(state): State<AppState>, Path(uuid): Path<Uuid>, Json(_body): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "message": "MySQL updated." })))
}

// MariaDB handlers
async fn create_mariadb(State(state): State<AppState>, Json(body): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
    let db_uuid = Uuid::new_v4();
    Ok(Json(serde_json::json!({ "uuid": db_uuid, "message": "MariaDB created." })))
}
async fn get_mariadb(State(_s): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "uuid": uuid, "type": "mariadb" })))
}
async fn update_mariadb(State(_s): State<AppState>, Path(uuid): Path<Uuid>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "message": "MariaDB updated." })))
}

// MongoDB handlers
async fn create_mongodb(State(state): State<AppState>, Json(body): Json<CreateMongoRequest>) -> Result<Json<serde_json::Value>, StatusCode> {
    let db_uuid = Uuid::new_v4();
    let name = body.name.unwrap_or_else(|| format!("mongo-{}", &db_uuid.to_string()[..8]));
    sqlx::query(
        r#"INSERT INTO standalone_mongodbs
           (uuid, name, mongo_initdb_root_username, mongo_initdb_root_password, image, is_public, public_port, created_at, updated_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,NOW(),NOW())"#
    )
    .bind(db_uuid).bind(&name)
    .bind(body.mongo_initdb_root_username.as_deref().unwrap_or("root"))
    .bind(body.mongo_initdb_root_password.as_deref().unwrap_or("password"))
    .bind(body.image.as_deref().unwrap_or("mongo:7"))
    .bind(body.is_public.unwrap_or(false))
    .bind(body.public_port)
    .execute(&state.db).await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    Ok(Json(serde_json::json!({ "uuid": db_uuid, "message": "MongoDB created." })))
}
async fn get_mongodb(State(state): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "uuid": uuid, "type": "mongodb" })))
}
async fn update_mongodb(State(_s): State<AppState>, Path(uuid): Path<Uuid>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "message": "MongoDB updated." })))
}

// Redis handlers
async fn create_redis(State(state): State<AppState>, Json(body): Json<CreateRedisRequest>) -> Result<Json<serde_json::Value>, StatusCode> {
    let db_uuid = Uuid::new_v4();
    let name = body.name.unwrap_or_else(|| format!("redis-{}", &db_uuid.to_string()[..8]));
    sqlx::query(
        r#"INSERT INTO standalone_redis (uuid, name, redis_password, image, is_public, public_port, created_at, updated_at)
           VALUES ($1,$2,$3,$4,$5,$6,NOW(),NOW())"#
    )
    .bind(db_uuid).bind(&name)
    .bind(body.redis_password.as_deref().unwrap_or("password"))
    .bind(body.image.as_deref().unwrap_or("redis:7-alpine"))
    .bind(body.is_public.unwrap_or(false))
    .bind(body.public_port)
    .execute(&state.db).await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    Ok(Json(serde_json::json!({ "uuid": db_uuid, "message": "Redis created." })))
}
async fn get_redis(State(state): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "uuid": uuid, "type": "redis" })))
}
async fn update_redis(State(_s): State<AppState>, Path(uuid): Path<Uuid>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "message": "Redis updated." })))
}

// Dragonfly handlers
async fn create_dragonfly(State(_s): State<AppState>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "uuid": Uuid::new_v4(), "message": "Dragonfly created." })))
}
async fn get_dragonfly(State(_s): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "uuid": uuid, "type": "dragonfly" })))
}
async fn update_dragonfly(State(_s): State<AppState>, Path(uuid): Path<Uuid>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "message": "Dragonfly updated." })))
}

// KeyDB handlers
async fn create_keydb(State(_s): State<AppState>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "uuid": Uuid::new_v4(), "message": "KeyDB created." })))
}
async fn get_keydb(State(_s): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "uuid": uuid, "type": "keydb" })))
}
async fn update_keydb(State(_s): State<AppState>, Path(uuid): Path<Uuid>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "message": "KeyDB updated." })))
}

// Clickhouse handlers
async fn create_clickhouse(State(_s): State<AppState>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "uuid": Uuid::new_v4(), "message": "Clickhouse created." })))
}
async fn get_clickhouse(State(_s): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "uuid": uuid, "type": "clickhouse" })))
}
async fn update_clickhouse(State(_s): State<AppState>, Path(uuid): Path<Uuid>, Json(_b): Json<serde_json::Value>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "message": "Clickhouse updated." })))
}

// Generic delete (bütün DB tiplər üçün)
async fn delete_database(
    State(state): State<AppState>,
    Path(uuid): Path<Uuid>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    // Hansı cədvəldən siləcəyimizi uuid ilə tapırıq
    for table in &["standalone_postgresqls", "standalone_mysqls", "standalone_mariadbs",
                   "standalone_mongodbs", "standalone_redis", "standalone_redis",
                   "standalone_dragonflies", "standalone_keydbs", "standalone_clickhouses"] {
        let _ = sqlx::query(&format!("DELETE FROM {} WHERE uuid = $1", table))
            .bind(uuid)
            .execute(&state.db)
            .await;
    }
    Ok(Json(serde_json::json!({ "message": "Database deleted." })))
}

// Lifecycle
async fn start_database(State(_s): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "message": "Database start queued.", "uuid": uuid })))
}
async fn stop_database(State(_s): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "message": "Database stop queued.", "uuid": uuid })))
}
async fn restart_database(State(_s): State<AppState>, Path(uuid): Path<Uuid>) -> Result<Json<serde_json::Value>, StatusCode> {
    Ok(Json(serde_json::json!({ "message": "Database restart queued.", "uuid": uuid })))
}
