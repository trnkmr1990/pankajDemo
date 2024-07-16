//Login in EZUPP
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageLevel/loginPage');
const { LaunchApp} = require('../pageLevel/launchAppPage');
//Import the DeleteUnit class
const {UnitPage} = require ('../pageLevel/unitPage');
const {userLoginData} = require('../data/userData.json'); 
const {applicationData} = require('../data/url.json')


test('Verification of valid Email Id', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const launchApp = new LaunchApp(page);
  //cretaed deleteUnit object of class DeleteUnit
  const unitPage = new UnitPage (page);
  //await page.goto(applicationData.url);
  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle(/Ezupp Pannel/);
  //await page.waitForTimeout(6000);
  //await expect(page).toHaveURL(applicationData.url) ;
  await launchApp.launchApplication(applicationData.url)

  await loginPage.login(userLoginData.userEmailID, userLoginData.password);
// calling deleteUnit method using object deleteUnit
  await unitPage.deleteUnit()
  
  await page.getByRole('button',{name: 'Masters'}).click();
  await page.getByRole('button',{name: 'Unit'}).click();

  await page.getByRole('checkbox',{name: 'Spider Yes ACTIVE'}).getByRole('button').click();
  await page.getByRole('button',{name: 'task'}).click();
  await page.getByRole('button',{name: 'CONFIRM'}).click();
  console.log()

});