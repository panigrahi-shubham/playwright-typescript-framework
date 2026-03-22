export function generateRandomEmail() : string {
    const random = Math.random().toString(36).substring(2,8);
    return `test_${random}@mail.com` ;

}

export function genearateRandomphone() : string {
    return (Math.floor(Math.random() * 9000000000 ) + 1000000000).toString() ;
}
export function generateRandomName(): string {
  const firstNames = ["Alex", "Sam", "Jordan", "Taylor", "Morgan"];
  const lastNames  = ["Kumar", "Patel", "Singh", "Shah", "Mehta"];
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last  = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
}
export function getFormattedDate(): string {
  return new Date().toISOString().split("T")[0];
}

import { Page } from "@playwright/test";

export async function waitForElementAndClick(page: Page, selector: string): Promise<void> {
  await page.locator(selector).waitFor({ state: "visible" });
  await page.locator(selector).click();
}