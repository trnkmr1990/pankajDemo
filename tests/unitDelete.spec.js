//Login in EZUPP
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageLevel/loginPage');
const {userLoginData} = require('../data/userData.json');

test('Verification of valid Email Id', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('http://91.205.173.97:8600/login');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Ezupp Pannel/);
  await page.waitForTimeout(6000);
  await expect(page).toHaveURL('http://91.205.173.97:8600/login');

  await loginPage.login(userLoginData.userEmailID, userLoginData.password);
  
  await page.getByRole('button',{name: 'Masters'}).click();
  await page.getByRole('button',{name: 'Unit'}).click();

  await page.getByRole('checkbox',{name: 'Spider Yes ACTIVE'}).getByRole('button').click();
  await page.getByRole('button',{name: 'task'}).click();
  await page.getByRole('button',{name: 'CONFIRM'}).click();
  console.log()

});