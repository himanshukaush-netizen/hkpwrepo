import { test, expect } from "@playwright/test";
import fs from "fs";
let sharedValue;
let newbooking;
test.beforeAll(async ({ request }) => {
  const d = {
    username: "admin",
    password: "password123",
  };
  const response = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    { headers: { "Content-Type": "application/json" }, data: d },
  );
  console.log(response.status());
  console.log(await response.json());
  const resp = await response.json();
  console.log(resp.token);
  sharedValue = resp.token;
  //fs.writeFileSync("token.json", JSON.stringify(resp.token));
});

test("api get request", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1",
  );
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
  expect(data).toHaveProperty("id", 1);
  expect(data).toHaveProperty(
    "title",
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  );
  expect(data.body).toContain("quia et suscipit");
});

test.skip("api post request", async ({ request }) => {
  const d = {
    username: "admin",
    password: "password123",
  };
  const response = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    { headers: { "Content-Type": "application/json" }, data: d },
  );
  console.log(response.status());
  console.log(await response.json());
  const resp = await response.json();
  console.log(resp.token);
  fs.writeFileSync("token.json", JSON.stringify(resp.token));
});

test("api get booking request", async ({ request }) => {
  const response = await request.get(
    "https://restful-booker.herokuapp.com/booking/1",
  );
  console.log(response.status());
  const data = await response.json();
  console.log(data);
  //const token = fs.readFileSync("token.json", "utf-8");
  console.log(sharedValue);
});

test("api post booking request", async ({ request }) => {
  const file = fs.readFileSync("./testdata/postreq.json", "utf-8");
  console.log(file);
  const d = JSON.parse(file);

  const response = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      headers: { "Content-Type": "application/json" },
      data: d,
    },
  );
  console.log(response.status());
  const data = await response.json();
  console.log(data.bookingid);
  const nb = data.bookingid;

  const newResp = await request.get(
    "https://jsonplaceholder.typicode.com/posts/" + nb,
  );
  console.log(newResp.status());
  const newData = await newResp.json();
  console.log(newData);
});
