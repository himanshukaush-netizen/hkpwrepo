import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
//import { highlight } from "../utils/uiHelpers";
import * as util from "../utils/uiHelpers";
import * as vars from "../utils/variablesValue";
test("My first test", async function ({ page }) {
  const email = faker.internet.email();
  const name = faker.person.fullName();
  const phn = faker.phone.number("9#########");
  console.log(phn);
  await page.goto("https://testautomationpractice.blogspot.com/", {
    waitUntil: "domcontentloaded",
  });
  util.highlight(page.getByPlaceholder("Enter Name"));
  await page.getByPlaceholder("Enter Name").fill(name);
  await page.locator("//*[@id='email']").fill(email);
  await page.locator("//*[@id='phone']").fill(phn);
  const lbl = await page.locator("//*[@id='textarea']/../label").textContent();
  console.log(lbl);
  if (!(await page.locator("//*[@id='male']").isChecked())) {
    await page.locator("//*[@id='male']").scrollIntoViewIfNeeded();
    await page.locator("//*[@id='male']").check();
  }
  console.log(lbl);
});

test("My second test", async function ({ page }) {
  await page.goto("https://testautomationpractice.blogspot.com/", {
    waitUntil: "domcontentloaded",
  });
  const dd = page.locator("//*[@id='country']");
  await dd.scrollIntoViewIfNeeded();
  util.selectOptionByLabel(dd, "India");
  //await page.pause();
});

test("Select multiple options from listbox", async function ({ page }) {
  await page.goto("https://testautomationpractice.blogspot.com/", {
    waitUntil: "domcontentloaded",
  });
  const ddMulti = page.locator("//*[@id='colors']");
  await ddMulti.scrollIntoViewIfNeeded();
  await ddMulti.selectOption(["Yellow", "Green"]);
  await page.pause();
});

test("Upload file", async function ({ page }) {
  await page.goto("https://testautomationpractice.blogspot.com/", {
    waitUntil: "domcontentloaded",
  });
  const fp = "testcontext\\UploadFilePW.txt";
  const fileInput = page.locator("//*[@id='singleFileInput']");
  await fileInput.scrollIntoViewIfNeeded();
  await fileInput.setInputFiles(fp);
  await page.pause();
});

test("Upload multiple files", async function ({ page }) {
  await page.goto("https://testautomationpractice.blogspot.com/", {
    waitUntil: "domcontentloaded",
  });
  const fp1 = "testcontext\\UploadFilePW.txt";
  const fp2 = "testcontext\\UploadFilePW - Copy.txt";
  const fileInput = page.locator("//*[@id='multipleFilesInput']");
  const arr = [fp1, fp2];
  await fileInput.scrollIntoViewIfNeeded();
  await util.uploadFiles(fileInput, arr);
  await page.pause();
});

test("data from vars file", async function ({ page }) {
  console.log(vars.userData.email);
  console.log(vars.userData.name);
  console.log(vars.userData.phone);
  console.log(vars.userData.fileName);
  console.log(vars.userData.file1);
  console.log(vars.userData.file2);
  console.log(vars.userData.OrderId);
});

test("Handle Windows", async ({ browser }) => {
  const context = await browser.newContext();
  const np = await context.newPage();
  await np.goto("https://testautomationpractice.blogspot.com/", {
    waitUntil: "domcontentloaded",
  });

  const [nwPage] = await Promise.all([
    context.waitForEvent("page"),
    np.locator("//*[normalize-space()='New Tab']").click(),
  ]);

  await nwPage.waitForLoadState();
  await nwPage.locator("//*[@title='search']").first().fill("Search");
  await nwPage.pause();
  await nwPage.close();
  await np.bringToFront();
  await np.pause();
});

test("Handle alerts", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/", {
    waitUntil: "domcontentloaded",
  });
  page.on("dialog", async (dialog) => {
    await page.waitForTimeout(2000);
    await console.log(dialog.message());
    await dialog.accept();
  });
  await page.locator("//*[@id='alertBtn']").click();
});

test("Handle alert", async function ({ page }) {
  await page.goto("https://testautomationpractice.blogspot.com/", {
    waitUntil: "domcontentloaded",
  });
  await page.locator("//*[@id='confirmBtn']").scrollIntoViewIfNeeded();
  page.on("dialog", async (dialog) => {
    console.log(dialog.message);
    await dialog.dismiss();
  });
  await page.locator("//*[@id='confirmBtn']").click();
});

test("Handle new tab", async function ({ browser }) {
  const context = await browser.newContext();
  const pg1 = await context.newPage();
  await pg1.goto("https://testautomationpractice.blogspot.com/", {
    waitUntil: "domcontentloaded",
  });

  const [pg2] = await Promise.all([
    context.waitForEvent("page"),
    pg1.locator("//*[normalize-space()='New Tab']").click(),
  ]);
  console.log(await pg2.title());
  await pg2.close();
});
