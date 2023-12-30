import { mainRoute, getRoute } from "@/utils/APIRouteSetter";
import pool from "../../pages/api/database/dbIndex";

// returns the attendance Percent value
export const attendanceDataFetcher = async (): Promise<object> => {
  // gets a pool connections
  let client: any;
  client = await pool.connect();

  const baseURL = mainRoute();
  // route loggers
  // console.log(`mainRoute = ${mainRoute()}`)
  // console.log(`getRoute = ${getRoute}`)

  client.release();

  const cleanAttPercent = async () => {
    // gets a pool connections
    let client: any;
    client = await pool.connect();

    // do call get data
    const bootCampersPresentResponse = await fetch(
      `${baseURL}${getRoute}getBootcampers`
    );
    // clean up JSON
    const bootCampersPresent = await bootCampersPresentResponse.text();
    const bootCampersPresentObject = JSON.parse(bootCampersPresent);

    // break data into variables we need
    const totalPresent = Number(
      bootCampersPresentObject.data?.todaysAttendanceCount
    );
    const totalMissing = Number(
      bootCampersPresentObject.data?.todaysAbsentCount
    );
    // // get the total number of missing bootcampers today
    const totalCount = totalPresent + totalMissing;

    // Calculate attendance percentage
    const attendancePercentage = (totalPresent / totalCount) * 100;

    client.release();

    return attendancePercentage.toFixed(0);
  };

  const alertObject = async () => {
    // // do call get data
    const bootCampersMissingStreak = await fetch(
      `${baseURL}${getRoute}getAbsentBootcampers`
    );

    // clean up JSON
    const bootCampersMissing = await bootCampersMissingStreak.text();
    const bootCampersMissingObject = JSON.parse(bootCampersMissing);
    console.log(bootCampersMissingObject);

    // transform object into form needed for the component
    const modifiedAlertsObject = {
      data: bootCampersMissingObject.data?.map((item: any) => ({
        name: item.name,
        alert: item.missing_streak,
      })),
    };

    // console.log('modifiedAlertsObject')
    // console.log(modifiedAlertsObject.data)

    // return array of objects
    return modifiedAlertsObject.data;
  };

  const calculatedPercentage = await cleanAttPercent();
  const alerts = await alertObject();
  // return attPercent val
  return {
    attPercent: `${calculatedPercentage}%`,
    alerts,
  };
};
