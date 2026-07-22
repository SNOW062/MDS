# Multi-Stage Dockerfile for MasterDeploy (MD) with Docker Layer Caching

# 1. Build React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/ui
COPY MD/ui/package*.json ./
RUN npm ci --silent
COPY MD/ui ./
RUN npm run build

# 2. Build Rust Backend with Cargo Dependency Caching
FROM rust:1.92-slim AS backend-builder
WORKDIR /app

# Copy workspace manifest files
COPY MD/Cargo.toml ./
COPY MD/crates/api/Cargo.toml ./crates/api/Cargo.toml
COPY MD/crates/core/Cargo.toml ./crates/core/Cargo.toml
COPY MD/crates/db/Cargo.toml ./crates/db/Cargo.toml

# Create dummy source files to pre-build and cache cargo dependencies
RUN mkdir -p crates/api/src crates/core/src crates/db/src && \
    echo "fn main() {}" > crates/api/src/main.rs && \
    echo "pub fn dummy() {}" > crates/core/src/lib.rs && \
    echo "pub fn dummy() {}" > crates/db/src/lib.rs && \
    cargo build --release --bin coolify-api || true

# Copy real source code and build final binary using cached dependencies
COPY MD/crates ./crates
RUN touch crates/core/src/lib.rs crates/db/src/lib.rs && cargo build --release --bin coolify-api

# 3. Final Production Container
FROM rust:1.92-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    openssh-client \
    && rm -rf /var/lib/apt/lists/*

COPY --from=backend-builder /app/target/release/coolify-api /app/md-api
COPY --from=frontend-builder /app/ui/dist /app/ui/dist

EXPOSE 8000 3000 5173
ENV RUST_LOG=info

CMD ["/app/md-api"]
