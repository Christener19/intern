import pool from "../database/dbIndex";
import { mainRoute, getRoute, oauthRoute } from "@/utils/APIRouteSetter";

const mainURL = mainRoute();

// Function to grab participant attendance data from Zoom API and add to our database
export default async function attendanceZoomToDb() {
  // Grab zoom data of everyone, latest meeting ID
  const ZoomparticipantsJSON = await fetch(`${mainURL}${oauthRoute}getMeetingParticipants`);
  const AllParticipantsJSON = await fetch (`${mainURL}${getRoute}getListBootcampers`);
  
//variable/ reponse clean up
  const ZoomparticipantsClean = await ZoomparticipantsJSON.text()
  const zoomParticipants = JSON.parse(ZoomparticipantsClean)

  // const parsedData = {
  //   success: true,
  //   participants: [
  //     {
  //       registrant_id: "_ic4PfRWS1mCf5GsC3Zhcg",
  //       name: "(Kit) Wing-Kit Leung",
  //       user_email: "wing_kitleung@hotmail.com",
  //       day: "2023-12-14T",
  //       duration: 182,
  //       join_leave: [
  //         {
  //           join: "2023-12-14T10:11:12Z",
  //           leave: "2023-12-14T10:11:15Z",
  //         },
  //         {
  //           join: "2023-12-14T10:11:15Z",
  //           leave: "2023-12-14T10:12:17Z",
  //         },
  //         {
  //           join: "2023-12-14T10:12:17Z",
  //           leave: "2023-12-14T10:12:22Z",
  //         },
  //         {
  //           join: "2023-12-14T10:12:23Z",
  //           leave: "2023-12-14T10:12:32Z",
  //         },
  //         {
  //           join: "2023-12-14T10:12:32Z",
  //           leave: "2023-12-14T10:12:41Z",
  //         },
  //         {
  //           join: "2023-12-14T10:12:41Z",
  //           leave: "2023-12-14T10:12:45Z",
  //         },
  //         {
  //           join: "2023-12-14T10:12:46Z",
  //           leave: "2023-12-14T10:14:16Z",
  //         },
  //       ],
  //     },
  //   ],
  // };
  
  
  const allParticipantsClean = await AllParticipantsJSON.text()
  const allParticipants = JSON.parse(allParticipantsClean)

  // debug logger
  console.log('zoomParticipants');
  console.log(zoomParticipants);
  console.log('AllParticipants');
  console.log(allParticipants);
//start loop 

for(let i=0; i < zoomParticipants.participants.length; i++) {

  const currentZoomID = zoomParticipants.participants[i].registrant_id

  // If zoomid then do following:
  //see if zoom id exists 
  for (let j=0; j < allParticipants.length; j++) {
  if (currentZoomID.includes(!allParticipants.data[j].zoomid)  ) { 
    // if doesnt then add bootcamper to database
    
  }

}

//   }

 //end loop if 
 //then do patch
// If no zoomid then insert new row
  
  
  // Format information into this shape:
  // Raw data from zoom:
  // todays_attendance_hours = COALESCE ($1, todays_attendance_hours),
  // WHERE zoomId = $5

  // Convert duration (seconds) to hours.

  // Get data from database

  // Calculated from DB + Zoom
  // total_attendance_hours = COALESCE ($2, total_attendance_hours),
  // total_days_attended = COALESCE ($3, total_days_attended),
  // missing_streak = COALESCE ($4, missing_streak)

  // Create loop to patch by zoomid.
  
  // console.log(getBootcampers);
 
  // pool.end();
}

//http://localhost:3000/api/dbLink/attendance
