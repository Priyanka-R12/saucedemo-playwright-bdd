# Playwright BDD (TypeScript) — saucedemo tests

This framework automates key user flows on the SauceDemo
 application, including:

1) Login with valid and invalid credentials
2) Adding multiple items to the shopping cart
3) Sorting items by price and name
4) Completing the checkout process end-to-end

Features

-BDD with Cucumber — Readable, Gherkin-style feature files
-Page Object Model (POM) — Clean, modular page classes
-TypeScript + Playwright — Modern and reliable test stack
-Cucumber HTML Report — Auto-generated test execution report
-GitHub Actions CI — Automated test runs and HTML report upload

Quick Start (Local Setup)
1. Prerequisites
- Node.js (v18 or above)
- npm (comes with Node)

2. Clone and Install
git clone <your-repo-url>
cd saucedemo-playwright-bdd
npm install
npx playwright install

3. Run Tests Locally
# Run all feature files
npm test/ npx cucumber-js
After execution, view the generated HTML report (e.g., reports/cucumber-report.html).

Continuous Integration (GitHub Actions)

A pre-configured workflow is included under .github/workflows/playwright.yml.
When you push this repo to GitHub, it will automatically:

- Install dependencies
- Run Playwright + Cucumber tests
- Generate and upload an HTML test report