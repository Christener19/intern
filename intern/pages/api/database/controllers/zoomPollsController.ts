// import block
import * as zoomPollsModel from "../models/zoomPollsModel";

// api request handlers

// GET Poll results
export async function getPollResults(ZoomPollID : number, testCheck : boolean) {
  
  // table to run call on
  let tableName : string = 'zoom_polls'
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = 'test_' + tableName
  }

  try {
    const pollResults = await zoomPollsModel.getPollResults(ZoomPollID, tableName)
    return pollResults;
  } catch (error) {
    console.error("Error in getPollCompletionRate controller", error);
  }
}

// POST new poll results
export async function postNewPollResults(ZoomPollID : number, resultsPayload : zoomPollsModel.ResultsType, testCheck : boolean) {

    // table to run call on
    let tableName : string = 'zoom_polls'
    // check if this is a test or a real api call
    if (!testCheck) {
      tableName = 'test_' + tableName
    }


  try {
    // call getEngagementCardData from model
    const NewPollResults = await zoomPollsModel.postNewPollResults(
      ZoomPollID,
      resultsPayload,
      tableName,
    );

    // assume 404 status if the zoomID is not found
    if (!NewPollResults) {
      return { status: "fail", data: { msg: "ZoomId not found" } };
    }

    // Return a success response
    return { status: "success", data: NewPollResults };
  } catch (error) {
    console.error("Error in patchEngagmentGrade controller", error);
    return { status: "error", message: "Internal server error" };
  }
}

// PATCH poll results
export async function patchPollResults(ZoomPollID : number, resultsPayload : zoomPollsModel.ResultsType, testCheck : boolean) {

  // table to run call on
  let tableName : string = 'zoom_polls'
  // check if this is a test or a real api call
  if (!testCheck) {
    tableName = 'test_' + tableName
  }


try {
  // call getEngagementCardData from model
  const patchPollData = await zoomPollsModel.postNewPollResults(
    ZoomPollID,
    resultsPayload,
    tableName,
  );

  // assume 404 status if the zoomID is not found
  if (!patchPollData) {
    return { status: "fail", data: { msg: "ZoomId not found" } };
  }

  // Return a success response
  return { status: "success", data: patchPollData };
} catch (error) {
  console.error("Error in patchEngagmentGrade controller", error);
  return { status: "error", message: "Internal server error" };
}
}