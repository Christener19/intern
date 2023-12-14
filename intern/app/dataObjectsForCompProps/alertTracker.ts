import { mainRoute, getRoute } from "@/utils/APIRouteSetter";

// returns the attendance Percent value 
export const testAttPerecent = async (): Promise<object> => {

    const baseURL = mainRoute()

    // Fetch request to get name and lateness level
    // return as array of objects
    
    // // do call get data
    const bootCampersMissingStreak = await fetch(`${baseURL}${getRoute}getAbsentBootcampers`);

    // clean up JSON
    const bootCampersMissing = await bootCampersMissingStreak.text();
    const bootCampersMissingObject = JSON.parse(bootCampersMissing)
    console.log(bootCampersMissingObject)

    
    


    // route loggers
    // console.log(`mainRoute = ${mainRoute()}`)
    // console.log(`getRoute = ${getRoute}`)


    // // break data into variables we need
    // const totalPresent = Number(bootCampersPresentObject.data.todaysAttendanceCount)
    // const totalMissing = Number(bootCampersPresentObject.data.todaysAbsentCount)
    // // // get the total number of missing bootcampers today
    // const totalCount = totalPresent + totalMissing

    // // Calculate attendance percentage
    // const attendancePercentage = (totalPresent / (totalCount) * 100);

    // const cleanAttPercent = attendancePercentage.toFixed(0);

    // return attPercent val
//     return {
//             attPercent: `${cleanAttPercent}%`, 
//             alerts: [
//                 { name: 'Chirstner', alertLevel: 1 },
//                 { name: 'Kit', alertLevel: 4 },
//                 { name: 'Dave', alertLevel: 97 },
//             ]
//             };
};