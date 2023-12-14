import { mainRoute, getRoute } from "@/utils/APIRouteSetter";

// returns the attendance Percent value 
export const testAttPerecent = async (): Promise<object> => {

    const baseURL = mainRoute()
    // route loggers
    // console.log(`mainRoute = ${mainRoute()}`)
    // console.log(`getRoute = ${getRoute}`)

    // get the total number of bootcampers attending today
    const bootCampersPresentResponse = await fetch(`${baseURL}${getRoute}getBootcampers`);
    const bootCampersPresent = await bootCampersPresentResponse.text();
    const bootCampersPresentObject = JSON.parse(bootCampersPresent)
    const presentCount = bootCampersPresentObject.data

    // get the total number of missing bootcampers today
    const bootCampersAbsentResponse = await fetch(`${baseURL}${getRoute}getAbsentBootcampers`);
    const bootCampersAbsent = await bootCampersAbsentResponse.text();
    const bootCampersAbsentObject = JSON.parse(bootCampersAbsent)


    // debug loggers
    console.log(`bootCampersPresentObject`)
    console.log(bootCampersPresentObject)
    console.log(`bootCampersAbsentObject`)
    console.log(bootCampersAbsentObject)


    // Calculate attendance percentage
    const attendancePercentage = (bootCampersPresent / (bootCampersAbsent + bootCampersPresent)) * 100;

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
}

// export const testAttendanceData = {
//     attPercent: await testAttPerecent(), 
//     alerts: [
//         { name: 'Chirstner', alertLevel: 1 },
//         { name: 'Kit', alertLevel: 4 },
//         { name: 'Dave', alertLevel: 97 },
//     ]
// };
