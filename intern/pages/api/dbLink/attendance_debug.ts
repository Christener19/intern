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
  const zoomParticipants = {
    participants: [
      {
        registrant_id: "98IH-wpWSSCIesZ_SmZ3HQ",
        name: "Radoslaw Swierkowski",
        user_email: "swar.rado@gmail.com",
        day: "2023-12-19T",
        duration: 125,
        join_leave: [],
      },
      {
        registrant_id: "123",
        name: "Ziad Labban",
        user_email: "ziadlabban@hotmail.co.uk",
        day: "2023-12-19T",
        duration: 123,
        join_leave: [],
      },
    ],
  };

  const allParticipants = {
    data: [
      {
        recordid: 8,
        zoomid: "777",
        name: "Olivia White",
        todays_attendance_hours: 10,
        total_attendance_hours: 10,
        total_days_attended: 10,
        missing_streak: 10,
      },
      {
        recordid: 11,
        zoomid: "22000",
        name: "bill",
        todays_attendance_hours: 0,
        total_attendance_hours: 0,
        total_days_attended: 0,
        missing_streak: 0,
      },
      {
        recordid: 12,
        zoomid: "22000",
        name: "bill",
        todays_attendance_hours: 0,
        total_attendance_hours: 0,
        total_days_attended: 0,
        missing_streak: 0,
      },
      {
        recordid: 1,
        zoomid: "123",
        name: "John Doe",
        todays_attendance_hours: 10000,
        total_attendance_hours: 100000,
        total_days_attended: 10,
        missing_streak: 10,
      },
    ],
  };

  const currentZoomID = zoomParticipants.participants[1].registrant_id;
  const duration = zoomParticipants.participants[1].duration;

  //patch section
  const newAttendanceHours = duration / 3600;
  const newTotalAttendancehours =
    allParticipants.data[1].total_attendance_hours + duration / 3600;
  const newDays =
    newAttendanceHours >= 7
      ? (allParticipants.data[1].total_days_attended += 1)
      : allParticipants.data[1].total_days_attended;
  const newMissingStreak =
    newAttendanceHours < 7
      ? (allParticipants.data[1].missing_streak += 1)
      : (allParticipants.data[1].missing_streak = 0);
  console.log(
    `new attendance hour: ${newAttendanceHours}, new total attendance : ${newTotalAttendancehours}, amount days attended:  ${newDays}, the missing streak: ${newMissingStreak}`
  );

  // const currentZoomID = 123;
  // const newAttendanceHours = 10000;
  // const newTotalAttendancehours = 100000;
  // const newDays = 10;
  // const newMissingStreak = 10;

  try {
    console.log("alive at 117");
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
