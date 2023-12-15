// import block
import * as attendanceModel from "../models/attendanceModel";

// api request handlers
// Get all attendance
export async function getBootcampers(testCheck: boolean) {
  // table to run call on
  let tableName: string = "attendance";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  console.log(`query going to ${tableName}`);

  try {
    const todaysAttendance = await attendanceModel.getBootcampers(tableName);
    const todaysAbsent = await attendanceModel.getAbsentBootcampersCount(
      tableName
    );

    // data clean up
    const attendaceCount = todaysAttendance[0].missing_streak_count;
    console.log(`attendaceCount`);
    console.log(attendaceCount);

    const absentCount = todaysAbsent[0].missing_streak_count;
    console.log(`absent`);
    console.log(absentCount);

    return {
      todaysAttendanceCount: attendaceCount,
      todaysAbsentCount: absentCount,
    };
  } catch (error) {
    console.error("Error in getBootcampers controller", error);
  }
}

// Get all Bootcampers by ID
export async function getBootcamperById(testCheck: boolean, zoomid: string) {
  // table to run call on
  let tableName: string = "attendance";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  console.log(`query going to ${tableName}`);

  try {
    const bootcamper = await attendanceModel.getBootcamperById(
      tableName,
      zoomid
    );
  } catch (error) {
    console.error("Error in getBootcampers controller", error);
  }
}

// GET absent
export async function getAbsentBootcampers(testCheck: boolean) {
  // table to run call on
  let tableName: string = "attendance";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  try {
    const todaysAbsentees = await attendanceModel.getAbsentBootcampersID(
      tableName
    );
    return todaysAbsentees;
  } catch (error) {
    console.error("Error in getAbsentBootcampers controller", error);
  }
}

// PATCH register
export async function registerBootcamperAttendance(
  zoomId: number,
  data: object,
  testCheck: boolean
) {
  // table to run call on
  let tableName: string = "attendance";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

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
      data,
      tableName
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
// Get list Bootcampers 
export async function getListBootcampers(testCheck: boolean) {
  // table to run call on
  let tableName: string = "attendance";
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = "test_" + tableName;
  }

  console.log(`query going to ${tableName} getListBootcampers`);

  try {
    const bootcampers = await attendanceModel.getListBootcampers(
      tableName,
      
    );
    return bootcampers;
  } catch (error) {
    console.error("Error in getBootcampers controller", error);
  }
}
