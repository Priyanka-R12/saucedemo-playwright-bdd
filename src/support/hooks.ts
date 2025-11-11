import { Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

class CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
}

setWorldConstructor(CustomWorld);

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});
