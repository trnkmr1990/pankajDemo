//Login in EZUPP
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageLevel/loginPage');

test('Verification of valid Email Id', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await page.goto('http://91.205.173.97:8600/login');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Ezupp Pannel/);
  await page.waitForTimeout(6000);
  await expect(page).toHaveURL('http://91.205.173.97:8600/login');
  await loginPage.login('ipankajkumarlpu@gmail.com','Pankaj@12345')
  await page.getByRole('button',{name: 'Masters'}).click();
  await page.waitForTimeout(6000);
  await page.getByRole('button',{name: 'Unit'}).click();
  await page.waitForTimeout(6000);
  await page.getByRole('button',{name: 'CREATE'}).first().click();
  await page.waitForTimeout(6000);
  await page.getByLabel('Unit Name').click();
  await page.getByLabel('Unit Name').fill('Tinku');
  await page.getByLabel('Is General').check();
  await page.getByRole('button',{name:'SUBMIT'}).click();
  

});

