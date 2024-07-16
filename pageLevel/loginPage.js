// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.LoginPage = class LoginPage {
  constructor(page){
    // Init page object
    this.page = page;

    this.getEmailLocator = page.getByLabel('Email ID');
    this.getPasswordLocator = page.getByLabel('Password');
    this.getLoginButtonLocator = page.getByRole('button',{name:'LOGIN'});
    this.getDashboard = page.getByRole('button',{name: 'Dashboard'});
    
}

async login(email, password){
  await this.getEmailLocator.click();
  await this.getEmailLocator.fill(email);
  await this.page.getPasswordLocator.click();
  await this.page.getPasswordLocator.fill(password);
  await this.getLoginButtonLocator.click();
  await expect(this.getDashboard).toBeVisible();
}


}