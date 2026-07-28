-- completed mig_022
-- Converted from: 2023_03_27_081718_create_application_previews_table.php

CREATE TABLE IF NOT EXISTS application_previews (
    uuid VARCHAR(255),
    pull_request_id INTEGER,
    pull_request_html_url VARCHAR(255),
    pull_request_issue_comment_id INTEGER,
    fqdn VARCHAR(255),
    status VARCHAR(255),
    application_id BIGINT
);

DROP TABLE IF EXISTS application_previews;
