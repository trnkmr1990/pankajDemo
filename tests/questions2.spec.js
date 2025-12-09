const { test } = require("@playwright/test");

test("Extract all links from webpage", async ({ page }) => {
  await page.goto("https://www.wikipedia.org");

  const links = await page.locator("a").evaluateAll((anchors) =>
    anchors.map((a) => ({
      text: a.innerText.trim(),
      href: a.href,
    }))
  );
  console.table(links.slice(0, 10));
});

test("Read table values", async ({ page }) => {
  await page.goto("https://www.w3schools.com/html/html_tables.asp");
  const rows = await page.locator("#customers tr").all();
  console.log("Total rows:", rows.length);

  for (let i = 1; i < rows.length; i++) {
    const cells = await rows[i].locator("td").evaluateAll((tds) =>
      tds.map((td) => {
        return td.textContent.trim();
      })
    );
    // text = cells.map((cell) => cell.trim());
    // const cells = await rows[i].$$eval("td", (tds) =>
    //   tds.map((td) => td.textContent.trim())
    // );

    console.table(cells);
  }
});

test("Infinite scroll until end", async ({ page }) => {
  await page.goto("https://infinite-scroll.com/demo/full-page/");

  let prevHeight;

  while (true) {
    prevHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.mouse.wheel(0, prevHeight);
    await page.waitForTimeout(1500);

    const newHeight = await page.evaluate(() => document.body.scrollHeight);
    if (newHeight === prevHeight) break;
  }

  console.log("Reached bottom of page");
});

test("Capture console errors", async ({ page }) => {
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log("🔥 Console Error:", msg.text());
    }
  });
  await page.goto("https://the-internet.herokuapp.com");
  //await page.goto("https://the-internet.herokuapp.com/broken_images");
  await page.waitForTimeout(5000);
});

test.only("Detect broken links without opening them", async ({ page }) => {
  await page.goto("https://automationexercise.com/api_list");

  // Extract all hrefs from anchor tags
  const links = await page
    .locator(".navbar-nav>li>a")
    .evaluateAll((anchors) => anchors.map((a) => a.href));

  console.log(links);
  console.log(`Total links found: ${links.length}`);

  // Create an API request object
  const { request } = require("@playwright/test");
  const apiCtx = await request.newContext();

  const results = [];

  for (const link of links) {
    const response = await apiCtx.get(link);
    const status = response.status();

    results.push({
      url: link,
      status,
      isBroken: status >= 400,
    });
  }

  console.table(results.slice(0, 20));
});
