import {test,expect} from '@playwright/test';

test ('intentionally failing - wrong locator', async ({page}) => {

    await page.goto('/');
    
    // This button does not exist - test will fail here
    await page.getByRole('button', { name: 'NonExistentButton'}).click();
 // This line will never run because click() aboe times out
 await expect(page).toHaveURL('/nonexisten');
});

test('intentially failing - wrong assertion', async ({page}) => {
    await page.goto('/');

    // Page loads fine but assertion is wrong
    await expect(page).toHaveTitle('Wrong title that does not exist');

    // Use this to practice reading assertion failure message
});








    
