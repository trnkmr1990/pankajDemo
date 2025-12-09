const { test } = require("@playwright/test");

test("Performance metrics", async ({ page }) => {
  await page.goto("https://google.com");

  const perf = await page.evaluate(() =>
    JSON.stringify(window.performance.timing)
  );
  const metrics = JSON.parse(perf);

  console.log(
    "DOM Loaded:",
    metrics.domContentLoadedEventEnd - metrics.navigationStart
  );
  console.log("Page Load:", metrics.loadEventEnd - metrics.navigationStart);
});

test("Multi-tab workflow", async ({ page, context }) => {
  await page.goto("https://www.amazon.in");

  const [newTab] = await Promise.all([
    context.waitForEvent("page"),
    page.click("text=Today's Deals"), // opens new tab
  ]);

  await newTab.waitForLoadState();
  console.log(await newTab.title());

  await newTab.close();
  await page.bringToFront();
});

test("Canvas interaction", async ({ page }) => {
  await page.goto("https://canvasjs.com/javascript-charts/line-chart/");
  const canvas = page.locator("canvas").elementHandle();

  const box = await canvas.boundingBox();

  // Click near top-left plot
  await page.mouse.click(box.x + 100, box.y + 80);
});

const { waitForLoaderToDisappear } = require("../utils/waits");

test("Custom waits usage", async ({ page }) => {
  await page.goto("https://www.nykaa.com");
  await page.click("#addToCart");

  await waitForLoaderToDisappear(page);

  await page.click("#checkout");
});

test.only("HAR recording", async ({ browser }) => {
  // const context = await browser.newContext({
  //   recordHar: { path: "network.har" },
  // });

  const context = await browser.newContext();
  const page = await context.newPage();
  //await page.goto("https://www.flipkart.com");

  // const fs = require("fs");
  // const har = JSON.parse(fs.readFileSync("./network.har", "utf-8"));
  // console.log("HAR loaded!");
  // console.log("Total network entries:", har.log.entries.length);

  // // Print first 5 entries
  // har.log.entries.slice(0, 5).forEach((entry, i) => {
  //   console.log(`\nEntry ${i + 1}:`);
  //   console.log("URL:", entry.request.url);
  //   console.log("Method:", entry.request.method);
  //   console.log("Status:", entry.response.status);
  //   // console.log("Type:", entry.request.resourceType());
  // });

  // console.log("Total entries:", har.log.entries.length);
  // const apiCalls = har.log.entries.filter(
  //   (e) => e.requestType() === "xhr" || e.requestType() === "fetch"
  // );
  // console.log(apiCalls.map((a) => a.request.url));

  page.on("request", (request) => {
    console.log("Request made:", request);
    if (
      request.resourceType() === "xhr" ||
      request.resourceType() === "fetch"
    ) {
      console.log("XHR Request:", request.url());
    }
  });
  await page.goto("https://www.flipkart.com");
  await context.close(); // HAR file saved
});
