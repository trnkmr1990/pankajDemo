//Login in EZUPP
const { test, expect } = require('@playwright/test');
//importing class flies
const { LoginPage } = require('../pageLevel/loginPage');
const { LaunchApp} = require('../pageLevel/launchAppPage');
const {UnitPage} = require ('../pageLevel/unitPage');
// importing data files
const {userLoginData} = require('../data/userData.json'); 
const {applicationData} = require('../data/url.json')

test('Verification of valid Email Id', async ({ page }) => {

  //Create loginPage object of class LoginPage
  const loginPage = new LoginPage(page);
  const launchApp = new LaunchApp(page);
  const unitPage = new UnitPage(page);

  console.log("launch application");
  await launchApp.launchApplication(applicationData.url)
  //login Page object accessing the login method
  await loginPage.login(userLoginData.userEmailID, userLoginData.password);
  //await unitPage.createUnit('Kilo')
  
console.log();
});

