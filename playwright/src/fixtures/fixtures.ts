import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

type PageFixtures = {
  homePage: HomePage;
  searchPage: SearchPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
});

export { expect };
