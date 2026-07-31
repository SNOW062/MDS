# 1. Build Stage: Rust Backend
FROM rust:alpine as backend-builder

RUN apk add --no-cache musl-dev pkgconfig openssl-dev openssl-libs-static

WORKDIR /app
COPY Cargo.toml Cargo.lock ./
COPY crates ./crates
COPY migrations ./migrations

RUN cargo build --release -p rc-api

# 2. Build Stage: Vite Frontend UI
FROM node:20-alpine as frontend-builder

WORKDIR /app/ui
COPY ui/package*.json ./
RUN npm install

COPY ui/ ./
RUN npm run build

# 3. Final Runtime Stage
FROM alpine:3.20

RUN apk add --no-cache ca-certificates tzdata openssl curl

WORKDIR /app

# Copy Rust Binary
COPY --from=backend-builder /app/target/release/rc-api /app/rc-api

# Copy UI Dist Artifacts
COPY --from=frontend-builder /app/ui/dist /app/ui/dist

EXPOSE 9000 5173

ENV APP_ENV=production
ENV RUST_LOG=info

CMD ["/app/rc-api"]
