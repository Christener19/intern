import { mainRoute, getRoute } from "@/utils/APIRouteSetter";

// returns the attendance Percent value 
export const attendanceDataFetcher = async (): Promise<object> => {

    const baseURL = mainRoute()
    // route loggers
    // console.log(`mainRoute = ${mainRoute()}`)
    // console.log(`getRoute = ${getRoute}`)
const cleanAttPercent = async () => {
    // do call get data
    const bootCampersPresentResponse = await fetch(`${baseURL}${getRoute}getBootcampers`);
    // clean up JSON
    const bootCampersPresent = await bootCampersPresentResponse.text();
    const bootCampersPresentObject = JSON.parse(bootCampersPresent)

    // break data into variables we need
    const totalPresent = Number(bootCampersPresentObject.data?.todaysAttendanceCount)
    const totalMissing = Number(bootCampersPresentObject.data?.todaysAbsentCount)
    // // get the total number of missing bootcampers today
    const totalCount = totalPresent + totalMissing

    // Calculate attendance percentage
    const attendancePercentage = (totalPresent / (totalCount) * 100);

    return attendancePercentage.toFixed(0);

}

const alertObject = async () => {
    // // do call get data
    const bootCampersMissingStreak = await fetch(`${baseURL}${getRoute}getAbsentBootcampers`);

    // clean up JSON
    const bootCampersMissing = await bootCampersMissingStreak.text();
    const bootCampersMissingObject = JSON.parse(bootCampersMissing)
    console.log(bootCampersMissingObject)

    // transform object into form needed for the component
    const modifiedAlertsObject = {
        data: bootCampersMissingObject.data?.map(item => ({
            name: item.name,
            alert: item.missing_streak
        }))
    }

    // console.log('modifiedAlertsObject')
    // console.log(modifiedAlertsObject.data)

    // return array of objects
    return modifiedAlertsObject.data
}

const calculatedPercentage = await cleanAttPercent();
const alerts = await alertObject();
    // return attPercent val
    return {
            attPercent: `${calculatedPercentage}%`,
            alerts
            };
};