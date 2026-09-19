# Playwright + TypeScript Test Automation Framework

Automated test suite demonstrating end-to-end and API testing against the RealWorld (Conduit) application specification.

The main goal of this project is to showcase clean test architecture in TypeScript: using API requests to bypass repetitive UI steps, managing pages via custom fixtures, and maintaining isolated test data.

---

## Key Technical Decisions

- **State Seeding via API:** Instead of registering users through the UI form for every scenario, tests create accounts via `POST https://api.realworld.show/api/users` and inject the received JWT token directly into `localStorage`. This keeps UI tests focused on actual feature validation and speeds up execution.
- **Custom Fixtures (`test.extend`):** Page Objects are injected directly through Playwright fixtures, avoiding manual `new Page(page)` instantiation inside spec files.
- **Accessible Locators:** Selectors rely on user-facing roles and placeholders (`getByRole`, `getByPlaceholder`) rather than CSS classes or XPath.
- **Data Factory with Unit Tests:** Dynamic user payloads are generated using `@faker-js/faker` and validated with dedicated sub-second unit tests.
- **Environment Decoupling:** Target URLs for both UI and API are centralized in `src/config/env.config.ts` and can be overridden via environment variables.

---

## Project Structure

```text
src/
├── api/          # API clients for test setup and assertions
├── config/       # Centralized target URLs (UI & API)
├── fixtures/     # Custom Playwright test fixtures (DI)
├── pages/        # Page Object classes
└── utils/        # Data factories (Faker) and interfaces

tests/
├── api/          # Standalone API integration tests
├── e2e/          # User flows & hybrid UI tests
└── unit/         # Fast unit tests for utility functions
```

---

## Quick Start

1. **Install dependencies:**

   ```bash
   npm ci
   npx playwright install chromium
   ```

2. **Run all tests:**

   ```bash
   npx playwright test
   ```

3. **Run specific suites:**

   ```bash
   npx playwright test tests/e2e/     # UI tests
   npx playwright test tests/api/     # API tests
   npx playwright test tests/unit/    # Unit tests
   ```

4. **View HTML report:**
   ```bash
   npx playwright show-report
   ```

---

## CI/CD

Tests run automatically on every push to `main` using GitHub Actions (`.github/workflows/tests.yml`). The workflow sets up Node.js, installs dependencies, caches Playwright browsers, and executes the suite in headless mode.
