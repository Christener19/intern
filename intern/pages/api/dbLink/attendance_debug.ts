import pool from "../database/dbIndex";
import {
  mainRoute,
  getRoute,
  oauthRoute,
  postRoute,
  patchRoute,
} from "../../../utils/APIRouteSetter";

const mainURL = mainRoute();

// // Function to grab participant attendance data from Zoom API and add to our database
export default async function attendanceZoomToDb() {
  const currentZoomID = 123;
  const newAttendanceHours = 10000;
  const newTotalAttendancehours = 100000;
  const newDays = 10;
  const newMissingStreak = 10;

  try {
    const response = await fetch(
      `${mainURL}${patchRoute}
registerBootcamperAttendance?zoomId=${currentZoomID}`,
      {
        // set header
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        // send name in the body
        body: JSON.stringify({
          todays_attendance_hours: newAttendanceHours,
          total_attendance_hours: newTotalAttendancehours,
          total_days_attended: newDays,
          missing_streak: newMissingStreak,
        }),
      }
    );
    // log that it works
    // console.log("alive 133");
    // const result = await response;
    const resultJson = await response.text();
    const cleanResult = JSON.parse(resultJson);
    console.log("Success:", cleanResult);
    // log if it errors
  } catch (error) {
    console.log("Error:", error);
  }
}
// //http://localhost:3000/api/dbLink/attendance

attendanceZoomToDb();
