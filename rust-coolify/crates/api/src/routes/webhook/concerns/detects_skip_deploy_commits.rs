// completed file_0526
// Coolify: DetectsSkipDeployCommits

pub fn should_skip_deploy(commit_message: &str) -> bool {
    let lower = commit_message.to_lowercase();
    lower.contains("[skip deploy]")
        || lower.contains("[deploy skip]")
        || lower.contains("[cd skip]")
        || lower.contains("[skip cd]")
        || lower.contains("[ci skip]")
        || lower.contains("[skip ci]")
}
