import { test, expect } from '@playwright/test';
require('dotenv').config({ path: '../.env.local' });

test('login and download', async ({ browser }) => {
  // Create a browser context for the initial part of the test
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  // Navigate to the login page
  await page.goto('https://intern-soc.vercel.app/login');
  // Retrieve environment variables
  const MY_EMAIL = process.env.MY_EMAIL!;
  const MY_PASSWORD = process.env.MY_PASSWORD!;
  // Fill in the email and password fields
  await page.fill('input[name="email"]', MY_EMAIL);
  await page.fill('input[name="password"]', MY_PASSWORD);
  // Click the "Login" button
  await page.click('button:has-text("Login")');
  // Wait for navigation after login
  await page.waitForNavigation();
  // Navigate to the homepage
  await page.goto('https://intern-soc.vercel.app/');
  // Click the "Pick" button
  await page.click('button:has-text("Pick")');
  // Wait for the selected name to be updated
  await page.waitForFunction(() => {
    const element = document.querySelector('.bg-blue-500.text-white');
    return element?.textContent?.trim() !== '';
  });
  // Retrieve the selected name
  const selectedName = await page.textContent('.bg-blue-500.text-white');
  expect(selectedName).not.toBe("");

  // Interact with the search bar in the engagement logger
  await page.fill('.mt-3 input[type="text"]', 'Olivia White'); 

  // Check if the EngagementLoggerBox updates with the filtered data
  const engagementLoggerBoxExists = await page.isVisible('selector-for-EngagementLoggerBox');
  // expect(engagementLoggerBoxExists).toBeTruthy();

});



