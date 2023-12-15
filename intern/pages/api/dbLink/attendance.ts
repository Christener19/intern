import pool from "../database/dbIndex";
import { mainRoute, getRoute, oauthRoute } from "@/utils/APIRouteSetter";

const mainURL = mainRoute();

// Function to grab participant attendance data from Zoom API and add to our database
export default async function attendanceZoomToDb() {
  // Grab zoom data of everyone, latest meeting ID
  const participants = fetch(`${mainURL}${oauthRoute}getMeetingParticipants`);

  // debug logger
  console.log(participants);

  // Try and catch for zoomID
  // If no zoomid then insert new row
  // If zoomid then do following:

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

  const getBootcampers = fetch(
    "http://localhost:3000/api/database/route/GET/getBootcampers"
  );
  console.log(getBootcampers);

  // pool.end();
}

//http://localhost:3000/api/dbLink/attendance
