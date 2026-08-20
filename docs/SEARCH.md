# Search

## Scope
- Public search: Events, resources, people.
- Private search: Institutional records, audit logs.

## Architecture
- Full-text search capability.
- Depending on scale, leverage database native search (e.g., Postgres full-text search) before introducing external dependencies like Elasticsearch/Algolia.

## DECISION REQUIRED
- Is Postgres native search sufficient for our performance and typo-tolerance requirements?
