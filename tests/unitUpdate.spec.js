//Login in EZUPP
const { test, expect } = require('@playwright/test');

test('Verification of valid Email Id', async ({ page }) => {
  await page.goto('http://91.205.173.97:8600/login');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Ezupp Pannel/);
  await page.waitForTimeout(6000);
  await expect(page).toHaveURL('http://91.205.173.97:8600/login');
  await page.getByLabel('Email ID').click();
  await page.getByLabel('Email ID').fill('ipankajkumarlpu@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Pankaj@12345');
  await page.getByRole('button',{name:'LOGIN'}).click();
  await expect(page.getByRole('button',{name: 'Dashboard'})).toBeVisible();
  await page.getByRole('button',{name: 'Masters'}).click();
  await page.getByRole('button',{name: 'Unit'}).click();
  await page.getByRole('checkbox',{name:'Abc Yes INACTIVE'}).getByRole('button').click();
  await page.getByLabel('Unit Name').click();
  await page.getByLabel('Unit Name').clear();
  await page.getByLabel('Inactive').click();
  await page.getByLabel('Unit Name').fill('spider');
await page.getByRole('button',{name:'UPDATE'}).click();
console.log();
})