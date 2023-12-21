// import block
import request from "supertest";
import App from "next/app";
import * as tsJest from "ts-jest";
import resetTestDatabase from "../lib/database/tests/testScripts/resetTestDatabase";
import {
  mainRoute,
  getRoute,
  patchRoute,
  deleteRoute,
  postRoute,
} from "../utils/APIRouteSetter";
const mainURL = mainRoute();
// blank test to confirm setup is working

test("Hi mom!", function () {
  // this is blank just to ensure ts-jest is configured correctly
});

// Get Attendance test
test("Get attenance test", async function () {
  // Reset db
  await resetTestDatabase();
  // Run API call
  const testReply = await fetch(`${mainURL}${getRoute}getBootcampers`);
  // Check response object is type of
  //   expect(testReply).toHaveProperty("data");

  expect(isJSON(testReply)).toBe(true);
  // Check success code
  // Check attendance array
  // Check properties of each attendee object (name etc)
});

// Get Engagement Score test

// Delete name from namepicker test

// Get name from namepicker test

// Patch Engagement record test

// Post a new bootcamper rest
