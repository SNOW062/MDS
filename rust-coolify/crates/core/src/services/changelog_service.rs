// completed file_0971
// Changelog Service Engine for MasterDeploy Core Services

use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;
use uuid::Uuid;
use regex::Regex;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChangelogEntry {
    pub tag_name: String,
    pub title: String,
    pub content: String,
    pub content_html: String,
    pub published_at: String,
    pub is_read: bool,
}

pub struct ChangelogService;

impl ChangelogService {
    pub fn getEntries(&self, recent_months: usize) -> Vec<ChangelogEntry> {
        if Path::new("changelog.json").exists() {
            if let Some(data) = self.fetchChangelogData() {
                return data.into_iter()
                    .filter(|e| self.validateEntryData(e))
                    .map(|mut e| {
                        e.content_html = self.parseMarkdown(&e.content);
                        e
                    })
                    .collect();
            }
            return vec![];
        }

        let available_months = self.getAvailableMonths();
        let months_to_load: Vec<String> = available_months.into_iter().take(recent_months).collect();

        let mut entries = vec![];
        for month in months_to_load {
            entries.extend(self.getEntriesForMonth(&month));
        }
        entries.sort_by(|a, b| b.published_at.cmp(&a.published_at));
        entries
    }

    pub fn getAllEntries(&self) -> Vec<ChangelogEntry> {
        let available_months = self.getAvailableMonths();
        let mut entries = vec![];
        for month in available_months {
            entries.extend(self.getEntriesForMonth(&month));
        }
        entries.sort_by(|a, b| b.published_at.cmp(&a.published_at));
        entries
    }

    pub fn getEntriesForUser(&self, user_id: Uuid) -> Vec<ChangelogEntry> {
        let mut entries = self.getEntries(3);
        let read_identifiers = self.get_read_identifiers_for_user(user_id);

        for entry in &mut entries {
            entry.is_read = read_identifiers.contains(&entry.tag_name);
        }

        entries.sort_by(|a, b| {
            a.is_read.cmp(&b.is_read)
                .then_with(|| b.published_at.cmp(&a.published_at))
        });
        entries
    }

    pub fn getUnreadCountForUser(&self, user_id: Uuid) -> usize {
        let entries = self.getEntries(3);
        let read_identifiers = self.get_read_identifiers_for_user(user_id);
        entries.iter().filter(|e| !read_identifiers.contains(&e.tag_name)).count()
    }

    pub fn getAvailableMonths(&self) -> Vec<String> {
        let dir = Path::new("changelogs");
        if !dir.exists() || !dir.is_dir() {
            return vec![];
        }

        let mut months = vec![];
        if let Ok(entries) = fs::read_dir(dir) {
            for entry in entries.flatten() {
                let path = entry.path();
                if let Some(ext) = path.extension() {
                    if ext == "json" {
                        if let Some(stem) = path.file_stem().and_then(|s| s.to_str()) {
                            if Regex::new(r"^\d{4}-\d{2}$").unwrap().is_match(stem) {
                                months.push(stem.to_string());
                            }
                        }
                    }
                }
            }
        }
        months.sort();
        months.reverse();
        months
    }

    pub fn getEntriesForMonth(&self, month: &str) -> Vec<ChangelogEntry> {
        let path = format!("changelogs/{}.json", month);
        if !Path::new(&path).exists() {
            return vec![];
        }

        if let Ok(content) = fs::read_to_string(&path) {
            if let Ok(json_data) = serde_json::from_str::<serde_json::Value>(&content) {
                if let Some(entries_array) = json_data.get("entries").and_then(|v| v.as_array()) {
                    return entries_array.iter()
                        .filter_map(|val| {
                            let tag_name = val.get("tag_name")?.as_str()?.to_string();
                            let title = val.get("title")?.as_str()?.to_string();
                            let content_text = val.get("content")?.as_str()?.to_string();
                            let published_at = val.get("published_at")?.as_str()?.to_string();

                            let mut entry = ChangelogEntry {
                                tag_name,
                                title,
                                content: content_text.clone(),
                                content_html: self.parseMarkdown(&content_text),
                                published_at,
                                is_read: false,
                            };
                            if self.validateEntryData(&entry) {
                                Some(entry)
                            } else {
                                None
                            }
                        })
                        .collect();
                }
            }
        }
        vec![]
    }

    fn fetchChangelogData(&self) -> Option<Vec<ChangelogEntry>> {
        if Path::new("changelog.json").exists() {
            if let Ok(content) = fs::read_to_string("changelog.json") {
                if let Ok(json_data) = serde_json::from_str::<serde_json::Value>(&content) {
                    if let Some(arr) = json_data.get("entries").and_then(|v| v.as_array()) {
                        let mut res = vec![];
                        for val in arr {
                            if let (Some(t), Some(title), Some(c), Some(p)) = (
                                val.get("tag_name").and_then(|s| s.as_str()),
                                val.get("title").and_then(|s| s.as_str()),
                                val.get("content").and_then(|s| s.as_str()),
                                val.get("published_at").and_then(|s| s.as_str()),
                            ) {
                                res.push(ChangelogEntry {
                                    tag_name: t.to_string(),
                                    title: title.to_string(),
                                    content: c.to_string(),
                                    content_html: self.parseMarkdown(c),
                                    published_at: p.to_string(),
                                    is_read: false,
                                });
                            }
                        }
                        return Some(res);
                    }
                }
            }
        }
        None
    }

    pub fn markAsReadForUser(&self, version: &str, user_id: Uuid) {
        tracing::info!("User {} marked changelog version {} as read", user_id, version);
        self.clearAllUserCaches();
    }

    pub fn markAllAsReadForUser(&self, user_id: Uuid) {
        let entries = self.getEntries(3);
        for entry in entries {
            self.markAsReadForUser(&entry.tag_name, user_id);
        }
    }

    fn validateEntryData(&self, entry: &ChangelogEntry) -> bool {
        !entry.tag_name.is_empty() && !entry.title.is_empty() && !entry.content.is_empty() && !entry.published_at.is_empty()
    }

    pub fn clearAllReadStatus(&self) -> Result<()> {
        self.clearAllUserCaches();
        Ok(())
    }

    fn clearAllUserCaches(&self) {
        tracing::debug!("Cleared changelog caches for all users");
    }

    fn parseMarkdown(&self, content: &str) -> String {
        let html = format!("<p>{}</p>", content);
        self.applyCustomStyling(&html)
    }

    fn applyCustomStyling(&self, html: &str) -> String {
        let mut styled = html.to_string();
        styled = styled.replace("<h1>", "<h1 class=\"text-xl font-bold dark:text-white mb-2\">");
        styled = styled.replace("<h2>", "<h2 class=\"text-lg font-semibold dark:text-white mb-2\">");
        styled = styled.replace("<p>", "<p class=\"mb-2 dark:text-neutral-300\">");
        styled = styled.replace("<ul>", "<ul class=\"mb-2 ml-4 list-disc\">");
        styled
    }

    fn get_read_identifiers_for_user(&self, _user_id: Uuid) -> Vec<String> {
        vec![]
    }
}
