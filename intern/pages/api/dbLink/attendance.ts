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

  const allParticipantsClean = await AllParticipantsJSON.text()
  const AllParticipants = JSON.parse(allParticipantsClean)

  // debug logger
  console.log('zoomParticipants');
  console.log(zoomParticipants);
  console.log('AllParticipants');
  console.log(AllParticipants);
//start loop 

// for(let i=0; i< zoomParticipants.length; i++)
//   // Try and catch for zoomID
//   if (zoomParticipants.) { 
// // If zoomid then do following:
// //see if zoom id exists 



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
 
attendanceZoomToDb()