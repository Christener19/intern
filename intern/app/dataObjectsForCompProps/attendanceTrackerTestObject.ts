import { mainRoute, getRoute } from "@/utils/APIRouteSetter";

// returns the attendance Percent value 
const testAttPerecent = async (): Promise<string> => {
    // get the total number of bootcampers attending today
    const bootCampersPresentResponse = await fetch(`${mainRoute()}${getRoute}getBootcampers`);
    const bootCampersPresent = Number(await bootCampersPresentResponse.text());

    // get the total number of missing bootcampers today
    const bootCampersAbsentResponse = await fetch(`${mainRoute()}${getRoute}getAbsentBootcampers`);
    const bootCampersAbsent = Number(await bootCampersAbsentResponse.text());

    // Calculate attendance percentage
    const attendancePercentage = (bootCampersPresent / (bootCampersAbsent + bootCampersPresent)) * 100;

    // return attPercent val
    return `${attendancePercentage.toFixed(2)}%`;
}

export const testAttendanceData = {
    attPercent: testAttPerecent(), 
    alerts: [
        { name: 'Chirstner', alertLevel: 1 },
        { name: 'Kit', alertLevel: 4 },
        { name: 'Dave', alertLevel: 97 },
    ]
};
