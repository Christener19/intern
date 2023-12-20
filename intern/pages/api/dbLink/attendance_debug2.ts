import pool from "../database/dbIndex";
import {
  mainRoute,
  getRoute,
  oauthRoute,
  postRoute,
  patchRoute,
} from "../../../utils/APIRouteSetter";

const mainURL = mainRoute();

export default async function attendanceZoomToDb() {
  // Grab zoom data of everyone, latest meeting ID
  const ZoomparticipantsJSON = await fetch(
    `${mainURL}${oauthRoute}getMeetingParticipants`
  );
  const AllParticipantsJSON = await fetch(
    `${mainURL}${getRoute}getListBootcampers`
  );

  //variable/ reponse clean up
  const ZoomparticipantsClean = await ZoomparticipantsJSON.text();
  const zoomParticipants = JSON.parse(ZoomparticipantsClean);

  const allParticipantsClean = await AllParticipantsJSON.text();
  const allParticipants = JSON.parse(allParticipantsClean);

  // debug logger
  console.log("zoomParticipants");
  console.log(zoomParticipants);
  console.log("AllParticipants");
  console.log(allParticipants);

  // //start loop

  for (let i = 0; i < zoomParticipants.participants.length; i++) {
    console.log(
      `running loop ${i + 1} of ${zoomParticipants.participants.length}`
    );
    const currentZoomID = zoomParticipants.participants[i].registrant_id;
    // const currentZoomID = "12345678";
    const duration = zoomParticipants.participants[i].duration;
    let iszoomIdMatched = false;
    // debug logger
    console.log(`currentZoomID: ${currentZoomID}`);
    console.log(`duration: ${duration}`);

    // If zoomid then do following:
    //see if zoom id exists

    for (let j = 0; j < allParticipants.data.length; j++) {
      console.log(
        `running inner loop ${j + 1} of ${allParticipants.data.length}`
      );

      //Goes through database looking for currentZoomID. If match, then will make variable iszoomIdMatched true
      if (currentZoomID === allParticipants.data[j].zoomid) {
        try {
          console.log(
            `zoom ids match : ${currentZoomID} ${allParticipants.data[j].zoomid}`
          );
          iszoomIdMatched = true;

          //patch section
          const newAttendanceHours = duration / 3600;
          const newTotalAttendancehours =
            allParticipants.data[j].total_attendance_hours + newAttendanceHours;
          const newDays =
            newAttendanceHours >= 7
              ? (allParticipants.data[j].total_days_attended += 1)
              : allParticipants.data[j].total_days_attended;
          const newMissingStreak =
            newAttendanceHours < 7
              ? (allParticipants.data[j].missing_streak += 1)
              : (allParticipants.data[j].missing_streak = 0);
          console.log(
            `new attendance hour: ${newAttendanceHours}, new total attendance : ${newTotalAttendancehours}, amount days attended:  ${newDays}, the missing streak: ${newMissingStreak}`
          );

          const response = await fetch(
            `${mainURL}${patchRoute}registerBootcamperAttendance?zoomId=${currentZoomID}`,
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
          console.log("alive 133");
          // const result = await response;
          const resultJson = await response.text();
          const cleanResult = JSON.parse(resultJson);
          console.log("Success:", cleanResult);
          // log if it errors
        } catch (error) {
          console.log("Error:", error);
        }
      }
    }
    // If iszoomIdMatched wasn't matched then adds it to database
    if (!iszoomIdMatched) {
      // if doesnt then add bootcamper to database
      console.log(`${currentZoomID} did not match any in database`);
      const response = await fetch(
        `${mainURL}${postRoute}postBootcamperAttendance?zoomId='${currentZoomID}'`,
        {
          // set header
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // send name in the body
          body: JSON.stringify({ name: zoomParticipants.participants[i].name }),
        }
      );
      console.log(`currentZoomID: ${currentZoomID}`);
      console.log(`name: ${zoomParticipants.participants[i].name} `);

      // log that it works
      // const result = await response.json();
      const resultJson = await response.text();
      console.log("response");
      console.log(response);
      console.log("resultJson");
      console.log(resultJson);
      const cleanResult = JSON.parse(resultJson);
      console.log("Success:", cleanResult);
      // log if it errors

      iszoomIdMatched = false;
    }
  }
}

attendanceZoomToDb();
