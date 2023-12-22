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
test("Get attendance test", async function () {
  // Reset db
  await resetTestDatabase();
  // Run API call
  const testReply = await fetch(`${mainURL}${getRoute}getBootcampers`);
  // clean up response
  // clean up response json
  const testReplyJSON = await testReply.text();
  const testReplyclean = JSON.parse(testReplyJSON);
  // console.log(testReplyclean)
  // Check response object is type of
  expect(testReplyclean).toHaveProperty("data", {
    todaysAbsentCount: "3",
    todaysAttendanceCount: "7",
  });
  // Check success status
  expect(testReplyclean).toHaveProperty("status", "success");
  // Check data object
  expect(testReplyclean.data).not.toHaveProperty(
    "todays_Attendance_Count",
    "64"
  );
  expect(testReplyclean.data).not.toHaveProperty("todays_Absent_Count", "null");
});

// Get Engagement Score test
test("Get engagement score test", async function () {
  // Run API call
  const testReply = await fetch(
    `${mainURL}${getRoute}getEngagementScoreByWeek?weekNumber=1`
  );
  // clean up response
  // clean up response json
  const testReplyJSON = await testReply.text();
  const testReplyclean = JSON.parse(testReplyJSON);
//   console.log(testReplyclean);
  // Check response object is type of
  expect(testReplyclean).toHaveProperty("data");
  // Check array 0 is John Doe
  expect(testReplyclean.data[0]).toEqual({
    name: "John Doe",
    average_engagement_grade: "Ungraded",
  });
  expect(testReplyclean.data.length).toBe(9);

  // Check success status
  expect(testReplyclean).toHaveProperty("status", "success");

  // Failing conditions
  expect(testReplyclean.data).not.toHaveProperty(
    "todays_Attendance_Count",
    "64"
  );
  expect(testReplyclean.data[1]).not.toEqual({
    name: "John Doe",
    average_engagement_grade: "Ungraded",
  });
});

// Delete name from namepicker test
test('delete from namepicker table',async function () {
    // id to delete 123
    // Run API call
  const testReply = await fetch(
    `${mainURL}${deleteRoute}deleteName?zoomId=123` , {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    }
  );
  // clean up response
  // clean up response json
  const testReplyJSON = await testReply.text();
//   console.log('Raw Response:', testReplyJSON);
  const testReplyclean = JSON.parse(testReplyJSON);
//   console.log(testReplyclean);
  // Check response object is type of
  expect(testReplyclean).toHaveProperty("data");

  // Check array 0 is John Doe
  // Check success status
  expect(testReplyclean).toHaveProperty("status", "success");

  // Failing conditions
  expect(testReplyclean.data).not.toHaveProperty(
    "todays_Attendance_Count",
    "64"
  );
  expect(testReplyclean.data[1]).not.toEqual({
    name: "John Doe",
    average_engagement_grade: "Ungraded",
  });

})

// Get name from namepicker test
test("Get name list for namepicker test", async function () {
    // Run API call
    const testReply = await fetch(`${mainURL}${getRoute}getParticipantList`);
    // clean up response
    // clean up response json
    const testReplyJSON = await testReply.text();
    const testReplyclean = JSON.parse(testReplyJSON);
    // console.log(testReplyclean)
    // Check response object is type of
    expect(testReplyclean).toHaveProperty("data");
    // Check success status
    expect(testReplyclean).toHaveProperty("status", "success");
    // Check length of array
    expect(testReplyclean.data.length).toBe(10);
    // Check data object
    expect(testReplyclean.data).not.toHaveProperty(
      "todays_Attendance_Count",
      "64"
    );
    expect(testReplyclean.data).not.toHaveProperty("todays_Absent_Count", "null");
  });

// Patch Engagement record test
test('Patch engagement grade record test',async function () {
    // Run API call
  const testReply = await fetch(
    `${mainURL}${patchRoute}patchEngagementGrade?zoomId=888` , {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "week_number": 1,
            "average_engagement_grade": 'test Grade'
        })
    }
  );
  // clean up response
  // clean up response json
  const testReplyJSON = await testReply.text();
//   console.log('Raw Response:', testReplyJSON);
  const testReplyclean = JSON.parse(testReplyJSON);
  // Check response object is type of
  expect(testReplyclean).toHaveProperty("data");

  // Check success status
  expect(testReplyclean).toHaveProperty("status", "success");
  // Check grade is as expected
  expect(testReplyclean.data.data).toHaveProperty("average_engagement_grade", "test Grade");
  // Failing conditions
  expect(testReplyclean.data).not.toHaveProperty(
    "todays_Attendance_Count",
    "64"
  );
  expect(testReplyclean.data[1]).not.toEqual({
    name: "John Doe",
    average_engagement_grade: "Ungraded",
  });
  expect(testReplyclean.data.data).not.toHaveProperty("average_engagement_grade", "Ungraded");
})

// Post a new bootcamper rest
test('post new bootcamper to the database',async function () {
    // Run API call
  const testReply = await fetch(
    `${mainURL}${postRoute}postBootcamperAttendance?zoomId=4545` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": "Testy McTestFace"
        })
    }
  );
  // clean up response
  // clean up response json
  const testReplyJSON = await testReply.text();
//   console.log('Raw Response:', testReplyJSON);
  const testReplyclean = JSON.parse(testReplyJSON);
    console.log(testReplyclean);
  // Check response object is type of
  expect(testReplyclean).toHaveProperty("data");
  // Check success status
  expect(testReplyclean).toHaveProperty("status", "success");
  // Check name is as expected
  expect(testReplyclean.data.data).toHaveProperty("name", "Testy McTestFace");
  // Check id is as expected
  expect(testReplyclean.data.data).toHaveProperty("zoomid", "4545");
  // Failing conditions
  expect(testReplyclean.data).not.toHaveProperty(
    "todays_Attendance_Count",
    "64"
  )
  // put the database back how it was
  await resetTestDatabase();
})