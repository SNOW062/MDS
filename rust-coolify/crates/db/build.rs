fn main() {
    // Force Cargo to recompile the db crate if any migration file changes
    println!("cargo:rerun-if-changed=../../migrations");
}
