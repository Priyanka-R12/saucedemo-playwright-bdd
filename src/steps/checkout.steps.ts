import { Given, When, Then } from '@cucumber/cucumber';
import { Page, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

let page: Page;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

Given('I have items in my cart', async function () {
  page = this.page;
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);

  await cartPage.goToCart();
  await page.waitForSelector('[data-test="cart-contents-container"]', { timeout: 10000 });
  await page.waitForSelector('.cart_item', { timeout: 10000 });

  const itemCount = await page.locator('.cart_item').count();
  console.log('Found ${itemCount} item(s) in cart');

  if (itemCount === 0) {
    throw new Error('Cart is empty — make sure items are added before this step.');
  }
});

Given('I have checkout information', async function () {
  page = this.page;
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);

  await cartPage.goToCart();
  await page.waitForSelector('[data-test="cart-contents-container"]', { timeout: 10000 });

  let itemCount = await page.locator('.cart_item').count();
  console.log('Cart initially has ${itemCount} item(s)');

  if (itemCount === 0) {
    console.log('Cart is empty — adding 3 default items');
    await page.goto('https://www.saucedemo.com/inventory.html');
    const buttons = await page.$$('button[data-test^="add-to-cart"]');

    for (let i = 0; i < 3; i++) {
      const button = buttons[i];
      if (button) {
        await button.click();
      } else {
        console.warn('No button found at index ${i}');
      }
    }

    await cartPage.goToCart();
    await page.waitForSelector('.cart_item', { timeout: 10000 });
    itemCount = await page.locator('.cart_item').count();
    console.log('Cart now has ${itemCount} item(s)');
  }

  await cartPage.checkout();
  await page.waitForSelector('[data-test="firstName"]', { timeout: 10000 });
});

When('I enter first name {string}, last name {string}, postal code {string}', async function (firstName: string, lastName: string, postalCode: string) {
  await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
});

When('I continue checkout', async function () {
  await checkoutPage.continueCheckout();
});

When('I complete checkout', async function () {
  await checkoutPage.finishCheckout();
});

Then('I return to products page', async function () {
  await checkoutPage.backToProducts();
});

Then('I logout from the application', async function () {
  await page.click('#react-burger-menu-btn');
  await page.waitForSelector('#logout_sidebar_link', { state: 'visible' });
  await page.click('#logout_sidebar_link');
  await expect(page).toHaveURL(/saucedemo\.com\/$/);
});
