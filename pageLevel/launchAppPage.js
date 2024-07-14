// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.LaunchApp = class LaunchApp {
  constructor(page){
    // Init page object
    this.page = page;

    
    
}



async launchApplication(url){
  await page.goto(url);
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Ezupp Pannel/);
  await page.waitForTimeout(6000);
  await expect(page).toHaveURL(url) ;
}

}