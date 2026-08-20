# Testing

## Methodology
- **Unit Testing**: Core business logic and components.
- **Integration Testing**: API endpoints, database interactions, external integrations (vTools).
- **E2E Testing**: Critical user journeys (e.g., RSVP to event, publish content).
- **Accessibility Testing**: Automated Lighthouse/axe runs (release requirement).

## Execution
- Verification must run before declaring tasks complete.
- CI pipeline enforces passing tests.

## DECISION REQUIRED
- Which testing frameworks will be standardized (e.g., Jest/Vitest for unit, Playwright/Cypress for E2E)?
