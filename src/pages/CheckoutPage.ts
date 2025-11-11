import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCheckoutInfo(first: string, last: string, zip: string) {
    await this.page.waitForSelector('[data-test="firstName"]', { timeout: 10000 });
    await this.page.fill('[data-test="firstName"]', first);
    await this.page.fill('[data-test="lastName"]', last);
    await this.page.fill('[data-test="postalCode"]', zip);
  }

  async continueCheckout() {
    await this.page.click('[data-test="continue"]');
    await this.page.waitForURL(/checkout-step-two/);
  }

  async finishCheckout() {
    await this.page.click('[data-test="finish"]');
    await this.page.waitForSelector('.complete-header', { timeout: 10000 });
  }

  async backToProducts() {
    await this.page.click('[data-test="back-to-products"]');
    await this.page.waitForURL(/inventory.html/);
  }
}
