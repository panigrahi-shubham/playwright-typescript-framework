# Playwright TypeScript Automation Framework

End-to-end automation framework for [automationexercise.com](https://automationexercise.com)
built with Playwright and TypeScript using Page Object Model architecture.

## Tech Stack

- **Playwright** - browser automation and assertions
- **TypeScript** - typed test data, interfaces, strict compile-time checks
- **Page Object Model** - BasePage pattern with reusable page classes
- **Allure Reports** - detailed test reporting
- **GitHub Actions** - CI/CD pipeline support

## Folder Structure

```text
playwright-typescript-framework/
|-- data/          # Typed test data
|-- pages/         # Page Object classes
|-- tests/         # Spec files and fixtures
|-- types/         # TypeScript interfaces
|-- utils/         # Helper functions and constants
`-- playwright.config.ts
```

## Setup

```bash
git clone https://github.com/panigrahi-shubham/playwright-typescript-framework
cd playwright-typescript-framework
npm install
npx playwright install
cp .env.example .env
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run end-to-end tests
npm run test:e2e

# Run smoke tests
npm run test:smoke

# Run with browser visible
npm run test:headed

# Run CI-friendly e2e settings
npm run test:ci

# Run network interception coverage
npm run network
```

## Parallelism And Smoke Tags

- `fullyParallel: true` allows independent tests to run concurrently.
- `workers` falls back to `1` in CI to keep the suite stable on smaller runners.
- Add `@smoke` to a test title when it belongs in the fast validation path.

```ts
test('homepage title is correct @smoke', async ({ homePage }) => {
  await expect(homePage.page).toHaveTitle(/Automation Exercise/);
});
```

Real-account login verification is opt-in. Set valid credentials in `.env` and enable:

```bash
RUN_AUTH_TESTS=true
```

## Auth State

Authenticated coverage uses `global-setup.ts` to log in once and save storage state to `playwright/.auth/user.json`.

Required environment variables:

```bash
RUN_AUTH_TESTS=true
TEST_EMAIL=your-registered-email@example.com
TEST_PASSWORD=your-real-password
```

Run authenticated tests:

```bash
# Run authenticated coverage only
npm run auth

# Run authenticated + network-tagged tests
npm run network -- --grep @auth
```

Notes:

- `playwright/.auth/` is gitignored because it contains live session data.
- If `RUN_AUTH_TESTS` is not `true`, global setup skips login and authenticated specs are skipped.
- Public login/signup specs stay unauthenticated by design.

## Network Interception

Network interception coverage lives in [tests/network-interception.spec.ts](/C:/Projects/playwright-typescript-framework/playwright/tests/network-interception.spec.ts).

Current live-site behavior on `automationexercise.com` is server-rendered for products/search, so the suite intercepts:

- `/products`
- `/products?search=...`
- `/get_product_picture/...`

That gives us working coverage for:

- mocked document responses
- empty states
- `500` responses
- aborted asset requests
- fetch-and-modify flows
- request/response verification

## Reports

```bash
npx playwright show-report
```
