
# Playwright TypeScript Automation Framework

End-to-end automation framework for [automationexercise.com](https://automationexercise.com)
built with Playwright and TypeScript using Page Object Model architecture.

## Tech Stack

- **Playwright** — browser automation and assertions
- **TypeScript** — typed test data, interfaces, strict compile-time checks
- **Page Object Model** — BasePage pattern with reusable page classes
- **Allure Reports** — detailed test reporting (Day 9)
- **GitHub Actions** — CI/CD pipeline (Day 10)

## Folder Structure

```
playwright-typescript-framework/
├── data/          # Typed test data — IUser, IProduct, ISearchTest
├── pages/         # Page Object classes — BasePage, HomePage, SearchPage
├── tests/         # Spec files
├── types/         # TypeScript interfaces
├── utils/         # Helper functions and constants
└── playwright.config.ts
```

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/panigrahi-shubham/playwright-typescript-framework
cd playwright-typescript-framework

# 2. Install dependencies
npm install

# 3. Install browsers
npx playwright install

# 4. Create .env file (see .env.example)
cp .env.example .env
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific file
npx playwright test day-interfaces.spec.ts

# Run with browser visible
npx playwright test --headed

# Run only smoke tests
npx playwright test --grep @smoke
```

Real-account login verification is opt-in. Set valid credentials in `.env` and enable:

```bash
RUN_AUTH_TESTS=true
```

## Reports

```bash
# Open HTML report
npx playwright show-report
```
