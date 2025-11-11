import { setWorldConstructor, Before, After, IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  this.browser = await chromium.launch({
    headless: true,
    slowMo: 50       
  });

  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});
