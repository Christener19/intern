// import block
import * as attendanceModel from "../models/attendanceModel";

// api request handlers
// Get all attendance
export async function getBootcampers(req : any , res : any) {
    const todaysAttendance = await attendanceModel.getBootcampers();
    res.status(200).json({ status: "success", data: todaysAttendance})
}

// GET absent 
export async function getAbsentBootcampers(req : any, res : any) {
    const todaysAbsentees = await attendanceModel.getAbsentBootcampers();
    res.status(200..json({ status: "success", data: todaysAbsentees})
}

// PATCH register
export async function registerBootcamperAttendance(req : any, res : any) {
    const zoomId = req.params.zoomId;
    const data = req.body
    const register = await attendanceModel.registerBootcamperAttendance(zoomId, data);
    // assume 404 status if the zoomID is not found
    if (!register) {
        return res.status(404).json({status: 'fail', data: {msg: 'ZoomId not found'}})
    }
    res.status(200.).json({ status: "success", data: register});
}


