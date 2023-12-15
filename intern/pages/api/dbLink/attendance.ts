import pool from "../database/dbIndex";
import { mainRoute, getRoute, oauthRoute } from "@/utils/APIRouteSetter";

const mainURL = mainRoute();

export default async function attendanceZoomToDb() {
  const participants = fetch(`${mainURL}${oauthRoute}getMeetingParticipants`);

  console.log(participants);

  const getBootcampers = fetch(
    "http://localhost:3000/api/database/route/GET/getBootcampers"
  );
  console.log(getBootcampers);

  // pool.end();
}

//http://localhost:3000/api/dbLink/attendance
