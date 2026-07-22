# Multi-Stage Dockerfile for MasterDeploy (MD)

# 1. Build React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/ui
COPY MD/ui/package*.json ./
RUN npm ci --silent
COPY MD/ui ./
RUN npm run build

# 2. Build Rust Backend
FROM rust:1.92-slim AS backend-builder
WORKDIR /app
COPY MD/Cargo.toml ./
COPY MD/crates ./crates
COPY MD/ui ./ui
RUN cargo build --release --bin md-api

# 3. Final Production Container
FROM debian:bookworm-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    openssh-client \
    && rm -rf /var/lib/apt/lists/*

COPY --from=backend-builder /app/target/release/md-api /app/md-api
COPY --from=frontend-builder /app/ui/dist /app/ui/dist

EXPOSE 8000 3000 5173
ENV RUST_LOG=info

CMD ["/app/md-api"]
