import { Given, When, Then } from '@cucumber/cucumber';
import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

let page: Page;
let loginPage: LoginPage;
let cartPage: CartPage;
let productsPage: ProductsPage;
let checkoutPage: CheckoutPage;
let selectedItems: string[] = [];

Given('I am logged in as {string}', async function (username: string) {
  page = this.page;
  loginPage = new LoginPage(page);
  cartPage = new CartPage(page);
  productsPage = new ProductsPage(page);
  checkoutPage = new CheckoutPage(page);
  await loginPage.goto();
  await loginPage.login(username, 'secret_sauce');
});

When('I sort items by {string}', async function (option: string) {
  await productsPage.sortBy(option);
  await page.waitForTimeout(1000);
});

Then('the items list should be sorted by name ascending', async function () {
  const names = await productsPage.getItemNames();
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(sorted);
});

Then('the items list should be sorted by name descending', async function () {
  const names = await productsPage.getItemNames();
  const sorted = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sorted);
});

Then('the items list should be sorted by price ascending', async function () {
  const prices = await productsPage.getItemPrices();
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});

Then('the items list should be sorted by price descending', async function () {
  const prices = await productsPage.getItemPrices();
  const sorted = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sorted);
});

When('I select the first {int} items from the product list', { timeout: 20000 }, async function (count: number) {
  selectedItems = [];

  await page.waitForSelector('.inventory_item', { timeout: 10000 });
  const items = await page.locator('.inventory_item').elementHandles();

  for (let i = 0; i < Math.min(count, items.length); i++) {
    const item = items[i];
    if (!item) continue;

    const nameEl = await item.$('.inventory_item_name');
    const name = await nameEl?.textContent();
    if (!name) continue;

    selectedItems.push(name);
    console.log(`Selecting item: ${name}`);

    const button = await item.$('button[data-test^="add-to-cart"]');
    if (button) await button.click();
    await page.waitForTimeout(500);
  }
});

When('I go to the cart', async function () {
  console.log('Navigating to cart...');
  await cartPage.goToCart();
});

When('I remove the last 2 items from the cart', async function () {
  const removeButtons = await this.page.$$('[data-test^="remove"]');
  const count = removeButtons.length;
  const lastTwoIds = await Promise.all([
    removeButtons[count - 2].getAttribute('data-test'),
    removeButtons[count - 1].getAttribute('data-test')
  ]);

  for (const id of lastTwoIds) {
    const itemId = id?.replace('remove-', '');
    if (itemId) await cartPage.removeItem(itemId);
  }
  selectedItems.splice(-2, 2);
});
 

When('I continue shopping', async function () {
  await this.page.click('[data-test="continue-shopping"]');
});

When('I select 6th item from the product list', async function () {
  const items = await page.locator('.inventory_item').elementHandles();

  if (items.length < 6) {
    throw new Error(`Expected at least 6 items, but found only ${items.length}`);
  }
  const sixthItem = items[5];
  if (!sixthItem) {
    throw new Error('6th item is undefined');
  }
  const nameEl = await sixthItem.$('.inventory_item_name');
  const name = await nameEl?.textContent();
  if (name) {
    selectedItems.push(name.trim());
    console.log(`Selecting 6th item: ${name}`);
  }
  const button = await sixthItem.$('button[data-test^="add-to-cart"]');
  if (!button) {
    throw new Error('Add to cart button not found for 6th item');
  }
  await button.click();
});


Then('the cart should contain the expected items', async function () {
  const cartNames = await page.locator('.inventory_item_name').allTextContents();
  console.log('Cart contains:', cartNames);
  console.log('Expected items:', selectedItems);

  const missingItems = selectedItems.filter(item => !cartNames.includes(item));
  if (missingItems.length > 0) {
    throw new Error(`Missing items in cart: ${missingItems.join(', ')}`);
  }
});

When('I proceed to checkout', async function () {
  await cartPage.checkout();
});
