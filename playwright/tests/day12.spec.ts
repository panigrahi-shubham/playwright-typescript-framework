import { test, expect } from '@playwright/test';
// import test and expect from Playwright
// required in EVERY test file — without this, nothing works

test.describe('Homepage Tests', () => {
  // test.describe() → groups related tests together under one label
  // purpose 1: reports show "Homepage Tests > homepage title is correct"
  // purpose 2: beforeEach inside describe only runs for tests in THIS describe
  // purpose 3: clean separation — one describe per page or feature

  test.beforeEach(async ({ page }) => {
    // beforeEach → runs automatically before EVERY test inside this describe
    // removes duplication: instead of page.goto() in each test, write it once
    // DRY = Don't Repeat Yourself — golden rule of clean code

    await page.goto('/');
    // '/' → Playwright adds baseURL from config: https://automationexercise.com/
    // NEVER write: await page.goto('https://automationexercise.com')
    // reason: if URL changes, you update config ONCE, not every test file
  });

  test('homepage title is correct', async ({ page }) => {
    // TEST 1: most basic check — does the page have the right title?
    // if this fails: either wrong URL in config OR site is down

    await expect(page).toHaveTitle(/Automation Exercise/);
    // expect(page) → asserting something about the whole page
    // .toHaveTitle() → checks the HTML <title> tag
    // /Automation Exercise/ → regex: passes if title CONTAINS this text
    // page.goto already done by beforeEach — no need to repeat it
  });

  test('logo is visible on homepage', async ({ page }) => {
    // TEST 2: verify brand logo loads correctly
    // if logo is invisible: page layout is broken or CSS failed to load

    const logo = page.getByAltText('Website for automation practice');
    // getByAltText() → finds <img> element by its alt attribute
    // PREFERRED over: page.locator('img[alt="..."]') — same result, more readable
    // alt text = the text that appears when image fails to load
    //           = what screen readers read to visually impaired users

    await expect(logo).toBeVisible();
    // toBeVisible() → checks:
    //   1. element EXISTS in the DOM
    //   2. element is VISIBLE (not hidden by display:none or visibility:hidden)
    //   3. element has non-zero size
    // if any of these fail → assertion fails
  });

  test('navbar has Home and Products links', async ({ page }) => {
    // TEST 3: critical navigation test
    // if nav links break → users cannot move between pages

    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    // getByRole('link') → finds <a> anchor/link elements
    // { name: 'Home' } → visible text of the link must be exactly 'Home'
    // MOST RECOMMENDED LOCATOR STRATEGY
    // reason: HTML role is semantic — it survives CSS class changes

    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
    // both links checked in same test → if either missing, test fails
    // you could write separate tests for each — this is a judgment call
    // same test: faster to run | separate tests: clearer failure message
  });

  test('search box accepts text input', async ({ page }) => {
    // TEST 4: verify search field is interactive
    // if this fails: search box might be disabled or covered by another element

    await page.goto('/products');
    // search box only exists on /products page, not on homepage
    // beforeEach goes to '/' so we navigate here explicitly

    const searchBox = page.getByRole('textbox', { name: 'Search Product' });
    // getByRole('textbox') → finds input fields by their ARIA role
    // { name: 'Search Product' } → matches via label or placeholder text
    // tied to the field's PURPOSE, not its CSS styling

    await searchBox.fill('shirt');
    // fill() → 1. clears existing value, 2. types new value instantly
    // PREFERRED over type() for almost all inputs
    // faster and more reliable than simulating keystrokes

    await expect(searchBox).toHaveValue('shirt');
    // toHaveValue() → checks current value INSIDE the input field
    // not the same as toHaveText() — that checks visible text of elements
    // toHaveValue = for inputs | toHaveText = for divs, spans, headings
  });

  test('searching for a product shows results', async ({ page }) => {
    // TEST 5: full end-to-end user flow
    // this is the most valuable test — tests REAL user behaviour
    // combines: input → action → navigation → assertion in sequence

    test.setTimeout(60000);
    // give this test 60 seconds instead of default 30
    // reason: this test does search + page navigation, which is slower
    // test.setTimeout() only affects THIS test, not others

    await page.goto('/products');
    // navigate to products page first — search only works here

    await page.getByRole('textbox', { name: 'Search Product' }).fill('shirt');
    // typing the search term

    await page.locator('#submit_search').click();
    // the search button has NO text — it's just a magnifying glass icon
    // so getByRole('button', { name: 'Search' }) won't work here
    // locator('#submit_search') → finds element by its CSS ID selector
    // when getByRole() can't find an element, fall back to ID or CSS selectors

    await expect(page).toHaveURL(/search/);
    // toHaveURL() → checks current browser URL
    // /search/ → regex: URL must CONTAIN the word 'search'
    // confirms: clicking Search button actually navigated to results page

    await expect(page.getByText('Searched Products')).toBeVisible();
    // getByText() → finds element by its visible text content
    // double verification: URL changed AND the heading appeared
    // if URL changes but heading doesn't appear → page loaded but content failed
  });
});