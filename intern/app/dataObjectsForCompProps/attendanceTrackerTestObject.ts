// import block
import { mainRoute, getRoute } from "@/utils/APIRouteSetter"

// returns the attendance Percent value 
const testAttPerecent = async () : Promise<string> => {
    // get the total number of bootcampers attending today
    const bootCampersPresent : number = Number(await fetch (`${mainRoute}${getRoute}getBootcampers`))

    // get the total number of missing bootcampers today
    const bootCampersAbsent : number = Number(await fetch (`${mainRoute}${getRoute}getAbsentBootcampers`))
    // do math and return percent value
// 5 are present out of 10 = ((5/10 * 100) + '%' sign)

const attendancePercentage = (bootCampersPresent/(bootCampersAbsent + bootCampersPresent) * 100)
    // return attPercent val
    return (
        `${attendancePercentage}%` 
    )
}


export const testAttendanceData = {
    attPercent: testAttPerecent(),
    alerts: [
        {
        name: 'Chirstner',
        alertLevel: 1,
        },
        {
            name: 'Kit',
            alertLevel: 4,
            },
        {
            name: 'Dave',
            alertLevel: 97,
            },
    ]
}