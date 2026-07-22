# Multi-Stage Dockerfile for Coolify Rust

# 1. Build React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/ui
COPY coolify-rust/ui/package*.json ./
RUN npm ci --silent
COPY coolify-rust/ui ./
RUN npm run build

# 2. Build Rust Backend
FROM rust:1.92-slim AS backend-builder
WORKDIR /app
COPY coolify-rust/Cargo.toml coolify-rust/Cargo.lock ./
COPY coolify-rust/crates ./crates
COPY coolify-rust/ui ./ui
RUN cargo build --release --bin coolify-api

# 3. Final Production Container
FROM debian:bookworm-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    openssh-client \
    && rm -rf /var/lib/apt/lists/*

COPY --from=backend-builder /app/target/release/coolify-api /app/coolify-api
COPY --from=frontend-builder /app/ui/dist /app/ui/dist

EXPOSE 8000 3000
ENV RUST_LOG=info

CMD ["/app/coolify-api"]
