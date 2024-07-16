const { expect } = require('@playwright/test')

// create class,  DeleteUnit is Class 
exports.UnitPage = class UnitPage{
  constructor(page){
    // Init page object
    this.page = page;
    // locators delete locator
    this.getMasterLocator = this.page.getByRole('button',{name: 'Masters'});
    this.getUnitLocator = page.getByRole('button',{name: 'Unit'});
    this.getCheckboxLocator = page.getByRole('checkbox',{name: 'Spider Yes ACTIVE'}).getByRole('button');
    this.getTaskLocator=getByRole('button',{name: 'task'});
    this.getConfirmLocator = page.getByRole('button',{name: 'CONFIRM'})
    // Locators Create 
    this.getUnitbutton = page.getByRole('button',{name: 'CREATE'}).first()
    this.getUnitName   = page.getByLabel('Unit Name');
    this.getByLabel = page.getByLabel('Is General');
    this.getCreateButton  = locator('div').filter({hasText:/^CREATE$/}).getByRole('button');

}


//deleteUnit is method
async deleteUnit(name){
await this.getMasterLocator.click();
await this.getUnitLocator.click();
await this.getCheckboxLocator.click();
await this.page.getTaskLocator.click();
await this.getConfirmLocator.click();
console.log()

}

//Unit creation
async createUnit(name){
  await this.getMasterLocator.click();
  await page.waitForTimeout(6000);
  await this.getUnitLocator.click();
  await page.waitForTimeout(6000);
  await page.getUnitbutton .click();
  await page.waitForTimeout(6000);ß
  await page.getUnitName.click();
  await page.getUnitName .fill(name);
  await page.getByLabel.check();
  await page.getCreateButton.click();
}
}