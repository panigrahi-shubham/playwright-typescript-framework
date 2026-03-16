import { test, expect } from '@playwright/test';
test.describe('locator strategies', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

    });

    test('getByRole — preferred for interactive elements', async ({ page }) => {
        const productsLink = page.getByRole('link', { name: 'Products' });
        // getByRole → semantic, survives CSS changes and redesigns
        // 'link' = <a> tag | name: 'Products' = visible text must match
        await expect(productsLink).toBeVisible();
    });

    test('getByText — for visible text with no semantic role', async ({ page }) => {
        const text = page.getByText('Full-Fledged practice website for Automation Engineers').first();
        // getByText → finds by visible text content
        // Use .first() because the carousel has 3 slides with identical <h2> text
        await expect(text).toBeVisible();
    });

    test('getByPlaceholder — exact spelling required', async ({ page }) => {
        await page.goto('/products');
        // Search box only exists on the Products page, not the homepage
        const searchBox = page.getByPlaceholder('Search Product');
        // 'Search Product' NOT 'Search Products' — learned from Day 1 failure
        await expect(searchBox).toBeVisible();
    });

    test('getByAltText — for images', async ({ page }) => {
        const logo = page.getByAltText('Website for automation practice');
        // getByAltText → finds <img> by alt attribute — accessibility-friendly
        await expect(logo).toBeVisible();
    });


    test('locator CSS — last resort, document why', async ({ page }) => {
        await page.goto('/products');
        // Search button only exists on the Products page, not the homepage
        const searchBtn = page.locator('#submit_search');
        // CSS used here because search button has NO accessible name
        // getByRole('button', { name: 'Search' }) fails on this site
        // Documented: #submit_search is the only reliable locator available
        await expect(searchBtn).toBeVisible();
    });

    test('chaining — scope locator to header container', async ({ page }) => {
        const navbar = page.locator('#header');
        // Find the container first
        const productsInNavbar = navbar.getByRole('link', { name: 'Products' });
        // Now search ONLY inside #header — no false matches from page body
        await expect(productsInNavbar).toBeVisible();
    });


});
