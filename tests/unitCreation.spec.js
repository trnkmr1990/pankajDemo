//Login in EZUPP
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageLevel/loginPage');
const { LaunchApp} = require('../pageLevel/launchAppPage');
const {userLoginData} = require('../data/userData.json'); 
const {applicationData} = require('../data/url.json')

test('Verification of valid Email Id', async ({ page }) => {

  //Create loginPage object of class LoginPage
  const loginPage = new LoginPage(page);
  const launchApp = new LaunchApp(page);

  //await page.goto(applicationData.url);
  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle(/Ezupp Pannel/);
  //await page.waitForTimeout(6000);
  //await expect(page).toHaveURL(applicationData.url) ;
  await launchApp.launchApplication(applicationData.url)
  
  //login Page object accessing the login method
  await loginPage.login(userLoginData.userEmailID, userLoginData.password);
  await page.getByRole('button',{name: 'Masters'}).click();
  await page.waitForTimeout(6000);
  await page.getByRole('button',{name: 'Unit'}).click();
  await page.waitForTimeout(6000);
  await page.getByRole('button',{name: 'CREATE'}).first().click();
  await page.waitForTimeout(6000);
  await page.getByLabel('Unit Name').click();
  await page.getByLabel('Unit Name').fill('Tinku');
  await page.getByLabel('Is General').check();
  await page.locator('div').filter({hasText:/^CREATE$/}).getByRole('button').click();
  
console.log();
});

