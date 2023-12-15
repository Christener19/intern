import pool from "../database/dbIndex";

export default async function attendanceZoomToDb() {
  const participants = fetch(
    "http://localhost:3000/api/oauth/getMeetingParticipants"
  );

  console.log(participants);

  const getBootcampers = fetch(
    "http://localhost:3000/api/database/GET/getBootcampers"
  );
  console.log(getBootcampers);

  pool.end();
}

//http://localhost:3000/api/dbLink/attendance
