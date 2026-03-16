# Playwright + TypeScript Automation Framework

This repository is my end-to-end test automation learning project, built to demonstrate practical QA engineering skills with Playwright and TypeScript.

## Interviewer Snapshot

- **Goal:** Build a maintainable UI automation framework using TypeScript and Playwright
- **Primary focus:** Test design, reliability, framework structure, and readable test code
- **Domain used for practice:** E-commerce user journeys
- **Timeline:** Active learning project, planned completion in **April 2026**

## What This Repo Demonstrates

- TypeScript-first test development
- Playwright test runner setup and cross-browser execution
- Page Object Model style organization
- Custom fixtures for reusable page objects
- Assertions, selectors, and synchronization handling
- Artifact generation (`playwright-report`, `test-results`) for debugging
- Progressive learning path (JavaScript fundamentals -> TypeScript -> Playwright usage)

## Project Structure

`/javascript`  
Foundational JavaScript practice modules (day-wise learning).

`/typescript`  
TypeScript concepts and exercises, including compiled output under `dist`.

`/playwright/src`  
Portfolio-ready framework code: page objects and custom fixtures.

`/playwright/tests/e2e`  
Runnable end-to-end tests intended for interview review.

`/playwright/tests/learning-lab`  
Day-wise Playwright learning exercises kept runnable in a separate suite.

## How To Evaluate Quickly

From repo root:

```bash
npm test
npm run report
```

## Current Status

- Framework code is separated from learning exercises
- Interview-facing tests and learning tests now live in separate folders
- Continuing to add stronger real-world scenarios and patterns

## Resume Positioning (Planned)

This project is being prepared as a portfolio repository to support resume submissions after course completion in April 2026, with emphasis on:

- practical automation engineering skills
- test framework readability and scalability
- interviewer-friendly documentation and structure
