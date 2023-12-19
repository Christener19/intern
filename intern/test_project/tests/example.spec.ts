import { test, expect } from '@playwright/test';
require('dotenv').config({ path: '../.env.local' });



test('login', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://localhost:3000/login');

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
  await page.goto('http://localhost:3000/');

  // Click the "Pick" button
  await page.click('button:has-text("Pick")');

  // Wait for the selected name to be updated
  await page.waitForFunction(() => {
    const element = document.querySelector('.bg-blue-500.text-white');
    // Check both for the existence of the element and that its textContent is not null and not empty
    return element?.textContent?.trim() !== '';
  });

  // Retrieve the selected name
  const selectedName = await page.textContent('.bg-blue-500.text-white');
  expect(selectedName).not.toBe("");


    //Zoom polls
  await page.click('button:has-text("Thermometer")');


  await page.waitForFunction(() => {
    const chart = document.querySelector('[data-testid="zoom-poll-chart"]');
    return chart !== null;
  }, null, { timeout: 10000 });
  
  const isChartVisible = await page.isVisible('[data-testid="zoom-poll-chart"]')
  expect(isChartVisible).toBe(true);


  })

