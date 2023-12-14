// import block
import { mainRoute, getRoute } from "@/utils/APIRouteSetter"

// returns the attendance Percent value 
const testAttPerecent = () : string => {
    // get the total number of bootcampers attending today
    const bootCampersPresent : number = Number(await fetch (`${mainRoute}${getRoute}getBootcampers`))

    // get the total number of missing bootcampers today
    const bootCampersAbsent : number = Number(await fetch (`${mainRoute}${getRoute}getAbsentBootcampers`))
    // do math and return percent value

    // return attPercent val
    return (

    )
}


export const testAttendanceData = {
    attPercent: '55%',
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