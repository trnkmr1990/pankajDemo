// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.LoginPage = class LoginPage {
  constructor(page){
    // Init page object
    this.page = page;
}

async login(email, password){
  await page.getByLabel('Email ID').click();
  await page.getByLabel('Email ID').fill(email);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button',{name:'LOGIN'}).click();
  await expect(page.getByRole('button',{name: 'Dashboard'})).toBeVisible();
}

}
