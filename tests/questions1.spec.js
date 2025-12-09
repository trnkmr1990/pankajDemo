const { test, expect, request } = require("@playwright/test");

test.only("leafGround", async ({ page, context }) => {
  await page.goto("https://www.leafground.com/window.xhtml");
  await page.waitForLoadState("domcontentloaded");
  // Capture color before click
  const color1 = await page
    .locator("//span[contains(text(),'Open with delay')]")
    .evaluate((ele) => window.getComputedStyle(ele).getPropertyValue("color"));
  // CLICK and wait for ALL popups
  const popupPages = [];
  context.on("page", (p) => popupPages.push(p));
  await page.locator("//span[contains(text(),'Open with delay')]").click();
  for (const p of popupPages) {
    if (p !== page) {
      await p.bringToFront();
      await p.close();
    }
  }
  //   const [p1, p2] = await Promise.all([
  //     context.waitForEvent("page"),
  //     context.waitForEvent("page"),
  //     page.locator("//span[contains(text(),'Open with delay')]").click(),
  //   ]);
  //   await p1.close();
  //   await p2.close();
  // Bring original page back
  await page.bringToFront();
  // After closing popups, check color again
  const color2 = await page
    .locator("//span[contains(text(),'Open with delay')]")
    .evaluate((ele) => window.getComputedStyle(ele).getPropertyValue("color"));
  expect(color1).toBe(color2);
});

test("Element screenshot example", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await page.screenshot({ path: "full_page.png", fullPage: true });
  const productCard = page.locator(".inventory_item").first();
  await productCard.screenshot({ path: "product_card.png" });
});

test("Mock API and verify UI", async ({ page }) => {
  await page.route("**/products", async (route) => {
    const mockedData = {
      items: [
        { name: "Pizza", price: 199 },
        { name: "Burger", price: 149 },
      ],
    };

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockedData),
    });
  });

  await page.goto("https://my-ecommerce-app.com/menu");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".product-item")).toHaveCount(2);
  await expect(page.getByText("Pizza")).toBeVisible();
});

test("API login and inject token", async ({ browser }) => {
  const api = await request.newContext();
  const response = await api.post("https://reqres.in/api/login", {
    data: {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    },
  });
  const data = await response.json();
  const token = data.token;

  const context = await browser.newContext();
  await context.addInitScript(
    (token) => window.localStorage.setItem("auth_token", token),
    token
  );

  const page = await context.newPage();
  await page.goto("https://myapp.com/dashboard");

  console.log("Logged in via API!");
});
