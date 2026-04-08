import { test, expect, chromium } from "@playwright/test";

test.skip("Connect to TV via CDP", async () => {
  try {
    const tv_id = "http://192.168.1.35:50000";
    const browser = await chromium.connectOverCDP(tv_id);
    const contexts = browser.contexts();
    const context =
      contexts.length > 0 ? contexts[0] : await browser.newContext();
    const pages = context.pages();
    const page = pages.length > 0 ? pages[0] : await context.newPage();
    await page.goto("https://www.google.com/");
    await page.waitForTimeout(5000);
    // Note: page.pause() is not available in headless mode
    await page.close();
    await browser.close();
  } catch (error) {
    console.error("Error connecting to TV:", error);
  }
});
