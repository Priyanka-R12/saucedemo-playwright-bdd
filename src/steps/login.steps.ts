import { Given, When, Then } from '@cucumber/cucumber';
import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let page: Page;
let loginPage: LoginPage;

Given('I open the saucedemo homepage', async function () {
  page = this.page;
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  await loginPage.login(username, password);
});

Then('the login result should be {string}', async function (expected: string) {
  if (expected === 'success') {
    await expect(page).toHaveURL(/inventory/);
  } else {
    const error = await page.textContent('[data-test="error"]');
    if (expected === 'locked') {
      expect(error).toContain('locked out');
    } else if (expected === 'invalid') {
      expect(error).toContain('Username and password do not match');
    }
  }
});
