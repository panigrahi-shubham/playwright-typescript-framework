# Playwright Project

This folder contains the interview-facing automation framework.

## Structure

`src/pages`
Page Object Model classes for reusable browser interactions.

`src/fixtures`
Custom Playwright fixtures that inject page objects into tests.

`tests/e2e`
Runnable portfolio tests that demonstrate the framework design.

`tests/learning-lab`
Day-wise Playwright learning specs that you can still run during practice.

## Run

```bash
npx playwright test
npx playwright show-report
```

Run only the interview-facing suite:

```bash
npx playwright test tests/e2e
```

Run only the learning suite:

```bash
npx playwright test tests/learning-lab
```
