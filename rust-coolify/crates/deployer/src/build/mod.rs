// completed be_1115
// Build modulunun giris noktesi

pub mod detect;
pub mod compose;
pub mod dockerfile;
pub mod nixpacks;
pub mod static_html;

pub use detect::detect_build_pack;

/// Build icra et — buildpack-e gore dogru strategiyani sec
pub async fn run(ctx: &crate::engine::DeployContext) -> anyhow::Result<String> {
    let image_tag = match ctx.build_pack.as_str() {
        "nixpacks" => nixpacks::build(ctx).await?,
        "dockerfile" => dockerfile::build(ctx).await?,
        "docker-compose" => compose::build(ctx).await?,
        "static" | "static_html" => static_html::build(ctx).await?,
        _ => nixpacks::build(ctx).await?, // default
    };
    Ok(image_tag)
}
