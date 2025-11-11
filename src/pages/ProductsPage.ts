import { Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private readonly sortMap = {
    'Price (low to high)': 'lohi',
    'Price (high to low)': 'hilo',
    'Name (A to Z)': 'az',
    'Name (Z to A)': 'za'
  } as const;

  async sortBy(option: string) {
    const value = this.sortMap[option as keyof typeof this.sortMap];
    if (!value) {
      throw new Error(`Invalid sort option: ${option}`);
    }
    await this.page.selectOption('[data-test="product-sort-container"]', value);
  }

  async getItemNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }
}