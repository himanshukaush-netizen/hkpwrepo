import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import * as util from "../utils/uiHelpers";

test.describe("Group of tcs", () => {
  test("My first test", () => {
    const email = faker.internet.email();
    console.log(email);
    const name = faker.person.fullName();
    console.log(name);
  });
  test("Descript second test", () => {
    const phn = faker.phone.number("9#########");
    console.log(phn);
  });
  test("Describe third test", () => {
    const company = faker.company.name();
    console.log(company);
  });
});
