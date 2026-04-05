async function highlight(Locator) {
  await Locator.evaluate((ele) => {
    ele.style.backgroundColor = "yellow";
    ele.style.border = "2px solid red";
  });
}

async function selectOptionByLabel(locator, lb) {
  await locator.selectOption({ label: lb });
}

async function uploadFiles(locator, arr) {
  await locator.setInputFiles(arr);
}
export { highlight, selectOptionByLabel, uploadFiles };
