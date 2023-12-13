// import block
import * as namePickerModel from "../models/namePickerModel";

// api request handlers

// GET list of all bootcampers
export async function getParticpantsList(testCheck : boolean) {
  
  // table to run call on
  let tableName : string = 'name_picker'
  // check if this is a test or a real api call
  if (testCheck) {
    tableName = 'test_' + tableName
  }

  try {
    const nameList = await namePickerModel.getParticpantsList(tableName)
    return nameList;
  } catch (error) {
    console.error("Error in getParticpantsList controller", error);
  }
}

// Delete participant by zoomID
export async function deleteName(ZoomPollID : number, testCheck : boolean) {

    // table to run call on
    let tableName : string = 'name_picker'
    // check if this is a test or a real api call
    if (testCheck) {
      tableName = 'test_' + tableName
    }


  try {
    // call getEngagementCardData from model
    const nameToDelete = await namePickerModel.deleteName(
      ZoomPollID,
      tableName,
    );

    // assume 404 status if the zoomID is not found
    if (!nameToDelete) {
      return { status: "fail", data: { msg: "ZoomId not found" } };
    }

    // Return a success response
    return { status: "success", data: nameToDelete };
  } catch (error) {
    console.error("Error in deleteName controller", error);
    return { status: "error", message: "Internal server error" };
  }
}

// controller for reseting name picker table?