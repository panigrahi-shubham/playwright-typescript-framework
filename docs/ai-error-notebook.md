# AI Error Notebook — Day 13
## Tool: Cursor + @playwright/mcp + Claude Sonnet
## Date: April 5, 2026

### Category 1: Locator Quality
- AI prefers CSS class selectors (.add-to-cart) over data-qa when both are available
- Fix: always instruct AI to prefer data-qa in the prompt
- Instruction to add to every prompt: 'Use data-qa attributes where available'

### Category 2: Dialog / Alert Handling Timing
- AI registers page.on('dialog') AFTER the click that triggers the dialog
- This causes the dialog to be missed or cause a timeout
- Fix: always register dialog handlers BEFORE the action that triggers them
- Use page.once('dialog') not page.on('dialog') for one-time handlers

### Category 3: Modal Locator Specificity
- AI uses '.modal-footer a' which matches any anchor in any modal footer
- If the page has multiple modals, this becomes ambiguous
- Fix: use :has-text() to discriminate: 'a:has-text("Continue Shopping")'

### Category 4: Missing Network Interception Pattern
- When AI generates API tests, it does not use the dual assertion pattern
- It checks response.status() but not body.responseCode
- Fix: add 'Use the dual assertion pattern: HTTP status AND body.responseCode' to every API test generation prompt

### What AI Got Right (70%+ of output)
- BasePage inheritance: always correct
- TypeScript types: Page, Locator, Promise — correct when using Playwright
- Allure labels: correct format when pattern file is in @context
- Tag syntax: correct for v1.42+
- test.use({ storageState: undefined }) placement: correct at file top

### Prompt Improvements from Today
- Always add: 'Use data-qa attributes where available'
- Always add: 'Register dialog handlers before the action that triggers them'
- Always add: 'Use the dual assertion pattern for API calls'
- Always add: 'Use :has-text() with specific text for modal buttons'

