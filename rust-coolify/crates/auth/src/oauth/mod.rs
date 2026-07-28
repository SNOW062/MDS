// completed be_1047
//! OAuth2 providers. Coolify supports: GitHub, GitLab, Google, Azure, Bitbucket, Gitea.
//! OauthSetting fields: provider, client_id, client_secret, redirect_uri, tenant, base_url, enabled.

pub mod github;
pub mod gitlab;
pub mod google;
