import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCart() {
    console.log('Navigating to cart...');
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async removeItem(itemId: string) {
    console.log(`Removing item: ${itemId}`);
    await this.page.locator(`[data-test="remove-${itemId}"]`).click();
  }

  async continueShopping() {
    console.log('Clicking continue shopping...');
    await this.page.locator('[data-test="continue-shopping"]').click();
  }

  async checkout() {
    console.log('Proceeding to checkout...');
    await this.page.locator('[data-test="checkout"]').click();
  }

}