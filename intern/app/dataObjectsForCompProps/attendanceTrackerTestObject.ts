import { mainRoute, getRoute } from "@/utils/APIRouteSetter";

// returns the attendance Percent value 
export const testAttPerecent = async (): Promise<object> => {

    const baseURL = mainRoute()
    // route loggers
    // console.log(`mainRoute = ${mainRoute()}`)
    // console.log(`getRoute = ${getRoute}`)

    // // get the total number of bootcampers attending today
    // const bootCampersPresentResponse = await fetch(`${baseURL}${getRoute}getBootcampers`);
    // const bootCampersPresent = await bootCampersPresentResponse.text();

    // do call get data
    const bootCampersPresentResponse = await fetch(`${baseURL}${getRoute}getBootcampers`);
    // clean up JSON
    const bootCampersPresent = await bootCampersPresentResponse.text();
    const bootCampersPresentObject = JSON.parse(bootCampersPresent)

    // break data into variables we need
    const totalPresent = Number(bootCampersPresentObject.data.todaysAttendanceCount)
    const totalMissing = Number(bootCampersPresentObject.data.todaysAbsentCount)
    // // get the total number of missing bootcampers today
    const totalCount = totalPresent + totalMissing

    // debug loggers
    // console.log(`totalPresent = ${totalPresent}`)
    // console.log(`totalMissing = ${totalMissing}`)
    // console.log(`totalCount = ${totalCount}`)

    // Calculate attendance percentage
    const attendancePercentage = (totalPresent / (totalCount) * 100);

    const cleanAttPercent = attendancePercentage.toFixed(2);

    // return attPercent val
    return {
            attPercent: `${cleanAttPercent}%`, 
            alerts: [
                { name: 'Chirstner', alertLevel: 1 },
                { name: 'Kit', alertLevel: 4 },
                { name: 'Dave', alertLevel: 97 },
            ]
            };
};

// export const testAttendanceData = {
//     attPercent: await testAttPerecent(), 
//     alerts: [
//         { name: 'Chirstner', alertLevel: 1 },
//         { name: 'Kit', alertLevel: 4 },
//         { name: 'Dave', alertLevel: 97 },
//     ]
// };
