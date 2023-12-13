// import block
import { NextApiRequest } from "next";
import * as engagementModel from "../models/engagementModel";

// api request handlers

// GET Poll completion
export async function getPollCompletionRate(zoomID : number) {
  try {
    const pollCompRate = await engagementModel.getPollCompletionRate(zoomID : number)
    return todaysAttendance;
  } catch (error) {
    console.error("Error in getBootcampers controller", error);
  }
}

// GET screenshare time
export async function getScreenShareTime(zoomID : number) {
  try {
    const todaysAbsentees = await attendanceModel.getAbsentBootcampers();
    return todaysAbsentees;
  } catch (error) {
    console.error("Error in getAbsentBootcampers controller", error);
  }
}

// GET screenshare freq
export async function getScreenShareTime(zoomID : number) {
  try {
    const todaysAbsentees = await attendanceModel.getAbsentBootcampers();
    return todaysAbsentees;
  } catch (error) {
    console.error("Error in getAbsentBootcampers controller", error);
  }
}

// GET engagment card props
export async function getEngagementCardData(zoomID : number) {
  try {
    const todaysAbsentees = await attendanceModel.getAbsentBootcampers();
    return todaysAbsentees;
  } catch (error) {
    console.error("Error in getAbsentBootcampers controller", error);
  }
}

// PATCH avegage engagement data for a bootcamper
export async function patchEngagmentGrade(zoomId : number, week_number : number, average_enagement_grade : string) {
  console.log("Calling registerBootcamperAttendance controller");

    // console log to check
    // console.log(`Controller: zoomid = ${zoomId}`)
    // console.log(`Controller: data = ${data}`)

  try {
    // console.log("zoomId", zoomId);
    console.log(data);
    // call registerBootcamperAttendance from model
    const register = await attendanceModel.registerBootcamperAttendance(
      zoomId,
      data
    );

    // assume 404 status if the zoomID is not found
    if (!register) {
      return { status: "fail", data: { msg: "ZoomId not found" } };
    }

    // Return a success response
    return { status: "success", data: register };
  } catch (error) {
    console.error("Error in registerBootcamperAttendance controller", error);
    return { status: "error", message: "Internal server error" };
  }
}
