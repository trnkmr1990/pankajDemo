export async function safeClick(locator) {
  await locator.waitFor({ state: "visible" });
  await locator.click();
}

export async function safeFill(locator, value) {
  await locator.waitFor({ state: "attached" });
  await locator.fill(value);
}

export async function waitForLoader(page) {
  const loader = page.locator(".spinner, .loading");
  if (await loader.isVisible()) {
    await loader.waitFor({ state: "hidden" });
  }
}
